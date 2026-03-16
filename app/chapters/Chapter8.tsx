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
            Anggi yang paling aku sayangi,
          </p>

          {/* ── Body paragraphs ── */}
          <p style={{ marginBottom: "1rem" }}>
            Aku masih ingat dengan jelas hari pertama kita bertemu. Kamu sedang
            cosplay — tampak begitu indah dan percaya diri — dan aku, yang
            biasanya tidak mudah memberanikan diri, entah dapat keberanian dari
            mana untuk meminta foto bersamamu.
          </p>

          <p style={{ marginBottom: "1rem" }}>
            Waktu itu aku pikir itu hanya sebuah pertemuan singkat yang akan
            segera terlupakan. Ternyata aku salah.
          </p>

          <p style={{ marginBottom: "1rem" }}>
            Dua tahun kemudian, kamu membalas story Instagram-ku:{" "}
            <em
              className="font-handwritten"
              style={{
                fontSize: "1.05rem",
                color: "var(--color-secondary)",
                fontStyle: "normal",
              }}
            >
              &ldquo;Suka dengerin slchld juga?&rdquo;
            </em>{" "}
            Tiga kata sederhana yang mengubah segalanya. Dari obrolan soal
            musik, kita mulai berbicara lagi — dan kali ini, kita tidak bisa
            berhenti.
          </p>

          <p style={{ marginBottom: "1rem" }}>
            Braga menjadi tempat kita. Setiap kali melewati jalan itu, aku
            selalu ingin menggenggam tanganmu sedikit lebih erat. Cahaya sore
            di sana, aroma jalanan yang familiar, suara langkah kita berdua —
            semua itu sekarang adalah bagian dari kita.
          </p>

          <p style={{ marginBottom: "1rem" }}>
            First date kita di Kiara Artha Park. Aku begitu nervous waktu itu,
            tapi kamu membuat semuanya terasa ringan dan mudah. Kamu tahu cara
            membuat hatiku tenang hanya dengan ada di sana, di sampingku.
          </p>

          <p style={{ marginBottom: "1rem" }}>
            Setahun bersama kamu adalah hal paling indah yang pernah aku
            rasakan. Setiap bulan membawa kenangan baru — kenangan yang ingin
            aku simpan seumur hidup. Tertawa bareng, dengerin musik bareng,
            jalan-jalan tanpa tujuan yang jelas tapi selalu berasa berarti
            karena kamu ada di sana.
          </p>

          <p style={{ marginBottom: "1rem" }}>
            Kamu adalah seseorang yang aku pilih setiap hari. Dan setiap hari
            aku bersyukur kamu memilihku juga.
          </p>

          <p style={{ marginBottom: "1rem" }}>
            Kamu adalah alasan aku tersenyum di pagi hari. Kamu adalah
            playlist-ku yang tidak pernah membosankan. Kamu adalah rumah yang
            paling nyaman yang pernah aku temukan.
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            Selamat satu tahun, sayangku. Semoga kita punya banyak tahun lagi
            — penuh dengan musik, petualangan, tawa, dan tentunya Pippi, Pupu,
            Miam, dan Piyik yang selalu menemani kita berdua.
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
              Dengan sepenuh hati,
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
