import { useState } from "react";
import { useLang } from "../i18n.jsx";
import { useGuest } from "../guest.jsx";
import { config } from "../content/content.js";

// fill {placeholders} in a string with runtime values (familia…)
function fill(str, vars) {
  return str.replace(/\{(\w+)\}/g, (m, key) => (key in vars ? vars[key] : m));
}

export default function Rsvp() {
  const { t } = useLang();
  const guest = useGuest();
  const api = config.rsvpApiUrl;

  const [step, setStep] = useState("idle"); // idle | form | done | already
  const [family, setFamily] = useState(null); // { familia, integrantes, solo }
  const [guests, setGuests] = useState([]); // [{ nombre, asiste }]
  const [mesa, setMesa] = useState(""); // número de mesa (se asigna la semana de la boda)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [syncedFamily, setSyncedFamily] = useState(null);
  const [attending, setAttending] = useState(true); // ¿alguien de la familia asiste?

  // La familia se identifica por su link personalizado (?c=clave); aquí solo
  // recibimos esa identidad desde el contexto y vamos directo a confirmar (o a
  // su mesa si ya enviaron). Sincronizamos una sola vez ajustando el estado
  // durante el render, el patrón recomendado por React para derivar de props.
  const incomingFamily = guest && guest.family;
  if (incomingFamily && incomingFamily !== syncedFamily) {
    setSyncedFamily(incomingFamily);
    setMesa(incomingFamily.mesa || "");
    setFamily({
      familia: incomingFamily.familia,
      integrantes: incomingFamily.integrantes,
      solo: incomingFamily.solo,
    });
    setGuests(
      (incomingFamily.integrantes || []).map((nombre) => ({
        nombre,
        asiste: true,
      })),
    );
    setAttending(incomingFamily.asiste !== false); // backend viejo (sin campo) → true
    setStep(incomingFamily.confirmado ? "already" : "form");
  }

  // no API configured yet → graceful "coming soon"
  if (!api) {
    return (
      <Shell t={t}>
        <div className="reveal mt-10 rounded-2xl bg-cream px-6 py-10 text-center shadow-md ring-1 ring-hairline/5 sm:px-10">
          <p className="font-display text-lg text-moss sm:text-xl">
            {t.rsvp.deadline}
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/70">
            {t.rsvp.comingSoon}
          </p>
        </div>
      </Shell>
    );
  }

  const toggleGuest = (i) =>
    setGuests((prev) =>
      prev.map((g, idx) => (idx === i ? { ...g, asiste: !g.asiste } : g)),
    );

  // envía la confirmación con la lista de invitados indicada
  const postSubmit = async (guestsToSend) => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(api, {
        method: "POST",
        // text/plain keeps it a "simple" request → avoids a CORS preflight
        // that Apps Script web apps cannot answer.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "submit",
          familia: family ? family.familia : "",
          clave: guest ? guest.clave : "",
          guests: guestsToSend,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        if (guest) guest.markConfirmed();
        setAttending(guestsToSend.some((g) => g.asiste));
        setStep("done");
      } else if (data.error === "already") {
        setStep("already");
      } else {
        setError(t.rsvp.errorGeneric);
      }
    } catch {
      setError(t.rsvp.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    postSubmit(guests);
  };

  // invitado que va solo: un único registro (con su nombre, o el de la fila)
  const soloName = family ? family.integrantes[0] || family.familia : "";
  const submitSolo = (asiste) => postSubmit([{ nombre: soloName, asiste }]);

  return (
    <Shell t={t}>
      <div className="reveal mx-auto mt-10 max-w-lg rounded-2xl bg-cream px-6 py-10 shadow-md ring-1 ring-hairline/5 sm:px-10">
        {step === "form" && family && family.solo && (
          <SoloConfirm
            t={t}
            familia={family.familia}
            loading={loading}
            error={error}
            onYes={() => submitSolo(true)}
            onNo={() => submitSolo(false)}
          />
        )}

        {step === "form" && family && !family.solo && (
          <form onSubmit={submit} className="space-y-6">
            <div className="text-center">
              <p className="font-display text-2xl text-moss">
                {fill(t.rsvp.greetingFamily, { familia: family.familia })}
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/70">
                {t.rsvp.reserved}
              </p>
            </div>

            <ul className="space-y-3">
              {guests.map((g, i) => (
                <li key={i}>
                  <label
                    className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-4 ring-1 transition-colors ${
                      g.asiste
                        ? "bg-moss/10 ring-moss/30"
                        : "bg-cream-soft ring-hairline/5"
                    }`}
                  >
                    <span className="font-display text-lg text-ink">
                      {g.nombre}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-ink/70">
                      {t.rsvp.attends}
                      <input
                        type="checkbox"
                        checked={g.asiste}
                        onChange={() => toggleGuest(i)}
                        className="h-5 w-5 rounded border-ink/30 text-moss focus:ring-moss"
                      />
                    </span>
                  </label>
                </li>
              ))}
            </ul>

            {error && (
              <p className="text-center text-sm text-danger">{error}</p>
            )}
            <div className="flex items-center justify-end gap-3">
              <SubmitButton
                loading={loading}
                label={t.rsvp.submitBtn}
                loadingLabel={t.rsvp.submitting}
              />
            </div>
          </form>
        )}

        {step === "done" && (
          <Closing
            title={t.rsvp.thanksTitle}
            text={t.rsvp.thanksText}
            mesa={mesa}
            mesaLabel={t.rsvp.mesaLabel}
          />
        )}
        {step === "already" && (
          <Closing
            title={t.rsvp.alreadyTitle}
            text={t.rsvp.alreadyText}
            mesa={mesa}
            mesaLabel={t.rsvp.mesaLabel}
          />
        )}
        {(step === "done" || step === "already") &&
          attending &&
          mesa === "" && (
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-ink/70">
              {t.rsvp.returnForTable}
            </p>
          )}

        {/* sin identificar todavía: o sigue cargando la clave del link, o llegó sin link */}
        {step === "idle" &&
          (guest && guest.loading ? (
            <p className="py-8 text-center font-display text-lg text-moss">
              {t.rsvp.checking}
            </p>
          ) : (
            <NoLink t={t} />
          ))}
      </div>
    </Shell>
  );
}

// Llegó sin link personalizado → no hay forma de identificarlo. Lo invitamos a
// abrir su link (y, si lo perdió, a escribirnos por WhatsApp).
function NoLink({ t }) {
  return (
    <div className="py-6 text-center">
      <p className="font-display text-2xl text-moss sm:text-3xl">
        {t.rsvp.noLinkTitle}
      </p>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
        {t.rsvp.noLinkText}
      </p>
      {config.whatsappNumber && (
        <a
          href={`https://wa.me/${config.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block rounded-full bg-night px-7 py-2.5 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-night-soft"
        >
          {t.rsvp.noLinkWhatsapp}
        </a>
      )}
    </div>
  );
}

// Pantalla para quien va solo: saludo + dos botones (Sí / No), sin lista de
// nombres ni textos en plural.
function SoloConfirm({ t, familia, loading, error, onYes, onNo }) {
  return (
    <div className="space-y-6 text-center">
      <div>
        <p className="font-display text-2xl text-moss">
          {fill(t.rsvp.greeting, { familia })}
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/70">
          {t.rsvp.soloIntro}
        </p>
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onYes}
          disabled={loading}
          className="rounded-full bg-night px-7 py-3 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-night-soft disabled:opacity-60"
        >
          {loading ? t.rsvp.submitting : t.rsvp.soloYes}
        </button>
        <button
          type="button"
          onClick={onNo}
          disabled={loading}
          className="rounded-full bg-cream-soft px-7 py-3 text-sm font-medium tracking-wide text-fuchsia-100 ring-1 ring-ink/15 transition-colors hover:bg-cream disabled:opacity-60"
        >
          {t.rsvp.soloNo}
        </button>
      </div>
    </div>
  );
}

function Shell({ t, children }) {
  return (
    <section
      id="rsvp"
      className="surface-rsvp px-6 pt-16 pb-24 sm:pt-24 sm:pb-32"
    >
      <div className="mx-auto max-w-xl">
        {/* the primary action gets the spotlight: a bright card on a dark stage */}
        <header className="reveal text-center">
          <h2 className="font-display text-[clamp(1.75rem,5vw,2.75rem)] text-balance">
            {t.rsvp.title}
          </h2>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-gold">
            {t.rsvp.deadline}
          </p>
        </header>
        {children}
      </div>
    </section>
  );
}

function SubmitButton({ loading, label, loadingLabel }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-block rounded-full bg-night px-7 py-2.5 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-night-soft disabled:opacity-60"
    >
      {loading ? loadingLabel : label}
    </button>
  );
}

function Closing({ title, text, mesa, mesaLabel }) {
  return (
    <div className="py-6 text-center">
      <p className="font-display text-2xl text-moss sm:text-3xl">{title}</p>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
        {text}
      </p>
      {mesa && (
        <div className="mx-auto mt-6 max-w-xs rounded-2xl bg-moss/10 px-6 py-5 ring-1 ring-moss/30">
          <p className="text-[11px] uppercase tracking-[0.18em] text-moss">
            {mesaLabel}
          </p>
          <p className="mt-1 font-display text-4xl text-ink">{mesa}</p>
        </div>
      )}
    </div>
  );
}
