"use client";

/* ─── InlineMusicPlayer ───────────────────────────────────────────────────────
   Self-contained HTML5 audio player for embedding inside a chapter.

   Features:
   - Play / Pause with animated icon swap (Framer Motion)
   - Clickable + touch-draggable progress bar with live seek thumb
   - Current time / total duration display (m:ss)
   - Spinning 🎵 album art while playing, or real cover via coverSrc prop
   - Spinning dashed ring around play button while active
   - Graceful fallback: renders fine even if the audio file is missing
   - stopPropagation on touch so seeking never triggers chapter swipe
   - Warm beige theme matching the rest of the site (#D9C19D / #724A24)
────────────────────────────────────────────────────────────────────────────── */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface InlineMusicPlayerProps {
  /** Path to the audio file, e.g. "/music/slchld.mp3" */
  src: string;
  /** Primary label shown as track title */
  title: string;
  /** Artist name shown below the title */
  artist: string;
  /** Optional italic description on a third line */
  subtitle?: string;
  /** Optional album cover image path */
  coverSrc?: string;
}

/* ── Format seconds → "m:ss" ── */
function fmt(s: number): string {
  if (!s || isNaN(s) || !isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function InlineMusicPlayer({
  src,
  title,
  artist,
  subtitle,
  coverSrc,
}: InlineMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  /* true while the user is touch-dragging — prevents timeupdate from
     snapping the thumb back while the finger is still moving            */
  const dragging = useRef(false);

  /* ── Wire up audio element events ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!dragging.current) setCurrentTime(audio.currentTime);
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  /* ── Toggle play / pause ── */
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          /* browser blocked autoplay or file missing — silent fail */
          console.warn("[InlineMusicPlayer] play() blocked:", err);
        });
    }
  }, [isPlaying]);

  /* ── Seek to position from a pixel x-coordinate ── */
  const seekFromClientX = useCallback(
    (clientX: number) => {
      const audio = audioRef.current;
      const bar = barRef.current;
      if (!audio || !bar || !duration) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      audio.currentTime = ratio * duration;
      setCurrentTime(ratio * duration);
    },
    [duration],
  );

  /* Mouse click on the progress bar */
  const onBarClick = (e: React.MouseEvent<HTMLDivElement>) =>
    seekFromClientX(e.clientX);

  /* Touch events — stopPropagation prevents the story-page swipe handler */
  const onBarTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dragging.current = true;
    seekFromClientX(e.touches[0].clientX);
  };
  const onBarTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    seekFromClientX(e.touches[0].clientX);
  };
  const onBarTouchEnd = () => {
    dragging.current = false;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  /* ─────────────────────────────────────────────────────────────────────── */
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-sand)",
        borderRadius: "1rem",
        padding: "0.9rem 1rem 0.85rem",
        width: "100%",
        boxShadow: "0 3px 16px rgba(114, 74, 36, 0.11)",
      }}
    >
      {/* Hidden HTML5 audio element */}
      <audio ref={audioRef} src={src} preload="metadata" aria-hidden="true" />

      {/* ══════════════════════════════════════════════════════════════════
          ROW 1 — album art · track info · play/pause button
      ══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "0.8rem",
        }}
      >
        {/* ── Album art ── */}
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "0.6rem",
            background: "linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 3px 12px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={`${title} album cover`}
              fill
              sizes="50px"
              style={{ objectFit: "cover" }}
            />
          ) : (
            /* Rotating music note while playing */
            <motion.span
              aria-hidden="true"
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={
                isPlaying
                  ? { duration: 3, repeat: Infinity, ease: "linear" }
                  : { duration: 0.35 }
              }
              style={{ fontSize: "1.5rem", lineHeight: 1, display: "block" }}
            >
              🎵
            </motion.span>
          )}

          {/* Subtle shimmer overlay while playing */}
          {isPlaying && (
            <motion.div
              aria-hidden="true"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "0.6rem",
                background:
                  "radial-gradient(circle at 30% 30%, rgba(217,193,157,0.35), transparent 70%)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* ── Track info ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            className="font-serif"
            style={{
              fontSize: "0.84rem",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </p>
          <p
            className="font-sans"
            style={{
              fontSize: "0.68rem",
              color: "var(--color-text-muted)",
              marginTop: "1px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {artist}
          </p>
          {subtitle && (
            <p
              className="font-serif"
              style={{
                fontSize: "0.62rem",
                color: "var(--color-text-muted)",
                fontStyle: "italic",
                marginTop: "1px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* ── Play / Pause button ── */}
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.91 }}
          aria-label={isPlaying ? "Pause" : "Play"}
          style={{
            position: "relative",
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "var(--color-secondary)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            boxShadow: "0 3px 12px rgba(114, 74, 36, 0.32)",
            padding: 0,
          }}
        >
          {/* Spinning dashed ring while playing */}
          {isPlaying && (
            <motion.span
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: -4,
                borderRadius: "50%",
                border: "2px dashed rgba(217, 193, 157, 0.5)",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Icon — swaps between ▶ and ⏸ with a pop animation */}
          <AnimatePresence mode="wait">
            <motion.span
              key={isPlaying ? "pause" : "play"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.13 }}
              aria-hidden="true"
              style={{
                fontSize: isPlaying ? "0.9rem" : "0.85rem",
                color: "#fdf8f0",
                lineHeight: 1,
                display: "block",
                /* optical nudge — ▶ needs 1–2 px right for visual center */
                transform: !isPlaying ? "translateX(1.5px)" : "none",
                userSelect: "none",
              }}
            >
              {isPlaying ? "⏸" : "▶"}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          ROW 2 — current time · progress bar · total duration
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {/* Current time */}
        <span
          className="font-sans"
          style={{
            fontSize: "0.6rem",
            color: "var(--color-text-muted)",
            minWidth: 28,
            textAlign: "right",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "0.02em",
            flexShrink: 0,
          }}
        >
          {fmt(currentTime)}
        </span>

        {/* ── Progress track ──
            The outer div has extra padding (+ negative margin) to create a
            larger invisible touch target without changing the visual height. */}
        <div
          ref={barRef}
          onClick={onBarClick}
          onTouchStart={onBarTouchStart}
          onTouchMove={onBarTouchMove}
          onTouchEnd={onBarTouchEnd}
          role="slider"
          aria-label="Seek position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          style={{
            flex: 1,
            /* expanded touch target */
            paddingTop: 9,
            paddingBottom: 9,
            marginTop: -9,
            marginBottom: -9,
            cursor: "pointer",
            position: "relative",
            boxSizing: "content-box",
          }}
        >
          {/* Visual track */}
          <div
            style={{
              position: "relative",
              height: 4,
              backgroundColor: "var(--color-sand)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {/* Filled (played) portion */}
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.08, ease: "linear" }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                background:
                  "linear-gradient(90deg, var(--color-primary-dark), var(--color-secondary))",
                borderRadius: 2,
              }}
            />
          </div>

          {/* Seek thumb — only rendered once there is progress */}
          {progress > 0 && (
            <motion.div
              animate={{ left: `${progress}%` }}
              transition={{ duration: 0.08, ease: "linear" }}
              style={{
                position: "absolute",
                top: "50%",
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "var(--color-secondary)",
                border: "2px solid var(--color-parchment)",
                boxShadow: "0 1px 5px rgba(114, 74, 36, 0.35)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* Total duration */}
        <span
          className="font-sans"
          style={{
            fontSize: "0.6rem",
            color: "var(--color-text-muted)",
            minWidth: 28,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "0.02em",
            flexShrink: 0,
          }}
        >
          {fmt(duration)}
        </span>
      </div>
    </div>
  );
}
