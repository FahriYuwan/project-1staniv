import { ReactNode } from "react";

/* ─── PhoneChatFrame ─────────────────────────────────────────────────────────
   Renders a realistic phone mockup shell.
   Drop any content as `children` — it will appear on the "screen".
   Used in Chapter 4 to display the Instagram DM conversation.
────────────────────────────────────────────────────────────────────────────── */

interface PhoneChatFrameProps {
  children: ReactNode;
  /** Optional extra class names on the wrapper */
  className?: string;
}

export default function PhoneChatFrame({
  children,
  className = "",
}: PhoneChatFrameProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "min(260px, 72vw)",
        margin: "0 auto",
        /* Drop a soft warm shadow so it floats above the page */
        filter: "drop-shadow(0 12px 32px rgba(62,40,16,0.28))",
      }}
    >
      {/* ── Phone outer shell ── */}
      <div
        style={{
          background: "linear-gradient(145deg, #2a2a2a 0%, #111 100%)",
          borderRadius: "2.6rem",
          padding: "10px 8px",
          border: "1px solid #3a3a3a",
        }}
      >
        {/* ── Top bar: speaker + front camera ── */}
        <div
          style={{
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            paddingBottom: 2,
          }}
        >
          {/* Speaker grille */}
          <div
            style={{
              width: 48,
              height: 5,
              borderRadius: 3,
              backgroundColor: "#333",
            }}
          />
          {/* Front camera dot */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#2a2a2a",
              border: "1px solid #444",
            }}
          />
        </div>

        {/* ── Screen area ── */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "2rem",
            overflow: "hidden",
            /* Fixed height so the phone stays a predictable size */
            maxHeight: 420,
            overflowY: "auto",
            /* Hide the scrollbar inside the phone frame */
            scrollbarWidth: "none",
          }}
          /* Hide webkit scrollbar too */
          className="[&::-webkit-scrollbar]:hidden"
        >
          {children}
        </div>

        {/* ── Bottom bar: home indicator ── */}
        <div
          style={{
            height: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 4,
          }}
        >
          <div
            style={{
              width: 56,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#444",
            }}
          />
        </div>
      </div>

      {/* ── Side buttons (purely decorative) ── */}
      {/* Volume up */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: -3,
          top: "28%",
          width: 3,
          height: 22,
          borderRadius: "2px 0 0 2px",
          backgroundColor: "#333",
        }}
      />
      {/* Volume down */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: -3,
          top: "38%",
          width: 3,
          height: 22,
          borderRadius: "2px 0 0 2px",
          backgroundColor: "#333",
        }}
      />
      {/* Power button */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: -3,
          top: "33%",
          width: 3,
          height: 30,
          borderRadius: "0 2px 2px 0",
          backgroundColor: "#333",
        }}
      />
    </div>
  );
}
