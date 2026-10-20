import test from 'node:test';
import assert from 'node:assert/strict';
import {
  KM_PER_MILE, kmhToMph, mphToKmh, paceSeconds, speedFromPace, parseNumber, parsePace,
  formatPace, formatDuration, formatSpeed, flatEquivalentSpeed, describe, nearestSetting, RACES,
} from '../src/lib/pace.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `${a} is not within ${eps} of ${b}`);

test('1 mile is 1.609344 km', () => {
  near(KM_PER_MILE, 1.609344);
  near(mphToKmh(1), 1.609344);
  near(kmhToMph(1.609344), 1);
});
test('6 mph is a 10:00 mile', () => {
  assert.equal(paceSeconds(6), 600);
  assert.equal(formatPace(paceSeconds(6)), '10:00');
});
test('7.5 mph is an 8:00 mile and 12.07 km/h', () => {
  assert.equal(formatPace(paceSeconds(7.5)), '8:00');
  near(mphToKmh(7.5), 12.0701, 1e-4);
});
test('10 km/h is a 6:00 km and 6.21 mph, 9:39 per mile', () => {
  assert.equal(formatPace(paceSeconds(10)), '6:00');
  near(kmhToMph(10), 6.2137, 1e-4);
  assert.equal(formatPace(paceSeconds(kmhToMph(10))), '9:39');
});
test('12 km/h is a 5:00 km', () => {
  assert.equal(formatPace(paceSeconds(12)), '5:00');
});
test('pace to speed is the inverse', () => {
  assert.equal(speedFromPace(600), 6);
  near(speedFromPace(360), 10);
  near(speedFromPace(paceSeconds(8.3)), 8.3);
});
test('8:30 per mile is 7.06 mph', () => {
  near(speedFromPace(510), 7.0588, 1e-4);
  assert.equal(formatSpeed(speedFromPace(510)), '7.06');
});
test('formatPace carries 60 seconds', () => {
  assert.equal(formatPace(479.6), '8:00');
  assert.equal(formatPace(59.5), '1:00');
  assert.equal(formatPace(65), '1:05');
});
test('formatDuration', () => {
  assert.equal(formatDuration(1867), '31:07');
  assert.equal(formatDuration(3600), '1:00:00');
  assert.equal(formatDuration(7866), '2:11:06');
  assert.equal(formatDuration(3599.6), '1:00:00');
});
test('parsePace accepts m:ss and whole minutes only', () => {
  assert.equal(parsePace('8:30'), 510);
  assert.equal(parsePace('08:05'), 485);
  assert.equal(parsePace('10'), 600);
  assert.equal(parsePace(' 9:00 '), 540);
  assert.equal(parsePace('830'), 510);
  assert.equal(parsePace('1015'), 615);
  assert.equal(parsePace('1075'), null);
  assert.equal(parsePace('8:75'), null);
  assert.equal(parsePace('8.5'), null);
  assert.equal(parsePace('abc'), null);
  assert.equal(parsePace(''), null);
  assert.equal(parsePace('1:02:30'), null);
});
test('parseNumber accepts a dot or a comma and rejects junk', () => {
  assert.equal(parseNumber('6.5'), 6.5);
  assert.equal(parseNumber('6,5'), 6.5);
  assert.equal(parseNumber(' 7 '), 7);
  assert.equal(parseNumber('.5'), 0.5);
  assert.equal(parseNumber(''), null);
  assert.equal(parseNumber('-3'), null);
  assert.equal(parseNumber('1e3'), null);
  assert.equal(parseNumber('6.5.1'), null);
});
test('flat equivalent follows the ACSM running equation (S0 = S x (1 + 4.5 G))', () => {
  assert.equal(flatEquivalentSpeed(6, 0), 6);
  near(flatEquivalentSpeed(6, 5), 7.35);
  near(flatEquivalentSpeed(10, 1), 10.45);
  near(flatEquivalentSpeed(10, 10), 14.5);
  // Same VO2 check in m/min: 0.2*S0 must equal 0.2*S + 0.9*S*G
  const S = 6 * 26.8224, G = 0.05;
  const S0 = flatEquivalentSpeed(6, 5) * 26.8224;
  near(0.2 * S0, 0.2 * S + 0.9 * S * G, 1e-9);
});
test('6 mph at 5% incline is about an 8:10 flat mile', () => {
  const d = describe(6, 5);
  assert.equal(formatPace(d.flatPerMile), '8:10');
  assert.equal(formatPace(d.perMile), '10:00');
  near(d.secondsSavedPerMile, 600 - 3600 / 7.35, 1e-9);
});
test('race times at a 10:00 mile (6 mph)', () => {
  const d = describe(6);
  const t = Object.fromEntries(d.races.map((r) => [r.id, formatDuration(r.time)]));
  assert.equal(t['5k'], '31:04');
  assert.equal(t['10k'], '1:02:08');
  assert.equal(t.half, '2:11:06');
  assert.equal(t.full, '4:22:11');
});
test('race times at a 6:00 km (10 km/h)', () => {
  const d = describe(kmhToMph(10));
  const t = Object.fromEntries(d.races.map((r) => [r.id, formatDuration(r.time)]));
  assert.equal(t['5k'], '30:00');
  assert.equal(t['10k'], '1:00:00');
  assert.equal(t.half, '2:06:35');
  assert.equal(t.full, '4:13:10');
});
test('race distances', () => {
  assert.deepEqual(RACES.map((r) => r.km), [5, 10, 21.0975, 42.195]);
});
test('at 0 percent incline the flat equivalent equals the real pace', () => {
  const d = describe(7.2, 0);
  assert.equal(d.flatPerKm, d.perKm);
  assert.equal(d.secondsSavedPerMile, 0);
});
test('nearestSetting rounds to a treadmill step of 0.1', () => {
  assert.equal(nearestSetting(7.0588), 7.1);
  assert.equal(nearestSetting(6.04), 6);
  assert.equal(nearestSetting(12.07), 12.1);
});
test('flat equivalent applies only from 5 mph', async () => {
  const { flatApplies, FLAT_MIN_MPH, MIN_KMH, MIN_MPH, KM_PER_MILE } = await import('../src/lib/pace.js');
  assert.equal(FLAT_MIN_MPH, 5);
  assert.equal(flatApplies(4.9), false);
  assert.equal(flatApplies(5), true);
  assert.equal(describe(3.5, 2).flatApplies, false);
  assert.equal(describe(8, 2).flatApplies, true);
  assert.equal(MIN_KMH, MIN_MPH * KM_PER_MILE);
});
