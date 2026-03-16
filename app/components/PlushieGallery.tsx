import Image from "next/image";
import { motion } from "framer-motion";

/* ─── PlushieGallery ──────────────────────────────────────────────────────────
   Displays the four plushie family members (Pippi, Pupu, Miam, Piyik) each
   inside a decorative warm frame with their name underneath.
   Used in Chapter 10.
────────────────────────────────────────────────────────────────────────────── */

interface Plushie {
  name: string;
  src: string;
  emoji?: string;
}

interface PlushieGalleryProps {
  plushies: Plushie[];
}

export default function PlushieGallery({ plushies }: PlushieGalleryProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1.1rem",
        width: "100%",
        maxWidth: 340,
        margin: "0 auto",
      }}
    >
      {plushies.map((plushie, i) => (
        <motion.div
          key={plushie.name}
          initial={{ opacity: 0, y: 18, scale: 0.93 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            delay: i * 0.1,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ y: -4, scale: 1.03 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}
        >
          {/* ── Decorative frame ── */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1",
              /* Outer frame ring */
              padding: 5,
              background:
                "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary-dark) 50%, var(--color-primary-light) 100%)",
              borderRadius: "1.1rem",
              boxShadow:
                "0 4px 20px rgba(114, 74, 36, 0.2), inset 0 0 0 1px rgba(255,255,255,0.4)",
            }}
          >
            {/* Inner cream mat */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                backgroundColor: "var(--color-cream)",
                borderRadius: "0.75rem",
                overflow: "hidden",
                border: "1.5px solid rgba(217,193,157,0.6)",
              }}
            >
              <Image
                src={plushie.src}
                alt={`${plushie.name} the plushie`}
                fill
                sizes="(max-width: 600px) 40vw, 160px"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />

              {/* Subtle vignette overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at center, transparent 55%, rgba(62,40,16,0.12) 100%)",
                  borderRadius: "0.75rem",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* ── Corner decorations ── */}
            {["top-left", "top-right", "bottom-left", "bottom-right"].map(
              (corner) => {
                const isTop = corner.startsWith("top");
                const isLeft = corner.endsWith("left");
                return (
                  <span
                    key={corner}
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: isTop ? 1 : "auto",
                      bottom: isTop ? "auto" : 1,
                      left: isLeft ? 1 : "auto",
                      right: isLeft ? "auto" : 1,
                      fontSize: "0.55rem",
                      lineHeight: 1,
                      color: "var(--color-secondary-dark)",
                      opacity: 0.7,
                    }}
                  >
                    ✿
                  </span>
                );
              }
            )}
          </div>

          {/* ── Name tag ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            {plushie.emoji && (
              <span
                aria-hidden="true"
                style={{ fontSize: "0.9rem", lineHeight: 1 }}
              >
                {plushie.emoji}
              </span>
            )}
            <p
              className="font-handwritten"
              style={{
                fontSize: "clamp(1rem, 4.5vw, 1.2rem)",
                color: "var(--color-secondary)",
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: "0.02em",
              }}
            >
              {plushie.name}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
