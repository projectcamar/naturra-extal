import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { LanguageCode } from './languageManager'
import { getCurrentLanguage, storeLanguage } from './languageManager'

interface LanguageContextType {
    language: LanguageCode
    setLanguage: (lang: LanguageCode) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation()
    const [language, setLanguageState] = useState<LanguageCode>(() =>
        getCurrentLanguage(window.location.pathname, window.location.search)
    )

    // Sync state with URL/Location changes
    useEffect(() => {
        const currentLang = getCurrentLanguage(location.pathname, location.search)
        if (currentLang !== language) {
            setLanguageState(currentLang)
        }
    }, [location.pathname, location.search])

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
