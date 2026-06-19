import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'

export default function Rsvp() {
  const { t } = useLang()
  const hasForm = Boolean(config.rsvpFormEmbedUrl)

  return (
    <section id="rsvp" className="bg-cream-soft px-6 pt-12 pb-24 text-ink sm:pt-16 sm:pb-32">
      <div className="mx-auto max-w-xl">
        <header className="reveal text-center">
          <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.75rem)]">{t.rsvp.title}</h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-px w-16 bg-moss/40" />
        </header>

        <div className="reveal mt-10 rounded-2xl bg-cream px-6 py-10 text-center shadow-md ring-1 ring-black/5 sm:px-10">
          <p className="font-display text-lg text-moss sm:text-xl">{t.rsvp.deadline}</p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/70">{t.rsvp.note}</p>
              <a
                href={config.rsvpFormEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-night px-6 py-2.5 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-night-soft"
              >
                {t.rsvp.open}
              </a>          
        </div>
      </div>
    </section>
  )
}
