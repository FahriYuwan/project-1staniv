"use client";

/* ─── Story Page (Main Shell) ─────────────────────────────────────────────────
   Hosts all 10 chapters in a single-page experience.
   - Auth guard: redirects to / if the password gate was not passed
   - Animated chapter transitions via Framer Motion AnimatePresence
   - Top bar: progress dots + hamburger menu
   - Bottom bar: prev / next arrows + chapter counter
   - Persistent MusicPlayer (outside AnimatePresence so it never re-mounts)
   - Keyboard navigation: ← / → arrow keys, ESC closes the menu
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

/* ── Chapter registry ── */
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

/* ── Slide variants for chapter transitions ── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "55%" : "-55%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-55%" : "55%",
    opacity: 0,
  }),
};

const slideTransition = {
  duration: 0.48,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function StoryPage() {
  const router = useRouter();

  /* 0-based chapter index */
  const [chapterIndex, setChapterIndex] = useState(0);
  /* +1 = forward, -1 = backward */
  const [direction, setDirection] = useState(1);
  /* Hamburger menu visibility */
  const [menuOpen, setMenuOpen] = useState(false);
  /* Prevent double-navigation while a transition is in flight */
  const [transitioning, setTransitioning] = useState(false);

  /* ── Auth guard ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    const passed = sessionStorage.getItem("anniversary_auth");
    if (!passed) router.replace("/");
  }, [router]);

  /* ── Navigation helpers ─────────────────────────────────────────────────── */
  const navigate = useCallback(
    (nextIndex: number) => {
      if (transitioning) return;
      if (nextIndex < 0 || nextIndex >= CHAPTERS.length) return;
      setDirection(nextIndex > chapterIndex ? 1 : -1);
      setTransitioning(true);
      setChapterIndex(nextIndex);
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
    (index: number) => {
      navigate(index);
      setMenuOpen(false);
    },
    [navigate],
  );

  /* ── Keyboard navigation ────────────────────────────────────────────────── */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  /* ── Swipe support (touch devices) ─────────────────────────────────────── */
  useEffect(() => {
    let startX = 0;
    function onTouchStart(e: TouchEvent) {
      startX = e.touches[0].clientX;
    }
    function onTouchEnd(e: TouchEvent) {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) < 50) return; /* ignore tiny swipes */
      if (diff > 0) goNext();
      else goPrev();
    }
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goNext, goPrev]);

  const ActiveChapter = CHAPTERS[chapterIndex].component;
  const isFirst = chapterIndex === 0;
  const isLast = chapterIndex === CHAPTERS.length - 1;

  return (
    <div
      className="relative flex min-h-dvh flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #fdf8f0 0%, #f5e9d0 55%, #ede0c4 100%)",
      }}
    >
      {/* ══════════════════════════════════════════════════════════════════════
          TOP BAR — progress dots + hamburger button
      ══════════════════════════════════════════════════════════════════════ */}
      <header
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-4"
        style={{ pointerEvents: menuOpen ? "none" : "auto" }}
      >
        {/* Progress dots */}
        <div
          className="flex items-center gap-1.5"
          aria-label="Chapter progress"
          style={{ pointerEvents: "auto" }}
        >
          {CHAPTERS.map((_, i) => (
            <button
              key={i}
              onClick={() => goToChapter(i)}
              aria-label={`Go to chapter ${i + 1}`}
              style={{
                width: i === chapterIndex ? 20 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor:
                  i === chapterIndex
                    ? "var(--color-secondary)"
                    : "var(--color-primary)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.3s ease, background-color 0.2s",
              }}
            />
          ))}
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close chapter menu" : "Open chapter menu"}
          aria-expanded={menuOpen}
          style={{
            pointerEvents: "auto",
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: "var(--color-parchment)",
            border: "1.5px solid var(--color-primary)",
            boxShadow: "0 2px 8px rgba(114,74,36,0.12)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            cursor: "pointer",
            padding: 0,
          }}
        >
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
                transition: "transform 0.25s ease, opacity 0.2s",
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
        </button>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          HAMBURGER MENU OVERLAY
      ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{
              background: "linear-gradient(160deg, #fdf8f0 0%, #f2e8d5 100%)",
            }}
          >
            {/* Close row */}
            <div className="flex justify-end px-5 py-4">
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-parchment)",
                  border: "1.5px solid var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  color: "var(--color-secondary)",
                }}
              >
                ✕
              </button>
            </div>

            {/* Menu heading */}
            <div className="px-8 pb-4">
              <h2
                className="font-handwritten"
                style={{ fontSize: "1.9rem", color: "var(--color-secondary)" }}
              >
                Our Story
              </h2>
              <div
                aria-hidden="true"
                style={{
                  height: 1,
                  width: "80%",
                  marginTop: "0.45rem",
                  background:
                    "linear-gradient(90deg, var(--color-primary), transparent)",
                }}
              />
            </div>

            {/* Chapter list */}
            <nav
              className="flex flex-col gap-0.5 overflow-y-auto px-5 pb-10"
              aria-label="Chapter navigation"
            >
              {CHAPTERS.map((ch, i) => (
                <motion.button
                  key={ch.id}
                  initial={{ opacity: 0, x: 20 }}
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
                    backgroundColor:
                      i === chapterIndex
                        ? "var(--color-primary)"
                        : "transparent",
                    border:
                      i === chapterIndex
                        ? "1px solid var(--color-primary-dark)"
                        : "1px solid transparent",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                >
                  <span
                    className="font-sans"
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color:
                        i === chapterIndex
                          ? "var(--color-secondary-dark)"
                          : "var(--color-text-muted)",
                      minWidth: 22,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="font-serif"
                    style={{
                      fontSize: "0.9rem",
                      color:
                        i === chapterIndex
                          ? "var(--color-secondary-dark)"
                          : "var(--color-text-primary)",
                      fontWeight: i === chapterIndex ? 600 : 400,
                      flex: 1,
                    }}
                  >
                    {ch.title}
                  </span>

                  {i === chapterIndex && (
                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-secondary)",
                      }}
                    >
                      ✿
                    </span>
                  )}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════════
          CHAPTER CONTENT — AnimatePresence handles slide transitions
      ══════════════════════════════════════════════════════════════════════ */}
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
            style={{ minHeight: "100dvh" }}
          >
            <ActiveChapter />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ══════════════════════════════════════════════════════════════════════
          BOTTOM NAV — prev arrow · chapter counter · next arrow
      ══════════════════════════════════════════════════════════════════════ */}
      <footer
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4"
        style={{ pointerEvents: "none" }}
      >
        {/* Previous */}
        <motion.button
          onClick={goPrev}
          disabled={isFirst || transitioning}
          aria-label="Previous chapter"
          whileHover={!isFirst ? { scale: 1.1 } : {}}
          whileTap={!isFirst ? { scale: 0.92 } : {}}
          style={{
            pointerEvents: "auto",
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "var(--color-parchment)",
            border: "1.5px solid var(--color-primary)",
            boxShadow: "0 2px 10px rgba(114,74,36,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isFirst ? "default" : "pointer",
            opacity: isFirst ? 0.3 : 1,
            transition: "opacity 0.25s",
            padding: 0,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              color: "var(--color-secondary)",
              fontSize: "1.15rem",
              lineHeight: 1,
              display: "block",
              transform: "translateX(-1px)",
            }}
          >
            ←
          </span>
        </motion.button>

        {/* Chapter counter */}
        <AnimatePresence mode="wait">
          <motion.span
            key={chapterIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="font-serif"
            style={{
              pointerEvents: "none",
              fontSize: "0.72rem",
              fontStyle: "italic",
              color: "var(--color-text-muted)",
            }}
          >
            {chapterIndex + 1} / {CHAPTERS.length}
          </motion.span>
        </AnimatePresence>

        {/* Next */}
        <motion.button
          onClick={goNext}
          disabled={isLast || transitioning}
          aria-label="Next chapter"
          whileHover={!isLast ? { scale: 1.1 } : {}}
          whileTap={!isLast ? { scale: 0.92 } : {}}
          style={{
            pointerEvents: "auto",
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "var(--color-parchment)",
            border: "1.5px solid var(--color-primary)",
            boxShadow: "0 2px 10px rgba(114,74,36,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isLast ? "default" : "pointer",
            opacity: isLast ? 0.3 : 1,
            transition: "opacity 0.25s",
            padding: 0,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              color: "var(--color-secondary)",
              fontSize: "1.15rem",
              lineHeight: 1,
              display: "block",
              transform: "translateX(1px)",
            }}
          >
            →
          </span>
        </motion.button>
      </footer>

      {/* ══════════════════════════════════════════════════════════════════════
          MUSIC PLAYER — fixed bottom-right, persists across all chapters
      ══════════════════════════════════════════════════════════════════════ */}
      <MusicPlayer />
    </div>
  );
}
