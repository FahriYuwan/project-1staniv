"use client";

/* ─── Chapter 3: Short Conversation ─────────────────────────────────────────
   Story: After exchanging Instagrams, Fahri and Anggi chatted briefly
   on DMs — then the conversation quietly faded away.
   UI: Minimal layout — one photo, a short introspective text block.
────────────────────────────────────────────────────────────────────────────── */

import Image from "next/image";
import { motion } from "framer-motion";

export default function Chapter3() {
  return (
    <section className="chapter-section" style={{ gap: "2rem" }}>
      {/* ── Chapter label ── */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-sans"
        style={{
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "var(--color-text-muted)",
        }}
      >
        Chapter 03
      </motion.p>

      {/* ── Title ── */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-handwritten text-center"
        style={{
          fontSize: "clamp(2rem, 9vw, 2.8rem)",
          color: "var(--color-secondary)",
          lineHeight: 1.15,
        }}
      >
        Short Conversation
      </motion.h2>

      {/* ── Thin divider ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        style={{
          height: 1,
          width: "48px",
          backgroundColor: "var(--color-primary)",
          borderRadius: 1,
        }}
      />

      {/* ── Photo ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.65, ease: "easeOut" }}
        style={{
          position: "relative",
          width: "min(260px, 72vw)",
          aspectRatio: "3 / 4",
          borderRadius: "1.25rem",
          overflow: "hidden",
          boxShadow:
            "0 6px 28px rgba(114, 74, 36, 0.18), 0 1px 4px rgba(114,74,36,0.1)",
          border: "1.5px solid var(--color-sand)",
          backgroundColor: "var(--color-parchment)",
        }}
      >
        <Image
          src="/images/short-conversation.jpg"
          alt="A quiet moment between Fahri and Anggi"
          fill
          sizes="(max-width: 600px) 72vw, 260px"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />

        {/* Soft vignette */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(62,40,16,0.14) 100%)",
            pointerEvents: "none",
          }}
        />
      </motion.div>

      {/* ── Story text block ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        style={{
          maxWidth: 300,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.9rem",
        }}
      >
        {/* Quote mark */}
        <span
          aria-hidden="true"
          className="font-handwritten"
          style={{
            fontSize: "3rem",
            lineHeight: 0.6,
            color: "var(--color-primary)",
            opacity: 0.7,
            display: "block",
          }}
        >
          "
        </span>

        <p
          className="font-serif"
          style={{
            fontSize: "clamp(0.9rem, 3.8vw, 1.05rem)",
            color: "var(--color-text-primary)",
            lineHeight: 1.85,
            fontStyle: "italic",
          }}
        >
          We talked for a little while — about small things, simple things.
          <br />
          Then, like a message left on read,
          <br />
          the conversation slowly faded.
        </p>

        {/* Closing quote mark */}
        <span
          aria-hidden="true"
          className="font-handwritten"
          style={{
            fontSize: "3rem",
            lineHeight: 0.6,
            color: "var(--color-primary)",
            opacity: 0.7,
            display: "block",
          }}
        >
          "
        </span>

        {/* Soft footnote */}
        <p
          className="font-sans"
          style={{
            fontSize: "0.7rem",
            color: "var(--color-text-muted)",
            letterSpacing: "0.06em",
            marginTop: "0.25rem",
          }}
        >
          or so we thought…
        </p>
      </motion.div>

      {/* ── Floating ellipsis dots ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
        aria-hidden="true"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            style={{
              display: "block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "var(--color-primary-dark)",
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
