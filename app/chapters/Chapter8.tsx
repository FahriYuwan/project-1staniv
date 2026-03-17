"use client";

/* ─── Chapter 8: Love Letter ──────────────────────────────────────────────────
   A long, heartfelt letter written by Fahri for Anggi.
   Rendered on a <LoveLetterPaper /> background with line-ruled paper styling.
   Scrollable within the chapter viewport on mobile.
────────────────────────────────────────────────────────────────────────────── */

import { motion } from "framer-motion";
import LoveLetterPaper from "../components/LoveLetterPaper";

export default function Chapter8() {
  return (
    <section
      className="chapter-section"
      style={{
        paddingTop: "5rem",
        paddingBottom: "5rem",
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      {/* ── Chapter label ── */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
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
        Chapter 08
      </motion.p>

      {/* ── Title ── */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-handwritten text-center"
        style={{
          fontSize: "clamp(2rem, 9vw, 2.8rem)",
          color: "var(--color-secondary)",
          lineHeight: 1.2,
        }}
      >
        Love Letter
      </motion.h2>

      {/* ── Decorative divider ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        aria-hidden="true"
        style={{
          height: 1,
          width: 60,
          background:
            "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
        }}
      />

      {/* ── Letter paper ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", maxWidth: 420 }}
      >
        <LoveLetterPaper>
          {/* ── Salutation ── */}
          <p
            className="font-handwritten"
            style={{
              fontSize: "clamp(1.1rem, 4.5vw, 1.3rem)",
              color: "var(--color-secondary)",
              marginBottom: "1.25rem",
              fontWeight: 600,
            }}
          >
            Selamat happy anniversary sayangkuu !!,
          </p>

          {/* ── Body paragraphs ── */}
          <p style={{ marginBottom: "1rem" }}>
            Jujur aja gak berasa ternyata kita udah satu tahun jalanin hubungan
            wkwk, suka dan duka udah kita laluin satu tahun ini, semoga
            tahun-tahun berikutnya lebih banyak suka nya dari tahun kemarin,
            aamiin dan kita diberi kesabaran dalam menghadapinya.
          </p>

          <p style={{ marginBottom: "1rem" }}>
            Jujur, aku bingung mau ngomongin apa disini, aku cuma mau bilang
            terima kasih ya sayangku, kamu udah jadi yang selalu di sisi aku
            baik disaat aku lagi suka ataupun duka, kata-kata dari kamu yang
            selalu bikin aku tenang dikala lagi down ngebantu banget rasanya
            buat aku jadi lebih tenang.
          </p>

          <p style={{ marginBottom: "1rem" }}>
            Aku mau kita sama-sama lebih lama lagiii dan semoga buat kedepannya
            kita bisa lebih kenal saling antar keluarga yaaa, hihihi.
          </p>

          {/* ── Sign-off ── */}
          <div style={{ textAlign: "right" }}>
            <p
              className="font-serif"
              style={{
                fontSize: "0.85rem",
                color: "var(--color-text-muted)",
                fontStyle: "italic",
                marginBottom: "0.35rem",
              }}
            >
              Dari akuuu,
            </p>
            <p
              className="font-handwritten"
              style={{
                fontSize: "clamp(1.3rem, 5vw, 1.6rem)",
                color: "var(--color-secondary)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Fahri 🤍
            </p>
          </div>
        </LoveLetterPaper>
      </motion.div>

      {/* ── Closing flourish ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.6 }}
        aria-hidden="true"
        className="font-handwritten"
        style={{
          fontSize: "1rem",
          color: "var(--color-primary-dark)",
          opacity: 0.7,
          letterSpacing: "0.25em",
          textAlign: "center",
        }}
      >
        — 🌸 —
      </motion.p>
    </section>
  );
}
