import { useMemo, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { MESAS } from '../content/mesas.js'

// "Encuentra tu mesa": buscador por nombre, pensado para el celular el día de
// la boda (de pie, una mano, quizá sin señal). Los datos van horneados en el
// sitio (src/content/mesas.js), así que una vez cargada la página la búsqueda
// funciona sin internet. Nunca se lista el plano completo: solo aparece una
// mesa después de escribir un nombre.

const STORAGE_KEY = 'mesa.seleccion'

// minúsculas y sin acentos: "Mónica" ≈ "monica"
function norm(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

// Nombres que se confunden: un nombre de una sola palabra cuyo primer nombre
// comparte alguien más ("Jorge" vs "Jorge Molina", las tres "Monica"). A esos
// se les agrega el apellido (columna "familia") o, si no hay, su nota
// ("Lorena (fotógrafa)"). Los títulos ("Pst") no cuentan como nombre.
const TITLES = new Set(['pst', 'sra', 'sr'])
const firstName = (name) => norm(name).split(' ').find((w) => !TITLES.has(w)) || ''
const COUNT = {}
for (const g of MESAS) for (const n of g.names) COUNT[firstName(n)] = (COUNT[firstName(n)] || 0) + 1
function displayName(name, group) {
  if (norm(name).split(' ').length > 1 || COUNT[firstName(name)] < 2) return name
  if (group.familia) return `${name} ${group.familia}`
  const nota = group.notas?.[name]
  return nota ? `${name} (${nota})` : name
}

// índice: un registro por persona, con su grupo y su mesa; el apellido
// también se puede buscar ("Monica Servin", "Servin")
const PEOPLE = MESAS.flatMap((g, gi) =>
  g.names.map((name) => ({
    name,
    label: displayName(name, g),
    group: gi,
    table: g.table,
    key: norm(`${name} ${g.familia}`),
    words: norm(`${name} ${g.familia}`).split(' '),
  })),
)

// coincide si el nombre (o cualquiera de sus palabras) empieza con lo escrito;
// primero los que empiezan igual que el nombre completo
function match(q) {
  const hits = []
  for (const p of PEOPLE) {
    if (p.key.startsWith(q)) hits.push({ ...p, rank: 0 })
    else if (p.words.some((w) => w.startsWith(q)) || (q.includes(' ') && p.key.includes(q)))
      hits.push({ ...p, rank: 1 })
  }
  return hits.sort((a, b) => a.rank - b.rank || a.table - b.table || a.name.localeCompare(b.name))
}

// La hoja casi siempre tiene solo el primer nombre: si alguien escribe su
// nombre completo ("Monica Hernández") y no hay nada, se reintenta con la
// primera palabra y se avisa.
function search(query) {
  const q = norm(query)
  if (q.length < 2) return { hits: [], fallback: null }
  const hits = match(q)
  if (hits.length || !q.includes(' ')) return { hits, fallback: null }
  const first = q.split(' ')[0]
  if (first.length < 2) return { hits: [], fallback: null }
  const retry = match(first)
  return retry.length ? { hits: retry, fallback: query.trim().split(/\s+/)[0] } : { hits: [], fallback: null }
}

function readSaved() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (!s) return null
    // la hoja pudo cambiar: solo se respeta si la persona sigue en ese grupo
    const g = MESAS[s.group]
    if (g && g.table === s.table && g.names.includes(s.name)) return s
  } catch {
    /* navegación privada o JSON viejo */
  }
  return null
}

export default function Seating() {
  const { t } = useLang()
  const s = t.seating
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState(readSaved) // { name, group, table }
  const [announce, setAnnounce] = useState('')
  const resultRef = useRef(null)
  const inputRef = useRef(null)

  const { hits, fallback } = useMemo(() => search(query), [query])
  const typed = norm(query).length >= 2

  function pick(p) {
    const sel = { name: p.name, group: p.group, table: p.table }
    setPicked(sel)
    setAnnounce(`${displayName(p.name, MESAS[p.group])}, ${s.yourTableIs} ${p.table}`)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sel)) } catch { /* sin storage */ }
    inputRef.current?.blur()
    // lleva la vista al resultado una vez pintado (el teclado ya se cerró)
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  }

  function reset() {
    setPicked(null)
    setQuery('')
    setAnnounce('')
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* sin storage */ }
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  // tecla "Buscar"/Enter del teclado: con un solo resultado lo elige; si hay
  // varios, cierra el teclado para que se vea la lista completa
  function onSubmit(e) {
    e.preventDefault()
    if (hits.length === 1) pick(hits[0])
    else inputRef.current?.blur()
  }

  let status = ''
  if (typed) {
    if (hits.length === 0) status = s.notFound.replace('{q}', query.trim())
    else if (fallback) status = s.fallback.replace('{q}', query.trim()).replace('{first}', fallback)
    else status = s.pickOne
  }

  return (
    // Misma superficie crema que "Cómo llegar": la separa la ramita con flor que
    // ya abre "Ceremonia" donde dos secciones comparten fondo (Historia →
    // Ceremonia). Va en el flujo, fuera de .reveal, para que el borde exista
    // antes de la animación; más aire arriba que abajo para que abra esta
    // sección y no cierre la anterior.
    <section id="mesa" className="surface-cream relative overflow-hidden px-6 pb-16 pt-4 sm:pb-24 sm:pt-8">
      <div className="relative z-10 mx-auto max-w-xl">
        <img
          src="/flower-counter-up-1.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none mx-auto mb-12 block w-48 select-none sm:mb-16 sm:w-60"
        />
        <header className="reveal text-center">
          <h2 className="mx-auto max-w-xl font-display text-[clamp(2rem,6vw,3.25rem)] italic leading-[1.1] text-balance">
            {s.title}
          </h2>
          {!picked && (
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/70 sm:text-base">{s.intro}</p>
          )}
        </header>

        {/* anuncio para lectores de pantalla (persistente: la lista se desmonta) */}
        <p className="sr-only" aria-live="polite">{announce}</p>

        {/* contenedor persistente: .reveal solo se observa una vez al cargar,
            así que nunca va en un bloque que se monta y desmonta */}
        <div className="reveal">
          {picked ? (
            <Result ref={resultRef} s={s} picked={picked} onReset={reset} />
          ) : (
            <form role="search" onSubmit={onSubmit} className="mt-8">
              <label htmlFor="mesa-buscar" className="mb-2 block text-sm font-medium text-ink/80">
                {s.label}
              </label>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-moss"
                  strokeWidth={2}
                />
                <input
                  ref={inputRef}
                  id="mesa-buscar"
                  type="search"
                  inputMode="search"
                  enterKeyHint="search"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="words"
                  spellCheck={false}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={s.placeholder}
                  aria-describedby="mesa-estado"
                  className="h-14 w-full appearance-none rounded-2xl bg-white pl-12 pr-12 text-lg text-ink caret-moss shadow-sm ring-1 ring-ink/15 placeholder:text-ink/70 focus:outline-none focus:ring-2 focus:ring-moss [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => { setQuery(''); inputRef.current?.focus() }}
                    aria-label={s.clear}
                    className="absolute right-1.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss"
                  >
                    <X aria-hidden="true" className="h-5 w-5" />
                  </button>
                )}
              </div>

              <p id="mesa-estado" aria-live="polite" className="mt-3 min-h-5 text-sm leading-relaxed text-ink/75">
                {status}
              </p>

              {hits.length > 0 && (
                <ul className="mt-2 space-y-2.5">
                  {hits.map((p) => (
                    <li key={`${p.group}-${p.name}`}>
                      <button
                        type="button"
                        onClick={() => pick(p)}
                        className="seat-row flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 text-left shadow-sm ring-1 ring-ink/10 active:bg-sage/15 hover:ring-moss/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss"
                      >
                        <span className="min-w-0 font-display text-xl leading-snug text-ink">{p.label}</span>
                        <span className="flex shrink-0 flex-col items-center leading-none text-moss">
                          <span className="text-xs font-medium uppercase tracking-[0.12em]">{s.table}</span>
                          <span className="mt-1 font-display text-3xl tabular-nums">{p.table}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Result({ ref, s, picked, onReset }) {
  // todos en esa mesa; solo se resalta a esta persona (puede haber nombres repetidos)
  const tablemates = MESAS.flatMap((g, gi) =>
    g.table === picked.table
      ? g.names.map((n) => ({ n: displayName(n, g), me: gi === picked.group && n === picked.name }))
      : [],
  )

  return (
    <div ref={ref} className="mt-8 scroll-mt-20">
      <div className="seat-reveal rounded-2xl bg-white px-6 pb-7 pt-6 text-center shadow-md ring-1 ring-ink/10">
        <p className="font-display text-lg text-ink/80">
          {displayName(picked.name, MESAS[picked.group])}, {s.yourTableIs}
        </p>
        <p className="mt-1 font-display text-[clamp(5.5rem,30vw,8rem)] leading-none text-moss tabular-nums">
          {picked.table}
        </p>

        <div className="mx-auto mt-6 max-w-sm border-t border-ink/10 pt-5">
          <p className="text-sm text-ink/75">{s.atTable}</p>
          {/* nombres sueltos (sin comas) y sin partirse: "Pst Marianita" queda junto */}
          <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-base text-ink">
            {tablemates.map(({ n, me }, i) => (
              <li key={`${n}-${i}`} className={`whitespace-nowrap ${me ? 'font-semibold text-moss' : ''}`}>
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* el plano va directo sobre la crema: una sola tarjeta blanca arriba */}
      <figure className="mt-8">
        <Plan table={picked.table} s={s} />
        <figcaption className="mt-3 text-center text-sm leading-relaxed text-ink/75">{s.planCaption}</figcaption>
      </figure>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-sage/30 px-7 py-3 text-sm font-medium tracking-wide text-moss ring-1 ring-moss/20 hover:bg-sage/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss"
        >
          <Search aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          {s.searchAgain}
        </button>
      </div>
    </div>
  )
}

// Plano del jardín, redibujado del croquis del salón (misma orientación:
// entrada abajo a la derecha). Coordenadas en unidades del viewBox (610 de
// ancho): en un celular de 390px se ve a ~0.56×, por eso los textos van a
// 24+ unidades (≈13.5px) y los números a 32 (≈18px).
const TABLES = {
  4: [51, 80], 3: [136, 79], 1: [379, 78], 2: [460, 77],
  5: [80, 180], 6: [53, 286], 8: [80, 376],
  9: [104, 474], 10: [199, 474], 7: [289, 474], 11: [377, 474], 12: [460, 474],
}
const TW = 60
const TH = 52

// Pasillos del croquis (entre las mesas y la pista): abajo y=422, izquierda
// x=126, arriba y=130. La ruta sale de la entrada (abajo a la derecha, junto
// a la barra) y sigue los pasillos hasta el borde de la mesa.
const ENTRY = [520, 520]
function route(table) {
  const [cx, cy] = TABLES[table]
  const pts = [ENTRY, [ENTRY[0], 422]]
  if (cy > 400) {
    pts.push([cx, 422], [cx, cy - TH / 2])
  } else if (cx < 110 && cy > 120) {
    pts.push([126, 422], [126, cy], [cx + TW / 2, cy])
  } else {
    pts.push([126, 422], [126, 130], [cx, 130], [cx, cy + TH / 2])
  }
  return 'M' + pts.map((p) => p.join(' ')).join(' L')
}

const INK = 'var(--color-ink)'
const MOSS = 'var(--color-moss)'
const DISPLAY = { fontFamily: 'var(--font-display)' }

function Plan({ table, s }) {
  return (
    <svg viewBox="0 0 610 600" role="img" aria-label={`${s.planLabel} ${table}`} className="h-auto w-full">
      {/* puntos de referencia fuera del jardín */}
      <g fill={INK} fillOpacity="0.8" fontSize="24" textAnchor="middle">
        <text x="100" y="27">{s.lake}</text>
        <text x="325" y="27">{s.tree}</text>
        <text x="540" y="27">{s.restrooms}</text>
      </g>

      <g transform="translate(5 40)">
        {/* jardín */}
        <rect x="0" y="0" width="600" height="520" rx="16" fill="#ffffff" fillOpacity="0.6" stroke={INK} strokeOpacity="0.25" strokeWidth="2" />

        {/* pista */}
        <rect x="143" y="160" width="380" height="235" rx="12" fill={INK} fillOpacity="0.04" stroke={INK} strokeOpacity="0.3" strokeWidth="2" strokeDasharray="8 8" />
        <text x="333" y="289" textAnchor="middle" fill={INK} fillOpacity="0.75" fontSize="36" fontStyle="italic" style={DISPLAY}>{s.dance}</text>

        {/* escenario y barras */}
        <rect x="532" y="120" width="62" height="292" rx="10" fill={INK} fillOpacity="0.08" />
        <text transform="translate(571 266) rotate(90)" textAnchor="middle" fill={INK} fillOpacity="0.85" fontSize="24" letterSpacing="3">{s.stage.toUpperCase()}</text>
        <rect x="536" y="14" width="54" height="96" rx="10" fill={INK} fillOpacity="0.08" />
        <text transform="translate(571 62) rotate(90)" textAnchor="middle" fill={INK} fillOpacity="0.85" fontSize="24">{s.bar}</text>
        <rect x="536" y="420" width="54" height="92" rx="10" fill={INK} fillOpacity="0.08" />
        <text transform="translate(571 466) rotate(90)" textAnchor="middle" fill={INK} fillOpacity="0.85" fontSize="24">{s.bar}</text>

        {/* mesa de los novios */}
        <rect x="198" y="34" width="116" height="56" rx="12" fill="var(--color-sage)" fillOpacity="0.45" stroke={MOSS} strokeOpacity="0.5" strokeWidth="2" />
        <text x="256" y="70" textAnchor="middle" fill={MOSS} fontSize="24" fontStyle="italic" style={DISPLAY}>{s.couple}</text>

        {/* ruta desde la entrada (debajo de las mesas para no taparlas) */}
        <path d={route(table)} fill="none" stroke={MOSS} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 10" />

        {/* mesas de invitados */}
        {Object.entries(TABLES).map(([n, [cx, cy]]) => {
          const on = Number(n) === table
          return (
            <g key={n}>
              {on && (
                <rect
                  x={cx - TW / 2 - 7} y={cy - TH / 2 - 7} width={TW + 14} height={TH + 14} rx="16"
                  className="seat-pulse" fill="none" stroke={MOSS} strokeWidth="3"
                />
              )}
              <rect
                x={cx - TW / 2} y={cy - TH / 2} width={TW} height={TH} rx="10"
                fill={on ? MOSS : '#ffffff'}
                stroke={on ? 'none' : INK}
                strokeOpacity="0.55"
                strokeWidth="2"
              />
              <text
                x={cx} y={cy + 11} textAnchor="middle"
                fontSize="32"
                fontWeight={on ? 600 : 500}
                fill={on ? 'var(--color-linen)' : INK}
                style={DISPLAY}
              >
                {n}
              </text>
            </g>
          )
        })}
      </g>

      {/* entrada: abajo a la derecha, como en el croquis */}
      <g fill={MOSS}>
        <path d="M508 597 l12 -17 l12 17 z" />
        <text x="496" y="595" textAnchor="end" fontSize="24" fontWeight="600">{s.entrance}</text>
      </g>
    </svg>
  )
}
