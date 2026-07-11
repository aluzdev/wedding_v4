import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLang } from "../i18n.jsx";

// Sección "módulos": mosaico de tarjetas que abren un modal con la info de cada
// tema (vestimenta, preguntas, niños, itinerario). El contenido vive en
// content.js; aquí solo se decide cómo se presenta.

const ORDER = ["dress", "faq", "kids", "itinerary"];

// ícono ilustrado por módulo (line-art sobre lino, en public/icons)
const ICONS = {
  dress: "/icons/CD.jpg",
  faq: "/icons/Q&A.jpg",
  kids: "/icons/CHILD.jpg",
  itinerary: "/icons/ITINERARIO.jpg",
};

export default function Modals() {
  const { t } = useLang();
  const active = useActiveModule();
  const items = t.modulos.items;

  return (
    <section
      id="modulos"
      className="surface-night relative overflow-hidden px-6 pt-16 pb-24 sm:pt-24 sm:pb-32"
    >
      <img
        src="/flower-modals.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0 w-40 select-none sm:w-56"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="reveal text-center">
          <h2 className="font-display text-[clamp(1.75rem,5vw,2.75rem)] text-balance">
            {t.modulos.title}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream sm:text-base">
            {t.modulos.note}
          </p>
        </header>

        {/* 2x2 en móvil, una sola fila de 4 desde tablet: las tarjetas llenan
            su columna (aspect real del icono) en vez de un tamaño fijo, así no
            quedan chiquitas ni separadas por huecos enormes. */}
        <div className="reveal mx-auto mt-10 grid max-w-sm grid-cols-2 gap-4 sm:mt-14 sm:max-w-none sm:grid-cols-4 sm:gap-6">
          {ORDER.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => active.open(id)}
              aria-label={items[id].label}
              className="group aspect-[441/512] w-full overflow-hidden rounded-2xl ring-1 ring-ink/10 transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/50"
            >
              <img
                src={ICONS[id]}
                alt=""
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </button>
          ))}
        </div>
      </div>

      <ModuleModal id={active.id} onClose={active.close} />
    </section>
  );
}

// pequeño hook local: qué módulo está abierto
function useActiveModule() {
  const [id, setId] = useState(null);
  return { id, open: setId, close: () => setId(null) };
}

function ModuleModal({ id, onClose }) {
  const { t } = useLang();
  const reduce = useReducedMotion();

  // cerrar con Escape + bloquear scroll del body mientras está abierto
  useEffect(() => {
    if (!id) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [id, onClose]);

  const label = id ? t.modulos.items[id].label : "";

  return (
    <AnimatePresence>
      {id ? (
        <motion.div
          key="backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-night/80 px-4 py-6 backdrop-blur-sm sm:items-center sm:px-6"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cream p-7 text-left text-ink shadow-2xl sm:p-9"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t.modulos.close}
              className="absolute right-4 top-4 text-ink/50 transition-colors hover:text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <ModuleBody id={id} t={t} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ModuleBody({ id, t }) {
  if (id === "dress") return <DressBody t={t} />;
  if (id === "kids") return <KidsBody t={t} />;
  if (id === "itinerary") return <ItineraryBody t={t} />;
  if (id === "faq") return <FaqBody t={t} />;
  return null;
}

function DressBody({ t }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-moss">{t.dress.eyebrow}</p>
      <h3 className="mt-1 font-display text-2xl">{t.dress.title}</h3>

      <img
        src="/code dress.jpg"
        alt={t.dress.title}
        className="mt-5 w-full rounded-xl shadow-md"
      />
    </div>
  );
}

function FaqBody({ t }) {
  return (
    <div>
      <h3 className="font-display text-2xl">{t.faq.title}</h3>
      <dl className="mt-5 divide-y divide-ink/10 border-t border-ink/10">
        {t.faq.items.map((item, i) => (
          <details key={i} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-base text-ink marker:hidden">
              <span>{item.q}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5 shrink-0 text-moss transition-transform duration-300 group-open:rotate-180"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-ink/70">{item.a}</p>
          </details>
        ))}
      </dl>
    </div>
  );
}

function KidsBody({ t }) {
  // el mensaje trae {highlight}: lo partimos para resaltar esa palabra
  const [before, after] = t.kids.body.split("{highlight}");
  return (
    <div>
      <h3 className="font-display text-2xl">{t.kids.title}</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
        {before}
        <span className="font-display text-moss">{t.kids.highlight} 🎈</span>
        {after}
      </p>
      <img
        src="/castle.jpg"
        alt={t.kids.title}
        className="w-full"
      />
    </div>
  );
}

function ItineraryBody({ t }) {
  return (
    <div>
      <h3 className="font-display text-2xl">{t.itinerary.title}</h3>
      <p className="mt-2 text-sm italic text-ink/55">{t.itinerary.note}</p>

      <ol className="mt-6 space-y-0">
        {t.itinerary.items.map((it, i, arr) => (
          <li key={i} className="flex gap-4">
            {/* riel vertical con nodo */}
            <div className="flex flex-col items-center">
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gold ring-4 ring-gold/15" />
              {i < arr.length - 1 ? <span className="w-px flex-1 bg-ink/15" /> : null}
            </div>
            <div className="pb-6">
              <p className="font-mono text-sm text-moss">{it.time}</p>
              <p className="font-display text-lg leading-tight text-ink">{it.label}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
