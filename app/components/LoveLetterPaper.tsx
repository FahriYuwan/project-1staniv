import { ReactNode } from "react";

/* ─── LoveLetterPaper ─────────────────────────────────────────────────────────
   Wraps content in a paper-styled card that mimics aged letter paper.
   Used in Chapter 8 (Love Letter) to display Fahri's letter to Anggi.
   - Warm parchment background with subtle noise/line texture via CSS
   - Playfair Display serif font
   - Soft shadow + slight rotation for a "placed on table" feel
────────────────────────────────────────────────────────────────────────────── */

interface LoveLetterPaperProps {
  children: ReactNode;
}

export default function LoveLetterPaper({ children }: LoveLetterPaperProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 420,
        margin: "0 auto",
      }}
    >
      {/* ── Stacked paper layers behind (depth effect) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#e8d9b8",
          borderRadius: "0.5rem",
          transform: "rotate(1.8deg) translateY(4px)",
          boxShadow: "0 4px 18px rgba(62,40,16,0.12)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#ede0c4",
          borderRadius: "0.5rem",
          transform: "rotate(-1.1deg) translateY(2px)",
          boxShadow: "0 4px 18px rgba(62,40,16,0.1)",
        }}
      />

      {/* ── Main paper sheet ── */}
      <div
        style={{
          position: "relative",
          backgroundColor: "#fdf6e3",
          borderRadius: "0.5rem",
          padding: "2.25rem 1.75rem 2.5rem",
          boxShadow:
            "0 6px 32px rgba(62, 40, 16, 0.18), 0 1px 4px rgba(62,40,16,0.08)",
          /*
           * Subtle horizontal ruled lines via repeating-linear-gradient,
           * mimicking lined letter paper.
           */
          backgroundImage: `
            repeating-linear-gradient(
              transparent,
              transparent 31px,
              rgba(217, 193, 157, 0.45) 31px,
              rgba(217, 193, 157, 0.45) 32px
            )
          `,
          /* Offset lines so the first line sits under the first row of text */
          backgroundPositionY: "56px",
        }}
      >
        {/* ── Red margin line (classic letter paper detail) ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "2.75rem",
            width: 1,
            backgroundColor: "rgba(192, 100, 100, 0.22)",
            borderRadius: 1,
          }}
        />

        {/* ── Top decorative stamp / wax seal area ── */}
        <div
          aria-hidden="true"
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            marginBottom: "1rem",
            lineHeight: 1,
            opacity: 0.75,
          }}
        >
          ✉️
        </div>

        {/* ── Letter content ── */}
        <div
          className="font-serif"
          style={{
            fontSize: "clamp(0.85rem, 3.5vw, 0.95rem)",
            lineHeight: 2,
            color: "var(--color-text-primary)",
            /* Indent lines past the red margin */
            paddingLeft: "0.5rem",
          }}
        >
          {children}
        </div>

        {/* ── Torn bottom edge illusion ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -1,
            left: 0,
            right: 0,
            height: 8,
            background:
              "linear-gradient(90deg, #fdf6e3 0%, #f5e9ce 20%, #fdf6e3 40%, #f0e0be 60%, #fdf6e3 80%, #f5e9ce 100%)",
            borderRadius: "0 0 0.5rem 0.5rem",
          }}
        />
      </div>
    </div>
  );
}
