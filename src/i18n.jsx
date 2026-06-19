import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { content, config } from './content/content.js'

const LangContext = createContext(null)

// resolve a dotted path ("couple.novio") against an object
function resolvePath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj)
}

// replace every {t.some.path} token inside strings with its value from `root`,
// walking nested objects and arrays. Unknown tokens are left untouched.
function interpolate(value, root) {
  if (typeof value === 'string') {
    return value.replace(/\{t\.([\w.]+)\}/g, (match, path) => {
      const resolved = resolvePath(root, path)
      return resolved == null ? match : String(resolved)
    })
  }
  if (Array.isArray(value)) return value.map((item) => interpolate(item, root))
  if (value && typeof value === 'object') {
    const out = {}
    for (const key in value) out[key] = interpolate(value[key], root)
    return out
  }
  return value
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang')
    return saved === 'en' || saved === 'es' ? saved : 'es'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  // `t` exposes the language strings plus shared config values (couple, dates,
  // venue…) so components and {t.xxx} tokens can reach both. Language strings win
  // on key clashes (story/hotels), so t.story stays the {eyebrow,title} object
  // while the config arrays are still imported directly where needed.
  const t = useMemo(() => {
    const merged = { ...config, ...content[lang] }
    return interpolate(merged, merged)
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- provider + hook belong together
export function useLang() {
  return useContext(LangContext)
}
