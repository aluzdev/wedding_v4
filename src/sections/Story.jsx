import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'
import { FocusRail } from './FocusRail.jsx'

// ponytail: fotos pendientes (config.story[].photo === '') → placeholder hasta tenerlas
const FALLBACK_PHOTO = '/luna.jpg'

export default function Story() {
  const { lang, t } = useLang()

  const items = config.story.map((moment, i) => ({
    id: i,
    title: moment[lang].title,
    description: moment[lang].text,
    imageSrc: moment.photo || FALLBACK_PHOTO,
  }))

  return (
    <section id="historia" className="bg-night text-cream">
      <div className="mx-auto max-w-3xl px-6 pt-16 text-center">
        <h2 className="font-display text-[clamp(1.75rem,5vw,2.75rem)]">{t.story.title}</h2>
        <span aria-hidden="true" className="mx-auto mt-5 block h-px w-16 bg-glow/30" />
      </div>

      <FocusRail items={items} loop autoPlay={false} />
    </section>
  )
}
