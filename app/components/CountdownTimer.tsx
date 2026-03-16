"use client";

/* ─── CountdownTimer ─────────────────────────────────────────────────────────
   Displays a live countdown to a target date (March 20 2026 — 1st anniversary).
   Updates every second via setInterval.
   Each unit renders inside a warm parchment tile with a handwritten number.
────────────────────────────────────────────────────────────────────────────── */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

/* Anniversary date: March 20, 2026 */
const ANNIVERSARY = new Date("2026-03-20T00:00:00");

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(ANNIVERSARY)
  );

  /* Tick every second */
  useEffect(() => {
    const id = setInterval(
      () => setTimeLeft(calculateTimeLeft(ANNIVERSARY)),
      1000
    );
    return () => clearInterval(id);
  }, []);

  const units: { label: string; value: number }[] = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  const reached =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (reached) {
    return (
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="font-handwritten text-center"
        style={{
          fontSize: "clamp(1.4rem, 6vw, 2rem)",
          color: "var(--color-secondary)",
        }}
      >
        Happy Anniversary! 🤍
      </motion.p>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "0.6rem",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {units.map(({ label, value }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 60,
            backgroundColor: "var(--color-parchment)",
            border: "1.5px solid var(--color-primary)",
            borderRadius: "0.875rem",
            padding: "0.65rem 0.4rem 0.5rem",
            boxShadow: "0 2px 10px rgba(114, 74, 36, 0.1)",
          }}
        >
          {/* Animated number — re-mounts on value change for a flip feel */}
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="font-handwritten"
            style={{
              fontSize: "clamp(1.6rem, 7vw, 2rem)",
              lineHeight: 1,
              color: "var(--color-secondary)",
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
              display: "block",
            }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>

          {/* Label */}
          <span
            className="font-sans"
            style={{
              fontSize: "0.58rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-text-muted)",
              marginTop: "0.25rem",
            }}
          >
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
