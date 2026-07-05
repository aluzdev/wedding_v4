import { useLang } from "../i18n.jsx";

export default function Dress() {
  const { t } = useLang();

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

        {/* the palette IS the content: illustrated in the dress-code artwork */}
        <img
          src="/code dress.jpg"
          alt={t.dress.title}
          className="reveal mx-auto mt-7 w-full max-w-sm rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
}
