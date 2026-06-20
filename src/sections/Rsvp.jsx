import { useState } from 'react'
import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'

// fill {placeholders} in a string with runtime values (familia, lugares…)
function fill(str, vars) {
  return str.replace(/\{(\w+)\}/g, (m, key) => (key in vars ? vars[key] : m))
}

const emptyGuest = () => ({ nombre: '', apellido: '', nino: false })

export default function Rsvp() {
  const { t } = useLang()
  const api = config.rsvpApiUrl

  const [step, setStep] = useState('lookup') // lookup | form | done | already
  const [familia, setFamilia] = useState('')
  const [clave, setClave] = useState('')
  const [family, setFamily] = useState(null) // { familia, lugares }
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // no API configured yet → graceful "coming soon"
  if (!api) {
    return (
      <Shell t={t}>
        <div className="reveal mt-10 rounded-2xl bg-cream px-6 py-10 text-center shadow-md ring-1 ring-black/5 sm:px-10">
          <p className="font-display text-lg text-moss sm:text-xl">{t.rsvp.deadline}</p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/70">{t.rsvp.comingSoon}</p>
        </div>
      </Shell>
    )
  }

  const lookup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const url = `${api}?action=lookup&familia=${encodeURIComponent(familia.trim())}&clave=${encodeURIComponent(clave.trim())}`
      const res = await fetch(url)
      const data = await res.json()
      if (!data.ok) {
        setError(t.rsvp.notFound)
        return
      }
      if (data.confirmado) {
        setStep('already')
        return
      }
      setFamily({ familia: data.familia, lugares: data.lugares })
      setGuests(Array.from({ length: data.lugares }, emptyGuest))
      setStep('form')
    } catch {
      setError(t.rsvp.errorGeneric)
    } finally {
      setLoading(false)
    }
  }

  const updateGuest = (i, patch) =>
    setGuests((prev) => prev.map((g, idx) => (idx === i ? { ...g, ...patch } : g)))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const attending = guests
      .map((g) => ({ nombre: g.nombre.trim(), apellido: g.apellido.trim(), nino: g.nino }))
      .filter((g) => g.nombre || g.apellido)
    if (attending.length === 0) {
      setError(t.rsvp.atLeastOne)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(api, {
        method: 'POST',
        // text/plain keeps it a "simple" request → avoids a CORS preflight
        // that Apps Script web apps cannot answer.
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'submit',
          familia: familia.trim(),
          clave: clave.trim(),
          guests: attending,
        }),
      })
      const data = await res.json()
      if (data.ok) {
        setStep('done')
      } else if (data.error === 'already') {
        setStep('already')
      } else {
        setError(t.rsvp.errorGeneric)
      }
    } catch {
      setError(t.rsvp.errorGeneric)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Shell t={t}>
      <div className="reveal mx-auto mt-10 max-w-lg rounded-2xl bg-cream px-6 py-10 shadow-md ring-1 ring-black/5 sm:px-10">
        {step === 'lookup' && (
          <form onSubmit={lookup} className="space-y-5 text-center">
            <p className="font-display text-lg text-moss sm:text-xl">{t.rsvp.deadline}</p>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-ink/70">{t.rsvp.note}</p>
            <div className="space-y-4 text-left">
              <Field
                label={t.rsvp.familiaLabel}
                value={familia}
                onChange={setFamilia}
                placeholder={t.rsvp.familiaPlaceholder}
                required
              />
              <Field
                label={t.rsvp.claveLabel}
                value={clave}
                onChange={setClave}
                placeholder={t.rsvp.clavePlaceholder}
                help={t.rsvp.claveHelp}
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <SubmitButton loading={loading} label={t.rsvp.searchBtn} loadingLabel={t.rsvp.searching} />
          </form>
        )}

        {step === 'form' && family && (
          <form onSubmit={submit} className="space-y-6">
            <div className="text-center">
              <p className="font-display text-2xl text-moss">
                {fill(t.rsvp.greeting, { familia: family.familia })}
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/70">
                {fill(t.rsvp.reserved, { lugares: family.lugares })}
              </p>
            </div>

            <ul className="space-y-4">
              {guests.map((g, i) => (
                <li key={i} className="rounded-xl bg-cream-soft px-4 py-4 ring-1 ring-black/5">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-moss">
                    {t.rsvp.guest} {i + 1}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label={t.rsvp.nombre} value={g.nombre} onChange={(v) => updateGuest(i, { nombre: v })} />
                    <Field label={t.rsvp.apellido} value={g.apellido} onChange={(v) => updateGuest(i, { apellido: v })} />
                  </div>
                  <label className="mt-3 flex items-center gap-2 text-sm text-ink/70">
                    <input
                      type="checkbox"
                      checked={g.nino}
                      onChange={(e) => updateGuest(i, { nino: e.target.checked })}
                      className="h-4 w-4 rounded border-ink/30 text-moss focus:ring-moss"
                    />
                    {t.rsvp.nino}
                  </label>
                </li>
              ))}
            </ul>

            {error && <p className="text-center text-sm text-red-600">{error}</p>}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => { setStep('lookup'); setError('') }}
                className="text-sm tracking-wide text-ink/50 transition-colors hover:text-ink"
              >
                ← {t.rsvp.back}
              </button>
              <SubmitButton loading={loading} label={t.rsvp.submitBtn} loadingLabel={t.rsvp.submitting} />
            </div>
          </form>
        )}

        {step === 'done' && <Closing title={t.rsvp.thanksTitle} text={t.rsvp.thanksText} />}
        {step === 'already' && <Closing title={t.rsvp.alreadyTitle} text={t.rsvp.alreadyText} />}
      </div>
    </Shell>
  )
}

function Shell({ t, children }) {
  return (
    <section id="rsvp" className="bg-cream-soft px-6 pt-12 pb-24 text-ink sm:pt-16 sm:pb-32">
      <div className="mx-auto max-w-xl">
        <header className="reveal text-center">
          <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.75rem)]">{t.rsvp.title}</h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-px w-16 bg-moss/40" />
        </header>
        {children}
      </div>
    </section>
  )
}

function Field({ label, value, onChange, placeholder, help, required }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-moss">{label}</span>
      <input
        type="text"
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-moss"
      />
      {help && <span className="mt-1 block text-xs text-ink/50">{help}</span>}
    </label>
  )
}

function SubmitButton({ loading, label, loadingLabel }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-block rounded-full bg-night px-7 py-2.5 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-night-soft disabled:opacity-60"
    >
      {loading ? loadingLabel : label}
    </button>
  )
}

function Closing({ title, text }) {
  return (
    <div className="py-6 text-center">
      <p className="font-display text-2xl text-moss sm:text-3xl">{title}</p>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/70">{text}</p>
    </div>
  )
}
