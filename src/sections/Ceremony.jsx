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
      className="relative overflow-hidden bg-night px-3 pt-12 pb-24 text-linen sm:pt-16 sm:pb-32">
      <Petals tone="dark" />

      <div className="reveal relative mx-auto max-w-xl rounded-2xl bg-red/10 px-6 py-12 text-center ring-1 ring-white/15 backdrop-blur-md sm:px-12">
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

        <p className="text-sm uppercase tracking-[0.15em] text-linen/70">
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

        <span
          aria-hidden="true"
          className="mx-auto mt-10 block h-px w-12 bg-white/15"
        />

        <p className="mt-8 font-display text-lg text-linen sm:text-xl">
          {config.venueName}
        </p>

        <a
          href={config.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-linen/90 px-6 py-2.5 text-sm font-medium tracking-wide text-night transition-colors hover:bg-linen">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
            aria-hidden="true">
            <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
          </svg>
          {t.ceremony.directions}
        </a>
      </div>
    </section>
  );
}
