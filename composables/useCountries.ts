export interface Country {
  code: string   // ISO-3166 alpha-2
  name: string
  dial: string   // e.g. +880
  flag: string   // emoji
  min: number    // valid national-number digit count (min)
  max: number    // valid national-number digit count (max)
}

// Popular first, then alphabetical. `min`/`max` = digits AFTER the dial code.
export const COUNTRIES: Country[] = [
  { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩', min: 10, max: 10 },
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸', min: 10, max: 10 },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧', min: 10, max: 10 },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳', min: 10, max: 10 },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦', min: 10, max: 10 },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺', min: 9, max: 9 },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', flag: '🇦🇪', min: 8, max: 9 },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦', min: 9, max: 9 },
  { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰', min: 10, max: 10 },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷', min: 10, max: 11 },
  { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳', min: 11, max: 11 },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪', min: 10, max: 11 },
  { code: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬', min: 10, max: 10 },
  { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸', min: 9, max: 9 },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷', min: 9, max: 9 },
  { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩', min: 9, max: 12 },
  { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹', min: 9, max: 10 },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵', min: 10, max: 10 },
  { code: 'KR', name: 'South Korea', dial: '+82', flag: '🇰🇷', min: 9, max: 10 },
  { code: 'KW', name: 'Kuwait', dial: '+965', flag: '🇰🇼', min: 8, max: 8 },
  { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: '🇱🇰', min: 9, max: 9 },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽', min: 10, max: 10 },
  { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾', min: 9, max: 10 },
  { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬', min: 10, max: 10 },
  { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱', min: 9, max: 9 },
  { code: 'NP', name: 'Nepal', dial: '+977', flag: '🇳🇵', min: 10, max: 10 },
  { code: 'PH', name: 'Philippines', dial: '+63', flag: '🇵🇭', min: 10, max: 10 },
  { code: 'QA', name: 'Qatar', dial: '+974', flag: '🇶🇦', min: 8, max: 8 },
  { code: 'RU', name: 'Russia', dial: '+7', flag: '🇷🇺', min: 10, max: 10 },
  { code: 'SE', name: 'Sweden', dial: '+46', flag: '🇸🇪', min: 7, max: 9 },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬', min: 8, max: 8 },
  { code: 'TR', name: 'Turkey', dial: '+90', flag: '🇹🇷', min: 10, max: 10 },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦', min: 9, max: 9 },
]

// Every other country, alphabetical: [code, name, dial]. Flags are derived from the
// ISO code; digit ranges are lenient (phone is optional / free-form on these forms).
const REST: Array<[string, string, string]> = [
  ['AF', 'Afghanistan', '+93'], ['AL', 'Albania', '+355'], ['DZ', 'Algeria', '+213'], ['AD', 'Andorra', '+376'],
  ['AO', 'Angola', '+244'], ['AG', 'Antigua and Barbuda', '+1'], ['AR', 'Argentina', '+54'], ['AM', 'Armenia', '+374'],
  ['AW', 'Aruba', '+297'], ['AT', 'Austria', '+43'], ['AZ', 'Azerbaijan', '+994'], ['BS', 'Bahamas', '+1'],
  ['BH', 'Bahrain', '+973'], ['BB', 'Barbados', '+1'], ['BY', 'Belarus', '+375'], ['BE', 'Belgium', '+32'],
  ['BZ', 'Belize', '+501'], ['BJ', 'Benin', '+229'], ['BT', 'Bhutan', '+975'], ['BO', 'Bolivia', '+591'],
  ['BA', 'Bosnia and Herzegovina', '+387'], ['BW', 'Botswana', '+267'], ['BN', 'Brunei', '+673'], ['BG', 'Bulgaria', '+359'],
  ['BF', 'Burkina Faso', '+226'], ['BI', 'Burundi', '+257'], ['KH', 'Cambodia', '+855'], ['CM', 'Cameroon', '+237'],
  ['CV', 'Cape Verde', '+238'], ['CF', 'Central African Republic', '+236'], ['TD', 'Chad', '+235'], ['CL', 'Chile', '+56'],
  ['CO', 'Colombia', '+57'], ['KM', 'Comoros', '+269'], ['CG', 'Congo - Brazzaville', '+242'], ['CD', 'Congo - Kinshasa', '+243'],
  ['CR', 'Costa Rica', '+506'], ['CI', 'Côte d’Ivoire', '+225'], ['HR', 'Croatia', '+385'], ['CU', 'Cuba', '+53'],
  ['CY', 'Cyprus', '+357'], ['CZ', 'Czechia', '+420'], ['DK', 'Denmark', '+45'], ['DJ', 'Djibouti', '+253'],
  ['DM', 'Dominica', '+1'], ['DO', 'Dominican Republic', '+1'], ['EC', 'Ecuador', '+593'], ['SV', 'El Salvador', '+503'],
  ['GQ', 'Equatorial Guinea', '+240'], ['ER', 'Eritrea', '+291'], ['EE', 'Estonia', '+372'], ['SZ', 'Eswatini', '+268'],
  ['ET', 'Ethiopia', '+251'], ['FJ', 'Fiji', '+679'], ['FI', 'Finland', '+358'], ['GA', 'Gabon', '+241'],
  ['GM', 'Gambia', '+220'], ['GE', 'Georgia', '+995'], ['GH', 'Ghana', '+233'], ['GR', 'Greece', '+30'],
  ['GD', 'Grenada', '+1'], ['GT', 'Guatemala', '+502'], ['GN', 'Guinea', '+224'], ['GW', 'Guinea-Bissau', '+245'],
  ['GY', 'Guyana', '+592'], ['HT', 'Haiti', '+509'], ['HN', 'Honduras', '+504'], ['HK', 'Hong Kong', '+852'],
  ['HU', 'Hungary', '+36'], ['IS', 'Iceland', '+354'], ['IR', 'Iran', '+98'], ['IQ', 'Iraq', '+964'],
  ['IE', 'Ireland', '+353'], ['IL', 'Israel', '+972'], ['JM', 'Jamaica', '+1'], ['JO', 'Jordan', '+962'],
  ['KZ', 'Kazakhstan', '+7'], ['KE', 'Kenya', '+254'], ['KI', 'Kiribati', '+686'], ['XK', 'Kosovo', '+383'],
  ['KG', 'Kyrgyzstan', '+996'], ['LA', 'Laos', '+856'], ['LV', 'Latvia', '+371'], ['LB', 'Lebanon', '+961'],
  ['LS', 'Lesotho', '+266'], ['LR', 'Liberia', '+231'], ['LY', 'Libya', '+218'], ['LI', 'Liechtenstein', '+423'],
  ['LT', 'Lithuania', '+370'], ['LU', 'Luxembourg', '+352'], ['MO', 'Macau', '+853'], ['MG', 'Madagascar', '+261'],
  ['MW', 'Malawi', '+265'], ['MV', 'Maldives', '+960'], ['ML', 'Mali', '+223'], ['MT', 'Malta', '+356'],
  ['MH', 'Marshall Islands', '+692'], ['MR', 'Mauritania', '+222'], ['MU', 'Mauritius', '+230'], ['FM', 'Micronesia', '+691'],
  ['MD', 'Moldova', '+373'], ['MC', 'Monaco', '+377'], ['MN', 'Mongolia', '+976'], ['ME', 'Montenegro', '+382'],
  ['MA', 'Morocco', '+212'], ['MZ', 'Mozambique', '+258'], ['MM', 'Myanmar', '+95'], ['NA', 'Namibia', '+264'],
  ['NR', 'Nauru', '+674'], ['NZ', 'New Zealand', '+64'], ['NI', 'Nicaragua', '+505'], ['NE', 'Niger', '+227'],
  ['NO', 'Norway', '+47'], ['OM', 'Oman', '+968'], ['PW', 'Palau', '+680'], ['PS', 'Palestine', '+970'],
  ['PA', 'Panama', '+507'], ['PG', 'Papua New Guinea', '+675'], ['PY', 'Paraguay', '+595'], ['PE', 'Peru', '+51'],
  ['PL', 'Poland', '+48'], ['PT', 'Portugal', '+351'], ['PR', 'Puerto Rico', '+1'], ['RO', 'Romania', '+40'],
  ['RW', 'Rwanda', '+250'], ['KN', 'Saint Kitts and Nevis', '+1'], ['LC', 'Saint Lucia', '+1'], ['VC', 'Saint Vincent and the Grenadines', '+1'],
  ['WS', 'Samoa', '+685'], ['SM', 'San Marino', '+378'], ['ST', 'São Tomé and Príncipe', '+239'], ['SN', 'Senegal', '+221'],
  ['RS', 'Serbia', '+381'], ['SC', 'Seychelles', '+248'], ['SL', 'Sierra Leone', '+232'], ['SK', 'Slovakia', '+421'],
  ['SI', 'Slovenia', '+386'], ['SB', 'Solomon Islands', '+677'], ['SO', 'Somalia', '+252'], ['SS', 'South Sudan', '+211'],
  ['SD', 'Sudan', '+249'], ['SR', 'Suriname', '+597'], ['CH', 'Switzerland', '+41'], ['SY', 'Syria', '+963'],
  ['TW', 'Taiwan', '+886'], ['TJ', 'Tajikistan', '+992'], ['TZ', 'Tanzania', '+255'], ['TH', 'Thailand', '+66'],
  ['TL', 'Timor-Leste', '+670'], ['TG', 'Togo', '+228'], ['TO', 'Tonga', '+676'], ['TT', 'Trinidad and Tobago', '+1'],
  ['TN', 'Tunisia', '+216'], ['TM', 'Turkmenistan', '+993'], ['TV', 'Tuvalu', '+688'], ['UG', 'Uganda', '+256'],
  ['UA', 'Ukraine', '+380'], ['UY', 'Uruguay', '+598'], ['UZ', 'Uzbekistan', '+998'], ['VU', 'Vanuatu', '+678'],
  ['VA', 'Vatican City', '+39'], ['VE', 'Venezuela', '+58'], ['VN', 'Vietnam', '+84'], ['YE', 'Yemen', '+967'],
  ['ZM', 'Zambia', '+260'], ['ZW', 'Zimbabwe', '+263'],
]

const flagOf = (code: string) =>
  [...code.toUpperCase()].map((c) => String.fromCodePoint(127397 + c.charCodeAt(0))).join('')

for (const [code, name, dial] of REST) {
  if (!COUNTRIES.some((c) => c.code === code)) {
    COUNTRIES.push({ code, name, dial, flag: flagOf(code), min: 4, max: 15 })
  }
}

export function useCountries() {
  const digits = (s: string) => (s || '').replace(/\D/g, '')

  /** True when the national number has a valid digit count for the country. */
  function isValidPhone(country: Country | undefined, national: string): boolean {
    if (!country) return false
    const n = digits(national).length
    return n >= country.min && n <= country.max
  }

  const expectedLength = (c: Country) => (c.min === c.max ? `${c.min}` : `${c.min}–${c.max}`)

  return { countries: COUNTRIES, digits, isValidPhone, expectedLength }
}
