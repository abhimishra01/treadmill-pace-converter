// Treadmill pace math. Pure functions, no DOM. Tested by tests/pace.test.mjs.

export const KM_PER_MILE = 1.609344;
export const RACES = [
  { id: '5k', label: '5K', km: 5 },
  { id: '10k', label: '10K', km: 10 },
  { id: 'half', label: 'Half marathon', km: 21.0975 },
  { id: 'full', label: 'Marathon', km: 42.195 },
];
export const MIN_MPH = 0.5;
export const MAX_MPH = 25;
export const MAX_INCLINE = 15; // this tool's own input limit, not a limit of the equation
export const MIN_KMH = MIN_MPH * KM_PER_MILE;
export const MAX_KMH = 40;
// The running equation is documented for speeds above 5 mph (134 m/min). Below it we show no flat equivalent.
export const FLAT_MIN_MPH = 5;

export const kmhToMph = (kmh) => kmh / KM_PER_MILE;
export const mphToKmh = (mph) => mph * KM_PER_MILE;

// Seconds to cover one unit of distance at a speed given in units per hour.
export const paceSeconds = (speed) => 3600 / speed;
// Speed in units per hour for a pace given in seconds per unit.
export const speedFromPace = (seconds) => 3600 / seconds;

// Accepts "9.5" or "9,5". Returns a number, or null for anything else.
export function parseNumber(text) {
  const s = String(text ?? '').trim().replace(',', '.');
  if (!/^\d*\.?\d+$|^\d+\.$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

// Accepts "8:30", "10" (whole minutes), or digits only: "830" is 8:30 and "1015" is 10:15.
// Digits only helps on a phone keypad, which has no colon. Seconds must be 0 to 59. Returns seconds, or null.
export function parsePace(text) {
  const s = String(text ?? '').trim();
  let m = /^(\d{1,3}):([0-5]?\d)$/.exec(s);
  if (m) return Number(m[1]) * 60 + Number(m[2]);
  m = /^(\d{1,2})$/.exec(s);
  if (m) return Number(m[1]) * 60;
  m = /^(\d{1,2})([0-5]\d)$/.exec(s);
  if (m && s.length >= 3) return Number(m[1]) * 60 + Number(m[2]);
  return null;
}

// "8:30". Rounds to the nearest second and carries 60 seconds into the minute.
export function formatPace(seconds) {
  const t = Math.round(seconds);
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
}

// "31:07" under an hour, "2:11:06" from one hour.
export function formatDuration(seconds) {
  const t = Math.round(seconds);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`;
}

// Trim trailing zeros: 6 -> "6", 6.50 -> "6.5", 7.46 -> "7.46".
export function formatSpeed(value, digits = 2) {
  return String(Number(value.toFixed(digits)));
}

// Flat-ground speed that costs the same oxygen as running at `speed` on `inclinePercent`.
// ACSM running equation: VO2 = 0.2*S + 0.9*S*G + 3.5 (S in m/min, G as a fraction).
// Same VO2 on the flat: 0.2*S0 = 0.2*S + 0.9*S*G, so S0 = S * (1 + 4.5*G). The ratio holds in any unit.
export const FLAT_FACTOR_PER_PERCENT = 0.045;
export const flatApplies = (mph) => mph >= FLAT_MIN_MPH - 1e-9;
export function flatEquivalentSpeed(speed, inclinePercent) {
  return speed * (1 + FLAT_FACTOR_PER_PERCENT * inclinePercent);
}

// Race finish time in seconds, from a pace in seconds per km.
// All numbers the page shows, from a speed in mph and an incline in percent.
export function describe(mph, incline = 0) {
  const kmh = mphToKmh(mph);
  const flatMph = flatEquivalentSpeed(mph, incline);
  const flatKmh = mphToKmh(flatMph);
  const perKm = paceSeconds(kmh);
  const flatPerKm = paceSeconds(flatKmh);
  return {
    mph, kmh,
    flatApplies: flatApplies(mph),
    perMile: paceSeconds(mph),
    perKm,
    flatMph, flatKmh,
    flatPerMile: paceSeconds(flatMph),
    flatPerKm,
    secondsSavedPerMile: paceSeconds(mph) - paceSeconds(flatMph),
    races: RACES.map((r) => ({
      ...r,
      time: perKm * r.km,
      flatTime: flatPerKm * r.km,
    })),
  };
}

// Nearest treadmill setting (steps of 0.1) for a speed.
export function nearestSetting(speed, step = 0.1) {
  const s = Math.round(speed / step) * step;
  return Number(s.toFixed(1));
}
