"use client";

/* ─── Chapter 9: Future Wishes ───────────────────────────────────────────────
   Displays Fahri and Anggi's hopes and dreams for the future as warm
   animated cards. Each card has an icon, a title, and a short description.
   Cards stagger in using Framer Motion whileInView.
────────────────────────────────────────────────────────────────────────────── */

import { motion } from "framer-motion";

interface WishCard {
  icon: string;
  title: string;
  description: string;
}

const WISHES: WishCard[] = [
  {
    icon: "🗺️",
    title: "More Adventures",
    description:
      "New cities, new streets, new sunsets — explored side by side, always.",
  },
  {
    icon: "🎵",
    title: "More Music",
    description:
      "More songs to discover together, more playlists that become ours.",
  },
  {
    icon: "📸",
    title: "More Memories",
    description:
      "More photos, more moments, more stories we'll tell years from now.",
  },
  {
    icon: "🌸",
    title: "More Quiet Days",
    description:
      "Slow mornings, familiar coffee, and the comfort of just being together.",
  },
  {
    icon: "🍜",
    title: "More Good Food",
    description:
      "More restaurants to try, more late-night snacks, more meals that taste better with you.",
  },
  {
    icon: "🤍",
    title: "More of Us",
    description:
      "More laughter, more growth, more choosing each other — every single day.",
  },
];

/* ── Individual wish card ── */
function WishCardItem({ wish, index }: { wish: WishCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        delay: index * 0.09,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, scale: 1.03 }}
      style={{
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-sand)",
        borderRadius: "1.1rem",
        padding: "1.1rem 1rem 1.15rem",
        boxShadow: "0 3px 14px rgba(114, 74, 36, 0.09)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.45rem",
        cursor: "default",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Icon */}
      <span
        aria-hidden="true"
        style={{ fontSize: "1.55rem", lineHeight: 1 }}
      >
        {wish.icon}
      </span>

      {/* Title */}
      <h3
        className="font-handwritten"
        style={{
          fontSize: "clamp(1.05rem, 4.5vw, 1.2rem)",
          color: "var(--color-secondary)",
          lineHeight: 1.2,
          fontWeight: 700,
        }}
      >
        {wish.title}
      </h3>

      {/* Tiny divider */}
      <div
        aria-hidden="true"
        style={{
          height: 1,
          width: "40%",
          background:
            "linear-gradient(90deg, var(--color-primary), transparent)",
          borderRadius: 1,
        }}
      />

      {/* Description */}
      <p
        className="font-serif"
        style={{
          fontSize: "clamp(0.75rem, 3.2vw, 0.82rem)",
          color: "var(--color-text-muted)",
          lineHeight: 1.65,
          fontStyle: "italic",
        }}
      >
        {wish.description}
      </p>
    </motion.div>
  );
}

export default function Chapter9() {
  return (
    <section
      className="chapter-section"
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
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
          marginBottom: "0.5rem",
        }}
      >
        Chapter 09
      </motion.p>

      {/* ── Title ── */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-handwritten"
        style={{
          fontSize: "clamp(2rem, 9vw, 2.8rem)",
          color: "var(--color-secondary)",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: "0.4rem",
        }}
      >
        Future Wishes
      </motion.h2>

      {/* ── Subtitle ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.55 }}
        className="font-serif"
        style={{
          fontSize: "clamp(0.82rem, 3.5vw, 0.92rem)",
          color: "var(--color-text-muted)",
          fontStyle: "italic",
          textAlign: "center",
          maxWidth: 280,
          lineHeight: 1.7,
          marginBottom: "2rem",
        }}
      >
        Everything I hope we get to do,
        <br />
        feel, and become — together.
      </motion.p>

      {/* ── Decorative divider ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        aria-hidden="true"
        style={{
          height: 1,
          width: "min(200px, 55vw)",
          background:
            "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
          marginBottom: "2.25rem",
        }}
      />

      {/* ── Wish cards grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0.85rem",
          width: "100%",
          maxWidth: 380,
        }}
      >
        {WISHES.map((wish, i) => (
          <WishCardItem key={wish.title} wish={wish} index={i} />
        ))}
      </div>

      {/* ── Closing note ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          marginTop: "2.5rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.65rem",
        }}
      >
        {/* Decorative flourish */}
        <p
          aria-hidden="true"
          style={{
            fontSize: "0.85rem",
            color: "var(--color-primary-dark)",
            letterSpacing: "0.3em",
            opacity: 0.7,
          }}
        >
          ✦ ✦ ✦
        </p>

        <p
          className="font-handwritten"
          style={{
            fontSize: "clamp(1.1rem, 5vw, 1.35rem)",
            color: "var(--color-secondary)",
            lineHeight: 1.5,
            maxWidth: 280,
          }}
        >
          The best chapters of our story haven&apos;t been written yet.
        </p>

        <span aria-hidden="true" style={{ fontSize: "1.4rem", lineHeight: 1 }}>
          🌸
        </span>
      </motion.div>
    </section>
  );
}
