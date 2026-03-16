"use client";

/* ─── MusicPlayer ─────────────────────────────────────────────────────────────
   Floating bottom-right music control button.
   - Loads /music/about-you.mp3
   - Default volume: 0.25
   - Attempts autoplay on mount; gracefully falls back if browser blocks it
   - First tap after blocked autoplay starts playback
   - Toggle mute / unmute while playing
   - Animated vinyl disc when playing
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
          /* Autoplay blocked by browser — show tooltip hint */
          setIsPlaying(false);
          setShowTooltip(true);
          /* Hide tooltip after 4 s */
          setTimeout(() => setShowTooltip(false), 4000);
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
      /* Resume / start playback */
      audio.muted = false;
      setIsMuted(false);
      audio.play().then(() => {
        setIsPlaying(true);
        setShowTooltip(false);
      });
    } else {
      /* Toggle mute while playing */
      const next = !isMuted;
      audio.muted = next;
      setIsMuted(next);
    }
  }, [isPlaying, isMuted]);

  /* ── Derive icon ── */
  const icon = !isPlaying ? "▶" : isMuted ? "🔇" : "♪";
  const label = !isPlaying
    ? "Play music"
    : isMuted
    ? "Unmute music"
    : "Mute music";

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/music/about-you.mp3"
        loop
        preload="auto"
        aria-hidden="true"
      />

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              bottom: "5rem",
              right: "1.25rem",
              zIndex: 51,
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-primary)",
              borderRadius: "0.75rem",
              padding: "0.5rem 0.85rem",
              boxShadow: "0 4px 16px rgba(114,74,36,0.15)",
              maxWidth: 180,
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
            {/* Little arrow */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: -7,
                right: 18,
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

      {/* Floating button */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label={label}
        style={{
          position: "fixed",
          bottom: "1.25rem",
          right: "1.25rem",
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
          boxShadow: "0 4px 16px rgba(114,74,36,0.35)",
          padding: 0,
        }}
      >
        {/* Spinning vinyl ring when playing and not muted */}
        {isPlaying && !isMuted && (
          <motion.span
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: -3,
              borderRadius: "50%",
              border: "2px dashed rgba(217,193,157,0.45)",
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
