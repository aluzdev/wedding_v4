import { createContext, useContext, useEffect, useState } from 'react'
import { config } from './content/content.js'

// Identidad de la familia invitada, compartida entre el sobre de bienvenida
// (Welcome) y la sección de confirmación (Rsvp). La clave puede llegar de tres
// formas: en el link personalizado (?c=clave), guardada de una visita anterior
// (localStorage) o escrita a mano en el sobre.

const STORAGE_KEY = 'rsvp.clave'
const GuestContext = createContext(null)

// clave inicial: primero la del link (?c=), luego la guardada en el navegador
function readInitialClave() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('c')
    if (fromUrl && fromUrl.trim()) return fromUrl.trim()
    return localStorage.getItem(STORAGE_KEY) || ''
  } catch {
    return ''
  }
}

export function GuestProvider({ children }) {
  const api = config.rsvpApiUrl
  const [clave, setClave] = useState(readInitialClave)
  const [family, setFamily] = useState(null) // { familia, integrantes, confirmado, mesa }
  const [loading, setLoading] = useState(false)

  // ya venía una clave (link o visita anterior) → identifica en silencio al cargar
  useEffect(() => {
    if (clave && !family) lookup(clave)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function lookup(value) {
    const c = (value || '').trim()
    if (!api || !c) return { ok: false }
    setLoading(true)
    try {
      const url = `${api}?action=lookupclave&clave=${encodeURIComponent(c)}`
      const res = await fetch(url)
      const data = await res.json()
      if (!data.ok) return { ok: false }
      const fam = {
        familia: data.familia,
        integrantes: data.integrantes || [],
        confirmado: !!data.confirmado,
        mesa: data.mesa || '',
        solo: !!data.solo,
        asiste: data.asiste !== false, // backend viejo (sin campo) → true

      }
      setClave(data.clave || c)
      setFamily(fam)
      try { localStorage.setItem(STORAGE_KEY, data.clave || c) } catch { /* navegación privada */ }
      return { ok: true, family: fam }
    } catch {
      return { ok: false, error: 'network' }
    } finally {
      setLoading(false)
    }
  }

  // tras confirmar: recuerda localmente que ya enviaron (al reabrir verán su mesa)
  function markConfirmed() {
    setFamily((f) => (f ? { ...f, confirmado: true } : f))
  }

  return (
    <GuestContext.Provider value={{ clave, family, loading, lookup, markConfirmed }}>
      {children}
    </GuestContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- provider + hook belong together
export function useGuest() {
  return useContext(GuestContext)
}
