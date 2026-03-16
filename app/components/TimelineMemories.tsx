"use client";

/* ─── TimelineMemories ────────────────────────────────────────────────────────
   Renders a vertical alternating timeline — one memory card per month.
   Cards alternate left / right around a central dashed line.
   Each card fades + slides in when it enters the viewport (whileInView).
   Used in Chapter 7: Monthly Memories.
────────────────────────────────────────────────────────────────────────────── */

import Image from "next/image";
import { motion } from "framer-motion";

export interface Memory {
  month: string;   // e.g. "March"
  year: number;    // e.g. 2025
  src: string;     // image path
  alt: string;
  caption?: string;
}

interface TimelineMemoriesProps {
  memories: Memory[];
}

export default function TimelineMemories({ memories }: TimelineMemoriesProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        paddingBottom: "1rem",
      }}
    >
      {/* ── Central vertical line ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 2,
          transform: "translateX(-50%)",
          background:
            "linear-gradient(180deg, transparent 0%, var(--color-primary) 8%, var(--color-primary) 92%, transparent 100%)",
          borderRadius: 1,
        }}
      />

      {memories.map((mem, i) => {
        const isLeft = i % 2 === 0; /* even = card on the left side */

        return (
          <div
            key={`${mem.month}-${mem.year}`}
            style={{
              position: "relative",
              display: "flex",
              justifyContent: isLeft ? "flex-start" : "flex-end",
              paddingBottom: "2rem",
              /* Leave room for the center line on both sides */
              paddingLeft: isLeft ? 0 : "calc(50% + 20px)",
              paddingRight: isLeft ? "calc(50% + 20px)" : 0,
            }}
          >
            {/* ── Dot on the timeline ── */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 16,
                left: "50%",
                transform: "translateX(-50%)",
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "var(--color-secondary)",
                border: "2.5px solid var(--color-parchment)",
                boxShadow: "0 0 0 2px var(--color-primary)",
                zIndex: 2,
              }}
            />

            {/* ── Connector line from dot to card ── */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 21,
                /* stretch from the center dot to the card edge */
                left: isLeft ? "calc(50% + 6px)" : undefined,
                right: isLeft ? undefined : "calc(50% + 6px)",
                width: 14,
                height: 1.5,
                backgroundColor: "var(--color-primary)",
                zIndex: 1,
              }}
            />

            {/* ── Memory card ── */}
            <motion.div
              initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "100%",
                backgroundColor: "var(--color-bg-card)",
                border: "1px solid var(--color-sand)",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 3px 14px rgba(114, 74, 36, 0.1)",
              }}
            >
              {/* Photo */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 3",
                  backgroundColor: "var(--color-parchment)",
                }}
              >
                <Image
                  src={mem.src}
                  alt={mem.alt}
                  fill
                  sizes="(max-width: 480px) 44vw, 180px"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>

              {/* Card footer */}
              <div
                style={{
                  padding: "0.5rem 0.7rem 0.6rem",
                  borderTop: "1px solid var(--color-sand)",
                }}
              >
                {/* Month + year badge */}
                <p
                  className="font-handwritten"
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--color-secondary)",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {mem.month} {mem.year}
                </p>

                {/* Optional caption */}
                {mem.caption && (
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--color-text-muted)",
                      marginTop: "0.2rem",
                      lineHeight: 1.4,
                      fontStyle: "italic",
                    }}
                  >
                    {mem.caption}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        );
      })}

      {/* ── End of timeline marker ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "0.5rem",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            fontSize: "1.4rem",
            lineHeight: 1,
          }}
        >
          🌸
        </span>
      </motion.div>
    </div>
  );
}
