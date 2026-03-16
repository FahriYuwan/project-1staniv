"use client";

/* ─── MusicPlayer ─────────────────────────────────────────────────────────────
   Floating music control button — fixed bottom-right, sits above the dots bar.
   - Loads /music/about-you.mp3
   - Default volume: 0.25
   - Attempts autoplay on mount; gracefully falls back if browser blocks it
   - First tap after blocked autoplay starts playback
   - Toggle mute / unmute while playing
   - Animated spinning vinyl ring while playing
────────────────────────────────────────────────────────────────────────────── */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  /* ── Attempt autoplay on mount ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;
    audio.loop = true;

    const attempt = audio.play();
    if (attempt !== undefined) {
      attempt
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          /* Autoplay blocked — show tooltip hint */
          setIsPlaying(false);
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 4500);
        });
    }

    return () => {
      audio.pause();
    };
  }, []);

  /* ── Button click handler ── */
  const handleClick = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.muted = false;
      setIsMuted(false);
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowTooltip(false);
        })
        .catch(console.error);
    } else {
      const next = !isMuted;
      audio.muted = next;
      setIsMuted(next);
    }
  }, [isPlaying, isMuted]);

  /* ── Icon & label ── */
  const icon = !isPlaying ? "▶" : isMuted ? "🔇" : "♪";
  const label = !isPlaying
    ? "Play music"
    : isMuted
      ? "Unmute music"
      : "Mute music";

  /* ─────────────────────────────────────────────────────────────────────────
     Positioning:
       Button  → bottom: 4.5rem (72 px) — above the ~50 px dots bar
       Tooltip → bottom: 8.5rem (136 px) — above the button
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <audio
        ref={audioRef}
        src="/music/about-you.mp3"
        loop
        preload="auto"
        aria-hidden="true"
      />

      {/* ── Tooltip ── */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              bottom: "8.5rem",
              right: "1rem",
              zIndex: 55,
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-primary)",
              borderRadius: "0.875rem",
              padding: "0.55rem 0.9rem",
              boxShadow: "0 4px 18px rgba(114,74,36,0.16)",
              maxWidth: 190,
              pointerEvents: "none",
            }}
          >
            <p
              className="font-serif"
              style={{
                fontSize: "0.72rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.5,
                textAlign: "center",
              }}
            >
              🎵 Tap to play our song
            </p>
            {/* Downward arrow pointing at the button */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: -7,
                right: 20,
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "7px solid var(--color-primary)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ── */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label={label}
        style={{
          position: "fixed",
          /* Sit above the dots bar (~50 px tall) with breathing room */
          bottom: "4.5rem",
          right: "1rem",
          zIndex: 50,
          width: 44,
          height: 44,
          borderRadius: "50%",
          backgroundColor: "var(--color-secondary)",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 18px rgba(114,74,36,0.38)",
          padding: 0,
        }}
      >
        {/* Spinning vinyl ring while playing */}
        {isPlaying && !isMuted && (
          <motion.span
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: -3,
              borderRadius: "50%",
              border: "2px dashed rgba(217,193,157,0.5)",
              pointerEvents: "none",
            }}
          />
        )}

        <span
          aria-hidden="true"
          style={{
            fontSize: icon === "♪" ? "1.15rem" : "0.9rem",
            color: "#faf5ed",
            lineHeight: 1,
            display: "block",
            userSelect: "none",
          }}
        >
          {icon}
        </span>
      </motion.button>
    </>
  );
}
