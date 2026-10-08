import { useLang } from "../i18n.jsx";
import { config } from "../content/content.js";
import { useCountdown } from "../useCountdown.js";
import Petals from "./Petals.jsx";

export default function Ceremony() {
  const { t } = useLang();
  const { days, hours, minutes, seconds, passed } = useCountdown(
    config.weddingDateISO,
  );

  const units = [
    [days, t.countdown.days],
    [hours, t.countdown.hours],
    [minutes, t.countdown.minutes],
    [seconds, t.countdown.seconds],
  ];

  return (
    <section
      id="ceremonia"
      className="surface-night relative overflow-hidden px-3 pt-12 pb-24 sm:pt-16 sm:pb-32">
      <Petals tone="dark" />

      <div className="reveal relative mx-auto max-w-xl rounded-2xl bg-glow/10 px-6 py-12 text-center ring-1 ring-glow/15 backdrop-blur-sm sm:px-12">
        {/* flores decorativas centradas sobre los bordes de la card */}
        <img
          src="/flower-counter-up-1.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute left-1/2 top-3 z-20 w-48 -translate-x-1/2 -translate-y-[70%] select-none sm:w-60"
        />
        <img
          src="/flower-counter1.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute bottom-3 left-1/2 z-20 w-48 -translate-x-1/2 translate-y-[70%] select-none sm:w-60"
        />

        <p className="text-[11px] uppercase tracking-[0.3em] text-linen/80 sm:text-xs">
          {config.weddingMonth}
        </p>
        {/* save-the-date: weekday | month + big day | year, flanked by hairlines */}

        <div className="mx-auto flex max-w-md items-center justify-center gap-x-3 sm:gap-x-4 my-3">
          <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.25em] text-linen/70 sm:text-xs">
            {config.weddingWeekday}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-gold/30" />
          <span className="font-display text-6xl  leading-none text-gold sm:text-7xl">
            {config.weddingDay}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-gold/30" />
          <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.25em] text-linen/70 sm:text-xs px-2">
            {config.weddingYear}
          </span>
        </div>

        {/* hora de inicio, protagonista justo debajo de la fecha */}
        <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-sage sm:text-xs">
          {t.ceremony.startsLabel}
        </p>
        <p className="mt-1 font-display text-4xl leading-none text-gold sm:text-5xl">
          {t.ceremony.timeLabel}
        </p>

        {/* countdown, tucked right under the date as one composition */}
        {passed ? (
          <p className="mt-10 font-display text-2xl text-gold sm:text-xl">
            {t.countdown.passed}
          </p>
        ) : (
          <>
            <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-sage">
              {t.countdown.title}
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-6">
              {units.map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-4xl tabular-nums text-gold sm:text-6xl">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-linen/60 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
