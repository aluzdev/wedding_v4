import { createContext, useContext, useEffect, useState } from 'react'
import { content } from './content/content.js'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang')
    return saved === 'en' || saved === 'es' ? saved : 'es'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: content[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- provider + hook belong together
export function useLang() {
  return useContext(LangContext)
}
