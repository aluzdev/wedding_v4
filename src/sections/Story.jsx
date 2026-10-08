import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "../i18n.jsx";
import { config } from "../content/content.js";

// ponytail: fotos pendientes (config.story[].photo === '') → placeholder hasta tenerlas
const FALLBACK_PHOTO = "/luna.jpg";

export default function Story() {
  const { lang, t } = useLang();

  const items = config.story.map((moment, i) => ({
    id: i,
    title: moment[lang].title,
    description: moment[lang].text,
    imageSrc: moment.photo || FALLBACK_PHOTO,
  }));

  return (
    <section id="historia" className="surface-night">
      <FocusRail
        items={items}
        title={t.story.title}
        prevLabel={t.story.prev}
        nextLabel={t.story.next}
        railLabel={t.story.railLabel}
        loop
        autoPlay={false}
      />
    </section>
  );
}

// ponytail: tiny cn — these usages are mutually-exclusive conditionals, no tailwind-merge needed
const cn = (...a) => a.filter(Boolean).join(" ");

/** Helper to wrap indices (e.g., -1 becomes length-1) */
function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

/** Base spring for spatial movement (x/z) */
const BASE_SPRING = { type: "spring", stiffness: 300, damping: 30, mass: 1 };

/** Bouncier spring for the visual "tap" feedback on the center card */
const TAP_SPRING = { type: "spring", stiffness: 450, damping: 18, mass: 1 };

/** Per-value card transitions: bouncier scale ("tap"), base spring for the rest */
const CARD_TRANSITION = { default: BASE_SPRING, scale: TAP_SPRING };

/** Reduced motion: the rail snaps to its new pose, no travel/rotation */
const INSTANT = { duration: 0 };

function FocusRail({
  items,
  title,
  prevLabel,
  nextLabel,
  railLabel,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
}) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const lastWheelTime = React.useRef(0);
  const reduceMotion = useReducedMotion();

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  // --- NAVIGATION HANDLERS ---
  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  // --- TRACKPAD (HORIZONTAL) LOGIC ---
  // Only horizontal-dominant gestures flip slides. Vertical wheel/trackpad
  // deltas are ignored entirely so scrolling the page past the section never
  // changes the photo.
  const onWheel = React.useCallback(
    (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

      const now = Date.now();
      // Debounce: prevent rapid firing from inertia scrolling (400ms lockout)
      if (now - lastWheelTime.current < 400) return;

      // Threshold to avoid accidental micro-scrolls
      if (Math.abs(e.deltaX) > 20) {
        if (e.deltaX > 0) handleNext();
        else handlePrev();
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev],
  );

  // Autoplay logic
  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // --- SWIPE / DRAG LOGIC ---
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const onDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) handleNext();
    else if (swipe > swipeConfidenceThreshold) handlePrev();
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex h-[750px] w-full flex-col overflow-hidden bg-night text-cream outline-none select-none overflow-x-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-linen/70",
        className,
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label={railLabel}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Background Ambience
          Perf: the blur runs on a quarter-size layer scaled 4x (16px blur x4 ≈
          the old blur-3xl 64px) → ~1/16 of the pixels to filter per slide. A
          blurred photo has no detail to lose, so the down-scale is invisible.
          Only opacity animates (compositor-only). */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.3 : 0.8, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden"
          >
            <div className="absolute left-0 top-0 h-1/4 w-1/4 origin-top-left scale-[4]">
              <img
                src={activeItem.imageSrc}
                alt=""
                decoding="async"
                className="h-full w-full object-cover blur-lg saturate-200"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Section title, over the shared ambient background */}
      {title && (
        <div className="relative z-10 px-6 pt-12 pb-4 text-center">
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] text-balance">
            {title}
          </h2>
        </div>
      )}

      {/* Main Stage */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
        {/* DRAGGABLE RAIL CONTAINER */}
        <motion.div
          className="relative mx-auto flex h-[360px] w-full max-w-6xl items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            // Dynamic transforms
            const xOffset = offset * 320;
            const zOffset = -dist * 180;
            const scale = isCenter ? 1 : 0.85;
            const rotateY = offset * -20;

            const opacity = isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5);
            // Dimming = brightness(0.5), done as a black overlay's opacity so
            // it animates on the compositor instead of re-running a CSS filter
            // (and the old per-card depth blur) on every frame.
            const dim = isCenter ? 0 : 0.5;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute aspect-[3/4] w-[260px] md:w-[300px] rounded-2xl border-t border-glow/20 bg-night-soft shadow-2xl transition-shadow duration-300",
                  isCenter ? "z-20 shadow-glow/10" : "z-10",
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                }}
                transition={reduceMotion ? INSTANT : CARD_TRANSITION}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  decoding="async"
                  loading={isCenter ? "eager" : "lazy"}
                  className="h-full w-full rounded-2xl object-contain pointer-events-none"
                />

                {/* Lighting layers */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-glow/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl bg-hairline/10 pointer-events-none mix-blend-multiply" />

                {/* Off-center dimming */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl bg-hairline pointer-events-none"
                  initial={false}
                  animate={{ opacity: dim }}
                  transition={reduceMotion ? INSTANT : { duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info & Controls */}
        <div className="mx-auto mt-12 flex w-full max-w-4xl flex-col items-center justify-between gap-6 md:flex-row pointer-events-auto">
          <div
            className="flex flex-1 flex-col items-center text-center md:items-start md:text-left h-32 justify-center -translate-y-0.5"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 10, filter: "blur(4px)" }
                }
                animate={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -10, filter: "blur(4px)" }
                }
                transition={{ duration: reduceMotion ? 0.15 : 0.3 }}
              >
                <p className="font-display text-[28px] tracking-tight md:text-4xl text-cream">
                  {activeItem.title}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-night-soft/80 p-1 ring-1 ring-glow/10 backdrop-blur-md">
            <button
              onClick={handlePrev}
              className="rounded-full p-3 text-linen/70 transition hover:bg-glow/10 hover:text-cream active:scale-95"
              aria-label={prevLabel}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {/* linen/80 on night-soft = 6.72:1 (was linen/50 = 3.59:1) */}
            <span className="min-w-[40px] text-center text-xs font-mono text-linen/80">
              {activeIndex + 1} / {count}
            </span>
            <button
              onClick={handleNext}
              className="rounded-full p-3 text-linen/70 transition hover:bg-glow/10 hover:text-cream active:scale-95"
              aria-label={nextLabel}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
