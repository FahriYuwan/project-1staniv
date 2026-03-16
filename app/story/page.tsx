"use client";

/* ─── Story Page (Main Shell) ─────────────────────────────────────────────────
   UX layout:
   • Hamburger button  — fixed top-right, always visible, morphs to ✕
   • Pagination dots   — fixed bottom, perfectly centered
   • Prev / Next arrows— desktop only (hidden on mobile)
   • Swipe hint        — mobile only pill, auto-dismisses after 3 s
   • MusicPlayer       — fixed above the dots bar (handled in MusicPlayer.tsx)
   • Auth guard        — redirects to / if password gate was skipped
────────────────────────────────────────────────────────────────────────────── */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import MusicPlayer from "../components/MusicPlayer";

import Chapter1 from "../chapters/Chapter1";
import Chapter2 from "../chapters/Chapter2";
import Chapter3 from "../chapters/Chapter3";
import Chapter4 from "../chapters/Chapter4";
import Chapter5 from "../chapters/Chapter5";
import Chapter6 from "../chapters/Chapter6";
import Chapter7 from "../chapters/Chapter7";
import Chapter8 from "../chapters/Chapter8";
import Chapter9 from "../chapters/Chapter9";
import Chapter10 from "../chapters/Chapter10";

/* ── Chapter registry ──────────────────────────────────────────────────────── */
const CHAPTERS = [
  { id: 1, title: "Happy 1st Anniversary", component: Chapter1 },
  { id: 2, title: "First Meeting", component: Chapter2 },
  { id: 3, title: "Short Conversation", component: Chapter3 },
  { id: 4, title: "Unexpected Message", component: Chapter4 },
  { id: 5, title: "Braga", component: Chapter5 },
  { id: 6, title: "First Date", component: Chapter6 },
  { id: 7, title: "Monthly Memories", component: Chapter7 },
  { id: 8, title: "Love Letter", component: Chapter8 },
  { id: 9, title: "Future Wishes", component: Chapter9 },
  { id: 10, title: "Plushie Family", component: Chapter10 },
] as const;

/* ── Framer Motion slide variants ─────────────────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "55%" : "-55%", opacity: 0 }),
  center: () => ({ x: 0, opacity: 1 }),
  exit: (dir: number) => ({ x: dir > 0 ? "-55%" : "55%", opacity: 0 }),
};

const slideTransition = {
  duration: 0.46,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

/* ── NavArrow — shared prev/next button ───────────────────────────────────── */
function NavArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const isPrev = direction === "prev";
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? "Previous chapter" : "Next chapter"}
      whileHover={!disabled ? { scale: 1.12 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        backgroundColor: "rgba(253,248,240,0.9)",
        border: "1.5px solid var(--color-primary)",
        boxShadow: "0 2px 12px rgba(114,74,36,0.14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.28 : 1,
        transition: "opacity 0.25s",
        padding: 0,
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        flexShrink: 0,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          color: "var(--color-secondary)",
          fontSize: "1.1rem",
          lineHeight: 1,
          display: "block",
          transform: isPrev ? "translateX(-1px)" : "translateX(1px)",
          userSelect: "none",
        }}
      >
        {isPrev ? "←" : "→"}
      </span>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function StoryPage() {
  const router = useRouter();

  const [chapterIndex, setChapterIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  /* Swipe hint: shown for the first 3 s on mobile */
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  /* ── Auth guard ── */
  useEffect(() => {
    if (!sessionStorage.getItem("anniversary_auth")) router.replace("/");
  }, [router]);

  /* ── Auto-dismiss swipe hint ── */
  useEffect(() => {
    const t = setTimeout(() => setShowSwipeHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  /* ── Navigation ── */
  const navigate = useCallback(
    (next: number) => {
      if (transitioning) return;
      if (next < 0 || next >= CHAPTERS.length) return;
      setDirection(next > chapterIndex ? 1 : -1);
      setTransitioning(true);
      setChapterIndex(next);
      setShowSwipeHint(false); /* dismiss hint on first nav */
    },
    [chapterIndex, transitioning],
  );

  const goNext = useCallback(
    () => navigate(chapterIndex + 1),
    [chapterIndex, navigate],
  );
  const goPrev = useCallback(
    () => navigate(chapterIndex - 1),
    [chapterIndex, navigate],
  );
  const goToChapter = useCallback(
    (i: number) => {
      navigate(i);
      setMenuOpen(false);
    },
    [navigate],
  );

  /* ── Keyboard ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  /* ── Touch swipe ── */
  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) < 50) return;
      diff > 0 ? goNext() : goPrev();
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [goNext, goPrev]);

  const ActiveChapter = CHAPTERS[chapterIndex].component;
  const isFirst = chapterIndex === 0;
  const isLast = chapterIndex === CHAPTERS.length - 1;

  /* ════════════════════════════════════════════════════════════════════════ */
  return (
    <div
      className="relative flex min-h-dvh flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #fdf8f0 0%, #f5e9d0 55%, #ede0c4 100%)",
      }}
    >
      {/* ════════════════════════════════════════════════════════════════════
          HAMBURGER — fixed top-right, morphs to ✕ when menu is open
      ════════════════════════════════════════════════════════════════════ */}
      <motion.button
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close chapter menu" : "Open chapter menu"}
        aria-expanded={menuOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 50,
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "rgba(253,248,240,0.92)",
          border: "1.5px solid var(--color-primary)",
          boxShadow: "0 2px 12px rgba(114,74,36,0.16)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          cursor: "pointer",
          padding: 0,
        }}
      >
        {/* Three lines that animate into an X */}
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: "block",
              width: 16,
              height: 1.5,
              borderRadius: 1,
              backgroundColor: "var(--color-secondary)",
              transformOrigin: "center",
              transition: "transform 0.26s ease, opacity 0.2s ease",
              transform:
                menuOpen && i === 0
                  ? "translateY(6.5px) rotate(45deg)"
                  : menuOpen && i === 2
                    ? "translateY(-6.5px) rotate(-45deg)"
                    : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </motion.button>

      {/* ════════════════════════════════════════════════════════════════════
          HAMBURGER MENU OVERLAY — slides in from the right
      ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{
              background: "linear-gradient(160deg, #fdf8f0 0%, #f2e8d5 100%)",
            }}
          >
            {/* Top spacer so content doesn't sit behind the hamburger button */}
            <div style={{ height: "4rem" }} />

            {/* Menu heading */}
            <div style={{ padding: "0 2rem 1rem" }}>
              <h2
                className="font-handwritten"
                style={{ fontSize: "2rem", color: "var(--color-secondary)" }}
              >
                Our Story
              </h2>
              <div
                aria-hidden="true"
                style={{
                  height: 1,
                  width: "75%",
                  marginTop: "0.5rem",
                  background:
                    "linear-gradient(90deg, var(--color-primary), transparent)",
                }}
              />
            </div>

            {/* Chapter list */}
            <nav
              className="flex flex-col gap-0.5 overflow-y-auto pb-10"
              style={{ padding: "0 1.25rem" }}
              aria-label="Chapter navigation"
            >
              {CHAPTERS.map((ch, i) => {
                const active = i === chapterIndex;
                return (
                  <motion.button
                    key={ch.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.28 }}
                    onClick={() => goToChapter(i)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      borderRadius: "0.875rem",
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      backgroundColor: active
                        ? "var(--color-primary)"
                        : "transparent",
                      border: active
                        ? "1px solid var(--color-primary-dark)"
                        : "1px solid transparent",
                      cursor: "pointer",
                      transition: "background-color 0.18s",
                      width: "100%",
                    }}
                  >
                    {/* Number */}
                    <span
                      className="font-sans"
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        color: active
                          ? "var(--color-secondary-dark)"
                          : "var(--color-text-muted)",
                        minWidth: 22,
                        flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Title */}
                    <span
                      className="font-serif"
                      style={{
                        fontSize: "0.9rem",
                        color: active
                          ? "var(--color-secondary-dark)"
                          : "var(--color-text-primary)",
                        fontWeight: active ? 600 : 400,
                        flex: 1,
                      }}
                    >
                      {ch.title}
                    </span>

                    {/* Active indicator */}
                    {active && (
                      <span
                        aria-hidden="true"
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--color-secondary)",
                          flexShrink: 0,
                        }}
                      >
                        ✿
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          CHAPTER CONTENT — animated slide transitions
          Extra bottom padding ensures content clears the dots bar
      ════════════════════════════════════════════════════════════════════ */}
      <main className="relative flex flex-1 overflow-hidden">
        <AnimatePresence
          custom={direction}
          mode="wait"
          onExitComplete={() => setTransitioning(false)}
        >
          <motion.div
            key={chapterIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="w-full overflow-y-auto"
            /* pb-20 ≈ 80 px — clears the ~50 px dots bar + breathing room */
            style={{ minHeight: "100dvh", paddingBottom: "5rem" }}
          >
            <ActiveChapter />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ════════════════════════════════════════════════════════════════════
          SWIPE HINT — mobile only (md:hidden), auto-dismisses after 3 s
          Positioned just above the dots bar
      ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showSwipeHint && (
          <motion.div
            key="swipe-hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
            /* md:hidden — only show on mobile */
            className="fixed z-20 flex justify-center md:hidden"
            style={{
              bottom: "3.8rem",
              left: 0,
              right: 0,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.55rem",
                backgroundColor: "rgba(114, 74, 36, 0.72)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderRadius: "2rem",
                padding: "0.38rem 1.1rem",
              }}
            >
              {/* Left arrow — bounces left */}
              <motion.span
                aria-hidden="true"
                animate={{ x: [-3, 0, -3] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ color: "#fdf8f0", fontSize: "0.85rem", lineHeight: 1 }}
              >
                ←
              </motion.span>

              <span
                className="font-sans"
                style={{
                  fontSize: "0.68rem",
                  color: "#fdf8f0",
                  letterSpacing: "0.08em",
                  userSelect: "none",
                }}
              >
                swipe to navigate
              </span>

              {/* Right arrow — bounces right */}
              <motion.span
                aria-hidden="true"
                animate={{ x: [3, 0, 3] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ color: "#fdf8f0", fontSize: "0.85rem", lineHeight: 1 }}
              >
                →
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          BOTTOM BAR — glassmorphism strip
          Layout (3 equal columns):
            [w-12 prev arrow — desktop only]
            [flex-1  ●  centered dots  ●]
            [w-12 next arrow — desktop only]
          On mobile the w-12 sections are empty → dots stay perfectly centered
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 flex items-center px-4"
        style={{
          height: "3.2rem",
          background: "rgba(253, 248, 240, 0.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderTop: "1px solid rgba(217, 193, 157, 0.45)",
          pointerEvents: "none",
        }}
      >
        {/* ── Left: prev arrow (desktop only) ── */}
        <div
          className="hidden md:flex w-12 justify-start"
          style={{ pointerEvents: "auto" }}
        >
          <NavArrow
            direction="prev"
            onClick={goPrev}
            disabled={isFirst || transitioning}
          />
        </div>

        {/* ── Center: dots ── */}
        <div
          className="flex flex-1 items-center justify-center gap-1.5"
          style={{ pointerEvents: "auto" }}
          aria-label="Chapter progress"
        >
          {CHAPTERS.map((_, i) => {
            const active = i === chapterIndex;
            return (
              <motion.button
                key={i}
                onClick={() => goToChapter(i)}
                aria-label={`Go to chapter ${i + 1}`}
                aria-current={active ? "true" : undefined}
                whileHover={!active ? { scale: 1.4 } : {}}
                whileTap={{ scale: 0.85 }}
                animate={{
                  width: active ? 20 : 6,
                  backgroundColor: active
                    ? "var(--color-secondary)"
                    : "var(--color-primary)",
                  opacity: active ? 1 : 0.65,
                }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                style={{
                  height: 6,
                  borderRadius: 3,
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>

        {/* ── Right: next arrow (desktop only) ── */}
        <div
          className="hidden md:flex w-12 justify-end"
          style={{ pointerEvents: "auto" }}
        >
          <NavArrow
            direction="next"
            onClick={goNext}
            disabled={isLast || transitioning}
          />
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          MUSIC PLAYER — fixed, sits above the dots bar
          (positioning managed inside MusicPlayer.tsx)
      ════════════════════════════════════════════════════════════════════ */}
      <MusicPlayer />
    </div>
  );
}
