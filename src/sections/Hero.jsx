import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'

// blocky pixel cloud; outer g carries the .drift animation, inner g the position
function Cloud({ x, y, s = 1, dur, delay }) {
  return (
    <g className="drift" style={{ '--dur': dur, '--delay': delay }}>
      <g transform={`translate(${x} ${y}) scale(${s})`} fill="#ffffff">
        <rect x="14" y="0" width="20" height="6" />
        <rect x="6" y="5" width="38" height="7" />
        <rect x="36" y="3" width="14" height="6" />
        <rect x="0" y="11" width="58" height="8" />
        <rect x="0" y="19" width="58" height="4" fill="#d9edfb" />
      </g>
    </g>
  )
}

function Flower({ x, y, color, delay }) {
  return (
    <g className="sway" style={{ '--delay': delay }}>
      <g transform={`translate(${x} ${y})`}>
        <rect x="3" y="6" width="2" height="9" fill="#3a7a36" />
        <rect x="0" y="0" width="8" height="2" fill={color} />
        <rect x="0" y="4" width="8" height="2" fill={color} />
        <rect x="0" y="2" width="2" height="2" fill={color} />
        <rect x="6" y="2" width="2" height="2" fill={color} />
        <rect x="3" y="2" width="2" height="2" fill="#f6d44c" />
      </g>
    </g>
  )
}

function PixelScene() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMax slice"
      shapeRendering="crispEdges"
      className="absolute inset-0 h-full w-full"
    >
      {/* sky bands */}
      <rect x="0" y="0" width="320" height="92" fill="#4fa8e8" />
      <rect x="0" y="92" width="320" height="8" fill="#66b6ee" />
      <rect x="0" y="100" width="320" height="4" fill="#8fcdf4" />

      {/* drifting clouds — three depths */}
      <Cloud x="10" y="14" s="1.1" dur="110s" delay="-30s" />
      <Cloud x="120" y="34" s="0.7" dur="80s" delay="-60s" />
      <Cloud x="220" y="10" s="0.9" dur="95s" delay="-10s" />
      <Cloud x="60" y="56" s="0.5" dur="70s" delay="-45s" />
      <Cloud x="260" y="64" s="0.4" dur="130s" delay="-90s" />

      {/* distant tree line */}
      <g fill="#3e7e46">
        <rect x="0" y="98" width="320" height="6" />
        <rect x="12" y="94" width="14" height="4" />
        <rect x="48" y="95" width="10" height="3" />
        <rect x="86" y="94" width="16" height="4" />
        <rect x="150" y="95" width="12" height="3" />
        <rect x="246" y="94" width="10" height="4" />
      </g>

      {/* lawn */}
      <rect x="0" y="104" width="320" height="76" fill="#5fa84f" />
      <g fill="#6fbe5c">
        <rect x="24" y="118" width="22" height="4" />
        <rect x="124" y="128" width="26" height="4" />
        <rect x="238" y="146" width="30" height="5" />
        <rect x="66" y="156" width="24" height="5" />
        <rect x="158" y="110" width="20" height="3" />
      </g>

      {/* path winding from horizon to bottom-left */}
      <g fill="#d9b26f">
        <rect x="146" y="104" width="12" height="8" />
        <rect x="140" y="112" width="18" height="10" />
        <rect x="128" y="122" width="24" height="12" />
        <rect x="110" y="134" width="30" height="14" />
        <rect x="84" y="148" width="40" height="14" />
        <rect x="52" y="162" width="54" height="18" />
      </g>
      <g fill="#c49c5c">
        <rect x="146" y="108" width="4" height="4" />
        <rect x="134" y="126" width="5" height="4" />
        <rect x="116" y="140" width="6" height="4" />
        <rect x="92" y="154" width="7" height="5" />
        <rect x="64" y="170" width="8" height="5" />
      </g>

      {/* wedding tent — centered so the 390px mobile crop keeps it,
          pushed low so mobile text never sits on the white canvas */}
      <g transform="translate(0 16)">
        <rect x="170" y="84" width="32" height="7" fill="#f4f4ee" />
        <rect x="164" y="91" width="44" height="7" fill="#fafaf6" />
        <rect x="158" y="98" width="56" height="6" fill="#f4f4ee" />
        <g fill="#ddddd2">
          <rect x="158" y="104" width="8" height="3" />
          <rect x="174" y="104" width="8" height="3" />
          <rect x="190" y="104" width="8" height="3" />
          <rect x="206" y="104" width="8" height="3" />
        </g>
        <rect x="160" y="104" width="52" height="26" fill="#fafaf6" />
        <rect x="200" y="104" width="12" height="26" fill="#e6e6da" />
        <rect x="180" y="112" width="12" height="18" fill="#7a8794" />
        <rect x="180" y="112" width="12" height="3" fill="#5d6a77" />
      </g>

      {/* big framing tree, right (crops away gracefully on mobile) */}
      <g>
        <g fill="#2f6b38">
          <rect x="244" y="0" width="76" height="26" />
          <rect x="252" y="26" width="68" height="16" />
          <rect x="262" y="42" width="58" height="16" />
        </g>
        <g fill="#3e8347">
          <rect x="250" y="8" width="40" height="10" />
          <rect x="268" y="30" width="36" height="9" />
          <rect x="276" y="48" width="30" height="8" />
        </g>
        <g fill="#52a055">
          <rect x="258" y="14" width="18" height="6" />
          <rect x="284" y="34" width="16" height="5" />
        </g>
        <rect x="288" y="58" width="16" height="58" fill="#5c3d28" />
        <rect x="288" y="58" width="5" height="58" fill="#6f4c33" />
        <rect x="278" y="64" width="12" height="6" fill="#5c3d28" />
        <rect x="300" y="76" width="12" height="5" fill="#5c3d28" />
        <g fill="#4c8c40">
          <rect x="282" y="116" width="30" height="4" />
          <rect x="276" y="120" width="42" height="4" />
        </g>
      </g>

      {/* bush cluster bottom-left (below the text block) */}
      <g>
        <g fill="#3e8347">
          <rect x="6" y="148" width="34" height="10" />
          <rect x="12" y="142" width="20" height="8" />
        </g>
        <rect x="16" y="146" width="10" height="4" fill="#52a055" />
      </g>

      {/* bench beside the path */}
      <g>
        <rect x="222" y="138" width="26" height="4" fill="#8a5a3b" />
        <rect x="222" y="132" width="26" height="3" fill="#8a5a3b" />
        <rect x="224" y="142" width="3" height="7" fill="#6e4730" />
        <rect x="243" y="142" width="3" height="7" fill="#6e4730" />
      </g>

      {/* swaying flowers */}
      <Flower x="118" y="158" color="#e86a6a" delay="0s" />
      <Flower x="168" y="146" color="#f2c94c" delay="-1.2s" />
      <Flower x="196" y="160" color="#b187d8" delay="-2.1s" />
      <Flower x="56" y="136" color="#f3f3ef" delay="-0.6s" />
      <Flower x="146" y="170" color="#e88ab0" delay="-2.8s" />

      {/* foreground grass tufts */}
      <g fill="#3f7f38">
        <rect x="0" y="174" width="320" height="6" />
        <rect x="14" y="170" width="4" height="4" />
        <rect x="52" y="171" width="3" height="3" />
        <rect x="118" y="170" width="4" height="4" />
        <rect x="170" y="171" width="3" height="3" />
        <rect x="226" y="170" width="4" height="4" />
        <rect x="292" y="171" width="4" height="3" />
      </g>
    </svg>
  )
}

export default function Hero() {
  const { t } = useLang()

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col justify-start overflow-hidden bg-[#4fa8e8] sm:justify-center"
    >
      <PixelScene />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-40 pt-28 sm:px-10 sm:pb-32 sm:pt-24">
        <div className="max-w-xl [text-shadow:0_1px_12px_rgba(20,40,70,0.35)]">
          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-white/85">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(3rem,11vw,5.5rem)] leading-none tracking-tight text-white">
            Cris <span className="font-light italic">&amp;</span> Pris
          </h1>
          <p className="mt-5 text-lg font-medium text-white sm:text-xl">{t.hero.dateLine}</p>
          <p className="mt-1 text-sm text-white/85 sm:text-base">{t.hero.venueLine}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3 [text-shadow:none]">
            <a
              href="#rsvp"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-night shadow-lg transition hover:bg-white/90"
            >
              {t.hero.cta}
            </a>
            <a
              href={config.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white/20 px-6 py-3 text-sm font-medium text-white ring-1 ring-white/40 backdrop-blur-sm transition hover:bg-white/30"
            >
              {t.ceremony.directions}
            </a>
          </div>
          <p className="mt-4 text-xs text-white/80">{t.hero.deadline}</p>
        </div>
      </div>
    </section>
  )
}
