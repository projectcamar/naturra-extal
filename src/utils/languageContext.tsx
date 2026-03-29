import React, { createContext, useContext, useState, useEffect } from 'react'
import type { LanguageCode } from './languageManager'
import { getCurrentLanguage, storeLanguage } from './languageManager'

interface LanguageContextType {
    language: LanguageCode
    setLanguage: (lang: LanguageCode) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<LanguageCode>('en')

    useEffect(() => {
        // Initial detection
        const initialLang = getCurrentLanguage(window.location.pathname, window.location.search)
        setLanguageState(initialLang)
    }, [])

    const setLanguage = (lang: LanguageCode) => {
        setLanguageState(lang)
        storeLanguage(lang)
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
