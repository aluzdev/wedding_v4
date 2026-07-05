import { useLang } from "../i18n.jsx";
import { config } from "../content/content.js";
import { useCountdown } from "../useCountdown.js";

export default function Countdown() {
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
      id="countdown"
      className="bg-night px-6 py-20 text-center sm:py-28 gap-12">


      <div className="reveal mx-auto max-w-4xl">
        {passed ? (
          <p className="font-display text-3xl text-gold sm:text-5xl">
            {t.countdown.passed}
          </p>
        ) : (
          <>
            <p className="text-[11px] uppercase tracking-[0.2em] text-sage">
              {t.countdown.title}
            </p>
            <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-8">
              {units.map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-4xl tabular-nums text-gold sm:text-7xl">
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
