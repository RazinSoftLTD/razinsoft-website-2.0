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
