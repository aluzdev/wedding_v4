import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'
import { useParallax } from '../useParallax.js'
import Petals from './Petals.jsx'
import leaves from '../assets/story-leaves.webp'

function Moment({ moment, index, lang }) {
  const m = moment[lang]
  const even = index % 2 === 0
  // each photo frame drifts gently on scroll; alternate direction per row
  const frameRef = useParallax(even ? 0.06 : -0.06)

  return (
    <li
      className={`reveal relative sm:flex sm:items-center sm:gap-12 ${
        even ? '' : 'sm:flex-row-reverse'
      }`}
    >
      {/* node on the central vine (desktop) / left rail (mobile) */}
      <span
        aria-hidden="true"
        className="absolute -left-[2.55rem] top-1 h-3.5 w-3.5 rounded-full bg-moss ring-4 ring-cream sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
      />
      <div className="mb-5 sm:mb-0 sm:w-1/2">
        <div
          ref={frameRef}
          className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-cream/85 shadow-xl ring-1 ring-white/60"
        >
          {moment.photo ? (
            <img
              src={moment.photo}
              alt={m.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <svg viewBox="0 0 24 24" className="h-16 w-16 text-moss/40" fill="currentColor">
              <path d="M12 2C7 7 6 12 12 22 18 12 17 7 12 2Zm0 4c2 3 2.5 6 0 11-2.5-5-2-8 0-11Z" />
            </svg>
          )}
        </div>
      </div>
      <div className={`sm:w-1/2 ${even ? 'sm:pl-4 sm:text-left' : 'sm:pr-4 sm:text-right'}`}>
        <p className="font-display text-sm text-gold">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="mt-1 font-display text-xl text-ink sm:text-2xl">{m.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70 sm:text-base">{m.text}</p>
      </div>
    </li>
  )
}

export default function Story() {
  const { lang, t } = useLang()

  return (
    <section
      id="historia"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#e7ecdd_0%,#dde4cf_45%,#d3dcc4_100%)] px-6 pt-12 pb-24 text-ink sm:pt-16 sm:pb-32"
    >
      {/* faded foliage bands top + bottom — lush green framing the eucalyptus wash */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-72 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${leaves})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-72 -scale-y-100 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${leaves})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#e7ecdd]/40 to-[#e7ecdd]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#d3dcc4]/40 to-[#d3dcc4]"
      />
      <Petals tone="light" />

      <div className="relative mx-auto max-w-3xl">
        <header className="reveal text-center">
          <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.75rem)]">{t.story.title}</h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-px w-16 bg-moss/40" />
        </header>

        <ol className="relative mt-16 space-y-16 border-l border-moss/20 pl-8 sm:mt-24 sm:space-y-28 sm:border-l-0 sm:pl-0">
          {/* central vine connector on desktop */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-moss/30 to-transparent sm:block"
          />
          {config.story.map((moment, i) => (
            <Moment key={moment[lang].title} moment={moment} index={i} lang={lang} />
          ))}
        </ol>

      

      </div>
    </section>
  )
}
