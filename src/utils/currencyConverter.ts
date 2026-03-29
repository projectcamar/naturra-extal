/**
 * Currency conversion utilities
 * Converts IDR to USD based on current exchange rate
 */

// English-speaking countries that should see USD conversion
const ENGLISH_SPEAKING_COUNTRIES = [
  'US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA', 'SG', 'MY', 'PH',
  'IN', 'PK', 'BD', 'LK', 'KE', 'NG', 'GH', 'TZ', 'UG', 'ZM',
  'ZW', 'BW', 'LS', 'MW', 'NA', 'SZ', 'BB', 'BS', 'BZ', 'DM',
  'GD', 'GY', 'JM', 'KN', 'LC', 'VC', 'AG', 'TT', 'FJ', 'PG',
  'SB', 'VU', 'MH', 'FM', 'PW', 'WS', 'TO', 'TV', 'KI', 'NR'
]

/**
 * Check if country code is English-speaking
 */
export const isEnglishSpeakingCountry = (countryCode: string | undefined | null): boolean => {
  if (!countryCode) return false
  return ENGLISH_SPEAKING_COUNTRIES.includes(countryCode.toUpperCase())
}

/**
 * Get USD to IDR exchange rate
 * Using a conservative estimate (can be updated with API call later)
 * Current approximate rate: ~15,000 IDR = 1 USD
 */
let cachedExchangeRate: number | null = null
let cachedRates: { [key: string]: number } | null = null

export const getExchangeRate = async (): Promise<number> => {
  if (cachedExchangeRate !== null) {
    return cachedExchangeRate
  }

  try {
    // Try to fetch current exchange rate from a free API
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    const data = await response.json()
    if (data.rates && data.rates.IDR && typeof data.rates.IDR === 'number') {
      const rate = data.rates.IDR
      cachedExchangeRate = rate
      return rate
    }
  } catch (error) {
    console.log('Failed to fetch exchange rate, using default')
  }

  // Fallback to default rate if API fails
  const defaultRate = 15000
  cachedExchangeRate = defaultRate
  return defaultRate
}

/**
 * Get exchange rates for all currencies
 */
export const getAllExchangeRates = async (): Promise<{ [key: string]: number }> => {
  if (cachedRates !== null) {
    return cachedRates
  }

  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    const data = await response.json()
    if (data.rates) {
      cachedRates = {
        IDR: data.rates.IDR || 15000,
        SAR: data.rates.SAR || 3.75,
        CNY: data.rates.CNY || 7.2,
        JPY: data.rates.JPY || 150,
        EUR: data.rates.EUR || 0.92,
        KRW: data.rates.KRW || 1300
      }
      return cachedRates
    }
  } catch (error) {
    console.log('Failed to fetch exchange rates, using defaults')
  }

  // Fallback to default rates
  cachedRates = {
    IDR: 15000,
    SAR: 3.75,
    CNY: 7.2,
    JPY: 150,
    EUR: 0.92,
    KRW: 1300
  }
  return cachedRates
}

/**
 * Convert IDR to target currency
 */
export const convertIDRToCurrency = async (idrPrice: string, targetCurrency: 'USD' | 'SAR' | 'CNY' | 'JPY' | 'EUR' | 'KRW'): Promise<string> => {
  const numericValue = parseFloat(
    idrPrice
      .replace(/[^\d.,]/g, '')
      .replace(/\./g, '')
      .replace(',', '.')
  )

  if (isNaN(numericValue) || numericValue === 0) {
    return idrPrice
  }

  const rates = await getAllExchangeRates()
  const usdPrice = numericValue / rates.IDR
  const targetPrice = targetCurrency === 'USD' ? usdPrice : usdPrice * rates[targetCurrency]

  const currencyCodes: { [key: string]: string } = {
    USD: 'USD',
    SAR: 'SAR',
    CNY: 'CNY',
    JPY: 'JPY',
    EUR: 'EUR',
    KRW: 'KRW'
  }

  const locales: { [key: string]: string } = {
    USD: 'en-US',
    SAR: 'ar-SA',
    CNY: 'zh-CN',
    JPY: 'ja-JP',
    EUR: 'de-DE',
    KRW: 'ko-KR'
  }

  return new Intl.NumberFormat(locales[targetCurrency] || 'en-US', {
    style: 'currency',
    currency: currencyCodes[targetCurrency],
    minimumFractionDigits: 0,
    maximumFractionDigits: targetCurrency === 'JPY' || targetCurrency === 'KRW' ? 0 : 2
  }).format(targetPrice)
}

/**
 * Convert IDR price to USD
 */
export const convertIDRToUSD = async (idrPrice: string): Promise<string> => {
  // Extract numeric value from price string (e.g., "Rp 2.500.000" -> 2500000)
  const numericValue = parseFloat(
    idrPrice
      .replace(/[^\d.,]/g, '')
      .replace(/\./g, '')
      .replace(',', '.')
  )

  if (isNaN(numericValue) || numericValue === 0) {
    return idrPrice
  }

  const exchangeRate = await getExchangeRate()
  const usdPrice = numericValue / exchangeRate

  // Format to 2 decimal places
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(usdPrice)
}

/**
 * Detect user's country from IP
 */
export const detectUserCountry = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return data.country_code || null
  } catch (error) {
    console.log('Failed to detect country from IP')
    return null
  }
}
