import { useLang } from "../i18n.jsx";
import { config } from "../content/content.js";

export default function Dress() {
  const { lang, t } = useLang();

  return (
    <section
      id="dress-code"
      className="surface-vestimenta px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="mx-auto max-w-3xl text-center">
        <header className="reveal space-y-3">
          <h2 className="mx-auto max-w-xl font-display text-[clamp(2rem,6vw,3.25rem)] italic leading-[1.1] text-balance">
            {t.dress.eyebrow}
          </h2>
          <h5 className="font-display text-[clamp(1.15rem,2vw,1.75rem)] text-balance">
            {t.dress.title}
          </h5>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-ink/75 sm:text-base">
            {t.dress.note}
          </p>
        </header>

        {/* the palette IS the content: a fan of paint-chip capsules */}
        <ul className="reveal mt-7 flex flex-wrap items-end justify-center gap-5 sm:gap-7">
          {config.dressColors.map((color, i) => (
            <li key={i} className="group flex flex-col items-center gap-4">
              <span
                className="h-16 w-16 rounded-full shadow-lg ring-1 ring-ink/10 transition-transform duration-300 ease-out group-hover:-translate-y-2 sm:h-40 sm:w-20"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs uppercase tracking-[0.18em] text-ink/65">
                {color[lang] || color.es}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
