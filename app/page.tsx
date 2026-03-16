"use client";

/* ─── Password Gate Page ─────────────────────────────────────────────────────
   The very first screen the visitor sees.
   - Correct password "pippipupu" → navigates to /story
   - Wrong password          → subtle shake + error message
   - Countdown popup         → appears 1.5 s after load, can be minimized
                               to a small floating widget and reopened
────────────────────────────────────────────────────────────────────────────── */

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import CountdownTimer from "./components/CountdownTimer";

const CORRECT_PASSWORD = "pippipupu";

/* ─────────────────────────────────────────────────────────────────────────────
   COUNTDOWN POPUP — full centered modal
   Centering is done by a static flexbox wrapper so that Framer Motion's
   JS-driven transforms (scale / y) never conflict with translate(-50%,-50%).
───────────────────────────────────────────────────────────────────────────── */
function CountdownModal({ onMinimize }: { onMinimize: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="cd-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onMinimize}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(62, 40, 16, 0.35)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 80,
        }}
      />

      {/* Static centering wrapper — no animation, just flexbox */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 1.25rem",
          pointerEvents: "none",
        }}
      >
        {/* Animated modal card */}
        <motion.div
          key="cd-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Anniversary countdown timer"
          initial={{ opacity: 0, scale: 0.88, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.72, y: 48, x: -32 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 26,
            mass: 0.9,
          }}
          style={{
            pointerEvents: "auto",
            width: "100%",
            maxWidth: 340,
            backgroundColor: "var(--color-parchment)",
            border: "1.5px solid var(--color-primary)",
            borderRadius: "1.5rem",
            padding: "1.5rem 1.5rem 1.75rem",
            boxShadow:
              "0 12px 48px rgba(62, 40, 16, 0.28), 0 4px 16px rgba(62,40,16,0.1)",
          }}
        >
          {/* ── Header row ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span
                aria-hidden="true"
                style={{ fontSize: "1.1rem", lineHeight: 1 }}
              >
                🌸
              </span>
              <p
                className="font-sans"
                style={{
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--color-text-muted)",
                }}
              >
                Our Anniversary
              </p>
            </div>

            {/* X / minimize button */}
            <motion.button
              onClick={onMinimize}
              aria-label="Minimize countdown"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "var(--color-cream)",
                border: "1.5px solid var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "0.68rem",
                color: "var(--color-secondary)",
                flexShrink: 0,
                transition: "background-color 0.15s",
              }}
            >
              ✕
            </motion.button>
          </div>

          {/* ── Title & names ── */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "1.25rem",
            }}
          >
            <p
              className="font-handwritten"
              style={{
                fontSize: "clamp(1.4rem, 6vw, 1.75rem)",
                color: "var(--color-secondary)",
                lineHeight: 1.15,
                marginBottom: "0.2rem",
              }}
            >
              Happy 1st Anniversary
            </p>
            <p
              className="font-serif"
              style={{
                fontSize: "0.82rem",
                color: "var(--color-text-muted)",
                fontStyle: "italic",
              }}
            >
              Fahri Yuwan &amp; Anggi
            </p>
          </div>

          {/* ── Decorative divider ── */}
          <div
            aria-hidden="true"
            style={{
              height: 1,
              width: "60%",
              margin: "0 auto 1.25rem",
              background:
                "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
            }}
          />

          {/* ── Countdown timer ── */}
          <CountdownTimer />

          {/* ── Date label ── */}
          <p
            className="font-sans"
            style={{
              fontSize: "0.62rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-text-muted)",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            📅 March 20, 2026
          </p>

          {/* ── Minimize hint ── */}
          <p
            className="font-sans"
            style={{
              fontSize: "0.58rem",
              color: "var(--color-text-muted)",
              textAlign: "center",
              marginTop: "0.65rem",
              letterSpacing: "0.04em",
              opacity: 0.75,
            }}
          >
            tap ✕ to minimize
          </p>
        </motion.div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   COUNTDOWN WIDGET — minimized corner pill
   Sits at bottom-left, shows days remaining, click to reopen.
───────────────────────────────────────────────────────────────────────────── */
function CountdownWidget({
  onExpand,
  daysLeft,
}: {
  onExpand: () => void;
  daysLeft: number;
}) {
  return (
    <motion.button
      onClick={onExpand}
      aria-label={`${daysLeft} days to our anniversary — tap to expand`}
      initial={{ scale: 0.6, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.6, opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 320, damping: 24, mass: 0.85 }}
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "fixed",
        bottom: "1.25rem",
        left: "1.25rem",
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        backgroundColor: "var(--color-parchment)",
        border: "1.5px solid var(--color-primary)",
        borderRadius: "1rem",
        padding: "0.6rem 1rem 0.6rem 0.75rem",
        boxShadow: "0 4px 22px rgba(114, 74, 36, 0.24)",
        cursor: "pointer",
        transformOrigin: "bottom left",
      }}
    >
      {/* Icon */}
      <motion.span
        aria-hidden="true"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ fontSize: "1.15rem", lineHeight: 1, flexShrink: 0 }}
      >
        🌸
      </motion.span>

      {/* Text */}
      <div style={{ textAlign: "left" }}>
        <p
          className="font-handwritten"
          style={{
            fontSize: "1rem",
            color: "var(--color-secondary)",
            lineHeight: 1.2,
            fontWeight: 600,
          }}
        >
          {daysLeft} days
        </p>
        <p
          className="font-sans"
          style={{
            fontSize: "0.56rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-text-muted)",
            marginTop: "1px",
          }}
        >
          to anniversary ↑
        </p>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DECORATIVE PETALS
───────────────────────────────────────────────────────────────────────────── */
function Petal({ style, char }: { style: React.CSSProperties; char: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute select-none opacity-30 animate-float"
      style={style}
    >
      {char}
    </span>
  );
}

const PETALS = [
  {
    char: "🌸",
    style: { top: "8%", left: "7%", animationDelay: "0s", fontSize: "1.4rem" },
  },
  {
    char: "✿",
    style: {
      top: "14%",
      right: "9%",
      animationDelay: "0.8s",
      fontSize: "1.1rem",
      color: "#d9c19d",
    },
  },
  {
    char: "🌸",
    style: {
      top: "72%",
      left: "5%",
      animationDelay: "1.4s",
      fontSize: "1rem",
    },
  },
  {
    char: "✿",
    style: {
      top: "80%",
      right: "8%",
      animationDelay: "0.4s",
      fontSize: "1.3rem",
      color: "#c4a97a",
    },
  },
  {
    char: "🌸",
    style: {
      top: "45%",
      left: "3%",
      animationDelay: "2s",
      fontSize: "0.9rem",
    },
  },
  {
    char: "✿",
    style: {
      top: "55%",
      right: "4%",
      animationDelay: "1.1s",
      fontSize: "1rem",
      color: "#d9c19d",
    },
  },
  {
    char: "🌸",
    style: {
      top: "25%",
      left: "15%",
      animationDelay: "0.6s",
      fontSize: "0.8rem",
    },
  },
  {
    char: "✿",
    style: {
      top: "30%",
      right: "14%",
      animationDelay: "1.7s",
      fontSize: "0.85rem",
      color: "#c4a97a",
    },
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   LOADING DOTS
───────────────────────────────────────────────────────────────────────────── */
function LoadingDots() {
  return (
    <span className="flex gap-[3px]" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block rounded-full"
          style={{ width: 5, height: 5, backgroundColor: "var(--color-cream)" }}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PASSWORD GATE PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function PasswordGatePage() {
  const router = useRouter();

  /* ── Password form state ── */
  const [password, setPassword] = useState("");
  const [shaking, setShaking] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  /* ── Countdown popup state ── */
  const [countdownVisible, setCountdownVisible] = useState(false);
  const [countdownMinimized, setCountdownMinimized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  /* Delay the password input so entrance animation finishes first */
  useEffect(() => {
    const t = setTimeout(() => setShowInput(true), 900);
    return () => clearTimeout(t);
  }, []);

  /* Auto-focus input when it appears */
  useEffect(() => {
    if (showInput) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showInput]);

  /* Show countdown popup 1.5 s after the page loads */
  useEffect(() => {
    const t = setTimeout(() => setCountdownVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  /* Days remaining for the minimized widget label */
  const daysLeft = Math.max(
    0,
    Math.floor(
      (new Date("2026-03-20T00:00:00").getTime() - Date.now()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  /* ── Password submit handler ── */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    if (password.toLowerCase().trim() === CORRECT_PASSWORD) {
      setError(false);
      setLoading(true);
      sessionStorage.setItem("anniversary_auth", "true");
      setTimeout(() => router.push("/story"), 700);
    } else {
      setError(true);
      setShaking(true);
      setPassword("");
      setTimeout(() => {
        setShaking(false);
        inputRef.current?.focus();
      }, 600);
    }
  }

  return (
    <main
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-12"
      style={{
        background:
          "linear-gradient(160deg, #fdf8f0 0%, #f5e9d0 50%, #ede0c4 100%)",
      }}
    >
      {/* ── Decorative background petals ── */}
      {PETALS.map((p, i) => (
        <Petal key={i} char={p.char} style={p.style} />
      ))}

      {/* ── Soft radial glow behind the card ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          width: "480px",
          height: "480px",
          background:
            "radial-gradient(circle, rgba(217,193,157,0.35) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ════════════════════════════════════════════════════════════════════
          MAIN PASSWORD CARD
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm"
      >
        <div
          className="card-warm flex flex-col items-center gap-6 px-8 py-10 text-center"
          style={{ borderRadius: "1.5rem" }}
        >
          {/* ── Heart icon ── */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.35,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="animate-soft-pulse"
            aria-hidden="true"
          >
            <span style={{ fontSize: "2.8rem", lineHeight: 1 }}>🤍</span>
          </motion.div>

          {/* ── Headline ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center gap-1"
          >
            <h1
              className="font-handwritten leading-tight"
              style={{
                fontSize: "clamp(1.9rem, 8vw, 2.5rem)",
                color: "var(--color-secondary)",
              }}
            >
              For You,
            </h1>
            <p
              className="font-handwritten"
              style={{
                fontSize: "clamp(1.4rem, 6vw, 1.8rem)",
                color: "var(--color-primary-dark)",
              }}
            >
              My Love 🌸
            </p>
          </motion.div>

          {/* ── Divider ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            style={{
              height: "1px",
              width: "60%",
              background:
                "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
            }}
          />

          {/* ── Subtitle ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.72, duration: 0.6 }}
            className="font-serif text-sm leading-relaxed"
            style={{ color: "var(--color-text-muted)", maxWidth: "240px" }}
          >
            This little world is just for us.
            <br />
            Enter the secret word to continue.
          </motion.p>

          {/* ── Password form ── */}
          <AnimatePresence>
            {showInput && (
              <motion.form
                key="password-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                onSubmit={handleSubmit}
                className="flex w-full flex-col items-center gap-4"
                noValidate
              >
                {/* Shake wrapper */}
                <div
                  className={`w-full ${shaking ? "animate-shake" : ""}`}
                  style={{ position: "relative" }}
                >
                  <input
                    ref={inputRef}
                    id="password"
                    type="password"
                    autoComplete="off"
                    placeholder="our little secret…"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(false);
                    }}
                    disabled={loading}
                    className="input-warm text-center"
                    style={{
                      fontSize: "1rem",
                      letterSpacing: "0.15em",
                      borderColor: error ? "#c0392b" : undefined,
                      boxShadow: error
                        ? "0 0 0 3px rgba(192, 57, 43, 0.18)"
                        : undefined,
                    }}
                    aria-label="Password"
                    aria-describedby={error ? "password-error" : undefined}
                    aria-invalid={error}
                  />
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      id="password-error"
                      key="error-msg"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      role="alert"
                      className="font-serif text-xs italic"
                      style={{ color: "#a0392b" }}
                    >
                      Hmm, that&apos;s not quite right 🌸
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={loading || password.trim().length === 0}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-warm w-full"
                  style={{
                    opacity: password.trim().length === 0 || loading ? 0.6 : 1,
                    transition:
                      "opacity 0.2s, background-color 0.2s, transform 0.15s, box-shadow 0.2s",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoadingDots />
                      Opening…
                    </span>
                  ) : (
                    "Enter ✨"
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Footer hint ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative z-10 mt-8 font-handwritten text-sm"
        style={{ color: "var(--color-text-muted)" }}
        aria-hidden="true"
      >
        — with love, always —
      </motion.p>

      {/* ════════════════════════════════════════════════════════════════════
          COUNTDOWN POPUP — full modal (open state)
          Appears 1.5 s after load. X minimizes it to the widget below.
      ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {countdownVisible && !countdownMinimized && (
          <CountdownModal
            key="countdown-modal-open"
            onMinimize={() => setCountdownMinimized(true)}
          />
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          COUNTDOWN WIDGET — minimized corner pill
          Tap to reopen the full modal.
      ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {countdownVisible && countdownMinimized && (
          <CountdownWidget
            key="countdown-widget"
            onExpand={() => setCountdownMinimized(false)}
            daysLeft={daysLeft}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
