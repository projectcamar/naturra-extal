import React, { useState, useEffect } from 'react'
import { DollarSign, TrendingUp } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { getAllExchangeRates } from '../utils/currencyConverter'
import { getLanguageFromLocation, type LanguageCode } from '../utils/languageManager'
import './CurrencyHighlight.css'

interface CurrencyHighlightProps {
  isIndonesian?: boolean
  language?: LanguageCode
}

// Language to currency mapping
const LANGUAGE_CURRENCY_MAP: { [key in LanguageCode]: { code: string; symbol: string; name: string } | null } = {
  'ko': { code: 'KRW', symbol: '₩', name: 'Won' },
  'ja': { code: 'JPY', symbol: '¥', name: 'Yen' },
  'zh': { code: 'CNY', symbol: '¥', name: 'Yuan' },
  'ar': { code: 'SAR', symbol: '﷼', name: 'Riyal' },
  'es': { code: 'EUR', symbol: '€', name: 'Euro' },
  'fr': { code: 'EUR', symbol: '€', name: 'Euro' },
  'en': null, // English shows USD only (non-highlighted)
  'id': null  // Indonesian shows USD only (non-highlighted), IDR not used as reference
}

const CurrencyHighlight: React.FC<CurrencyHighlightProps> = ({ language }) => {
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number } | null>(null)
  const [highlightedCurrency, setHighlightedCurrency] = useState<string | null>(null)
  const [usdRate, setUsdRate] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const location = useLocation()

  // Detect language from URL if not provided
  const detectedLanguage: LanguageCode = language || getLanguageFromLocation(location.pathname, location.search) || 'en'
  const currencyInfo = LANGUAGE_CURRENCY_MAP[detectedLanguage]

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const rates = await getAllExchangeRates()
        setExchangeRates(rates)
        
        // Format USD rate (1 USD = X IDR)
        const formattedUsdRate = new Intl.NumberFormat('id-ID', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(rates.IDR)
        setUsdRate(formattedUsdRate)

        // Get highlighted currency rate if applicable
        // Calculate: 1 USD = X [currency] (e.g., 1 USD = 1,300 KRW)
        if (currencyInfo) {
          const usdAmount = 1
          const currencyRate = rates[currencyInfo.code] || 1
          const converted = new Intl.NumberFormat(
            currencyInfo.code === 'KRW' ? 'ko-KR' :
            currencyInfo.code === 'JPY' ? 'ja-JP' :
            currencyInfo.code === 'CNY' ? 'zh-CN' :
            currencyInfo.code === 'SAR' ? 'ar-SA' :
            'de-DE',
            {
              style: 'currency',
              currency: currencyInfo.code,
              minimumFractionDigits: currencyInfo.code === 'JPY' || currencyInfo.code === 'KRW' ? 0 : 2,
              maximumFractionDigits: currencyInfo.code === 'JPY' || currencyInfo.code === 'KRW' ? 0 : 2
            }
          ).format(usdAmount * currencyRate)
          setHighlightedCurrency(converted)
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error)
        // Fallback to default rates
        const defaultRates = {
          IDR: 15000,
          KRW: 1300,
          JPY: 150,
          CNY: 7.2,
          SAR: 3.75,
          EUR: 0.92
        }
        setExchangeRates(defaultRates)
        setUsdRate('15.000')
        
        if (currencyInfo) {
          // Calculate fallback highlighted currency
          const usdAmount = 1
          const rate = defaultRates[currencyInfo.code as keyof typeof defaultRates] || 1
          const converted = new Intl.NumberFormat(
            currencyInfo.code === 'KRW' ? 'ko-KR' :
            currencyInfo.code === 'JPY' ? 'ja-JP' :
            currencyInfo.code === 'CNY' ? 'zh-CN' :
            currencyInfo.code === 'SAR' ? 'ar-SA' :
            'de-DE',
            {
              style: 'currency',
              currency: currencyInfo.code,
              minimumFractionDigits: currencyInfo.code === 'JPY' || currencyInfo.code === 'KRW' ? 0 : 2,
              maximumFractionDigits: currencyInfo.code === 'JPY' || currencyInfo.code === 'KRW' ? 0 : 2
            }
          ).format(usdAmount * rate)
          setHighlightedCurrency(converted)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchExchangeRates()
  }, [location.pathname, detectedLanguage])

  // Auto-hide after 3 seconds
  useEffect(() => {
    if (!isLoading && exchangeRates !== null) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isLoading, exchangeRates])

  // Don't render while loading or after hiding
  if (isLoading || exchangeRates === null || !isVisible) {
    return null
  }

  // Generate content based on language
  const getContent = () => {
    if (currencyInfo && highlightedCurrency) {
      // Show highlighted currency + USD (non-highlighted)
      const labels: { [key in LanguageCode]: { highlighted: string; usd: string } } = {
        'ko': { highlighted: 'Kurs Won:', usd: 'Kurs USD:' },
        'ja': { highlighted: 'Kurs Yen:', usd: 'Kurs USD:' },
        'zh': { highlighted: '汇率 (人民币):', usd: '汇率 (美元):' },
        'ar': { highlighted: 'سعر الريال:', usd: 'سعر الدولار:' },
        'es': { highlighted: 'Tipo de Cambio EUR:', usd: 'Tipo de Cambio USD:' },
        'fr': { highlighted: 'Taux EUR:', usd: 'Taux USD:' },
        'en': { highlighted: '', usd: '' },
        'id': { highlighted: '', usd: '' }
      }

      const label = labels[detectedLanguage]
      return {
        highlighted: {
          text: label.highlighted,
          rate: `1 USD = ${highlightedCurrency}`,
          display: highlightedCurrency
        },
        usd: {
          text: label.usd || 'USD Rate:',
          // Only show IDR for Indonesian language, for others just show USD reference
          rate: detectedLanguage === 'id' ? `1 USD = ${usdRate} IDR` : '1 USD = $1.00'
        }
      }
    } else {
      // Show USD only (non-highlighted) for English and Indonesian
      const isId = detectedLanguage === 'id'
      return {
        highlighted: null,
        usd: {
          text: isId ? 'Kurs USD:' : 'USD Rate:',
          // Only show IDR for Indonesian, for English just show USD reference
          rate: isId ? `1 USD = ${usdRate} IDR` : '1 USD = $1.00'
        }
      }
    }
  }

  const content = getContent()

  return (
    <div className="currency-highlight" role="complementary" aria-label="Currency rate">
      <div className="currency-highlight-content">
        {content.highlighted && (
          <>
            <div className="currency-icon">
              <DollarSign size={16} />
            </div>
            <div className="currency-text currency-highlighted">
              <span className="currency-label">{content.highlighted.text}</span>
              <span className="currency-rate">{content.highlighted.rate}</span>
            </div>
            <div className="currency-separator">|</div>
          </>
        )}
        <div className="currency-icon">
          <DollarSign size={16} />
        </div>
        <div className="currency-text currency-non-highlighted">
          <span className="currency-label">{content.usd.text}</span>
          <span className="currency-rate">{content.usd.rate}</span>
        </div>
        <div className="currency-trend">
          <TrendingUp size={14} />
        </div>
      </div>
    </div>
  )
}

export default CurrencyHighlight
