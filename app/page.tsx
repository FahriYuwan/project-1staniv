"use client";

/* ─── Password Gate Page ─────────────────────────────────────────────────────
   The very first screen the visitor sees.
   - Correct password "pippipupu" → navigates to /story
   - Wrong password          → subtle shake + error message
   - Uses Framer Motion for entrance animations
────────────────────────────────────────────────────────────────────────────── */

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const CORRECT_PASSWORD = "pippipupu";

/* ── Small decorative floating petal ── */
function Petal({ style, char }: { style: React.CSSProperties; char: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute select-none text-2xl opacity-30 animate-float"
      style={style}
    >
      {char}
    </span>
  );
}

/* ── Decorative petals scattered in background ── */
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
    style: { top: "72%", left: "5%", animationDelay: "1.4s", fontSize: "1rem" },
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
    style: { top: "45%", left: "3%", animationDelay: "2s", fontSize: "0.9rem" },
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

export default function PasswordGatePage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [shaking, setShaking] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  /* Delay showing the input so the entrance animation finishes first */
  useEffect(() => {
    const t = setTimeout(() => setShowInput(true), 900);
    return () => clearTimeout(t);
  }, []);

  /* Auto-focus when input appears */
  useEffect(() => {
    if (showInput) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showInput]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    if (password.toLowerCase().trim() === CORRECT_PASSWORD) {
      /* ── Correct password ── */
      setError(false);
      setLoading(true);
      /* Set the auth flag so the story page knows the gate was passed */
      sessionStorage.setItem("anniversary_auth", "true");
      /* Brief pause to let the loading state render before navigating */
      setTimeout(() => router.push("/story"), 700);
    } else {
      /* ── Wrong password ── */
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
      {/* ── Background decorative petals ── */}
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

      {/* ── Main card ── */}
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
    </main>
  );
}

/* ── Tiny animated loading dots ── */
function LoadingDots() {
  return (
    <span className="flex gap-[3px]" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block rounded-full"
          style={{
            width: 5,
            height: 5,
            backgroundColor: "var(--color-cream)",
          }}
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
