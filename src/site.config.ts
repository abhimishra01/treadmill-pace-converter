// ONE config file. Change values here; every page reads from it.
// Keep this file plain (no type-only syntax): scripts/deploy.mjs imports it directly.
export default {
  name: 'Treadmill Pace Converter',                 // shown in header, title, footer
  domain: 'bingemind.com/treadmill-pace-converter', // host and path of the public home (no https://). Canonical, sitemap and legal text use it
  cloudflareProject: 'treadmill-pace-converter',    // Cloudflare Pages project name (used by npm run deploy)
  keyword: 'treadmill pace converter', // main keyword (search phrase)
  keywords: ['mph to pace', 'km/h to min/km', 'treadmill speed to pace', 'treadmill incline pace calculator', 'min/mile to mph'],
  h1: 'Treadmill pace converter',     // visible page heading
  title: 'Treadmill Pace Converter: mph, km/h and Min per Mile', // home page title, under 60 chars
  tagline: 'Free and fast',
  description:
    'Turn treadmill speed into pace and pace into speed. mph, km/h, min/mile, min/km, incline-adjusted flat pace, and 5K to marathon times.',
  contact: 'https://bingemind.com/#contact', // contact link (no email address)
  hub: 'https://bingemind.com/tools/', // "More free tools" footer link
  ga4: '',                            // GA4 measurement ID, e.g. 'G-XXXXXXXXXX'. Empty = Google Analytics off
  adsense: '',                        // AdSense publisher ID, e.g. 'ca-pub-1234567890123456'. Empty = ads off
  brand: '#0369a1',                   // brand color (hex)
  skin: 'retro',                      // visual skin: minimal, swiss, clay or retro
  locale: 'en-US',                    // BCP 47 language tag
  ogImage: '/og.png',
  category: 'HealthApplication',   // schema.org applicationCategory
  owner: 'Bingemind',                // name used in legal pages (person or business)
};
