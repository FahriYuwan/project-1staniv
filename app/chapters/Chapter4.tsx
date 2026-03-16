"use client";

/* ─── Chapter 4: Unexpected Message ──────────────────────────────────────────
   Two years after their first meeting, Anggi replied to Fahri's Instagram
   story with "Suka dengerin slchld juga?" — three words that changed everything.

   UI:
   - Framer Motion entrance animations
   - Mocked Instagram DM conversation inside <PhoneChatFrame />
   - Album cover card with artist name
   - Short narrative caption below
────────────────────────────────────────────────────────────────────────────── */

import { motion } from "framer-motion";
import PhoneChatFrame from "../components/PhoneChatFrame";
import InlineMusicPlayer from "../components/InlineMusicPlayer";
import Image from "next/image";

/* ── Reusable DM bubble ── */
function Bubble({
  text,
  from,
  delay = 0,
  isRead = false,
}: {
  text: string;
  from: "them" | "me";
  delay?: number;
  isRead?: boolean;
}) {
  const isMe = from === "me";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        justifyContent: isMe ? "flex-end" : "flex-start",
        marginBottom: "0.45rem",
        paddingLeft: isMe ? "2.5rem" : "0",
        paddingRight: isMe ? "0" : "2.5rem",
      }}
    >
      <div
        style={{
          backgroundColor: isMe ? "#3797F0" : "#efefef",
          color: isMe ? "#fff" : "#262626",
          borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          padding: "0.5rem 0.85rem",
          fontSize: "0.78rem",
          fontFamily: "'Lato', sans-serif",
          lineHeight: 1.45,
          maxWidth: "80%",
          wordBreak: "break-word",
        }}
      >
        {text}
      </div>
      {isMe && isRead && (
        <span
          aria-hidden="true"
          style={{
            alignSelf: "flex-end",
            fontSize: "0.55rem",
            color: "#3797F0",
            marginLeft: 3,
            marginBottom: 2,
            fontFamily: "sans-serif",
          }}
        >
          ✓✓
        </span>
      )}
    </motion.div>
  );
}

/* ── Timestamp label inside DM thread ── */
function TimeLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        textAlign: "center",
        margin: "0.6rem 0 0.5rem",
        fontSize: "0.6rem",
        color: "#8e8e8e",
        fontFamily: "sans-serif",
      }}
    >
      {label}
    </div>
  );
}

/* ── Seen indicator ── */
function SeenLabel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.4 }}
      style={{
        textAlign: "right",
        fontSize: "0.55rem",
        color: "#8e8e8e",
        fontFamily: "sans-serif",
        paddingRight: "0.25rem",
        marginTop: "-0.25rem",
        marginBottom: "0.4rem",
      }}
    >
      Seen
    </motion.div>
  );
}

export default function Chapter4() {
  return (
    <section className="chapter-section">
      {/* ── Section label ── */}
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
        Chapter 04
      </motion.p>

      {/* ── Chapter title ── */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.55 }}
        className="font-handwritten"
        style={{
          fontSize: "clamp(1.8rem, 7vw, 2.6rem)",
          color: "var(--color-secondary)",
          marginBottom: "0.25rem",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Unexpected Message
      </motion.h2>

      {/* ── Subtitle ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.28, duration: 0.5 }}
        className="font-serif"
        style={{
          fontSize: "0.82rem",
          color: "var(--color-text-muted)",
          fontStyle: "italic",
          marginBottom: "1.75rem",
          textAlign: "center",
        }}
      >
        Two years later…
      </motion.p>

      {/* ── Main content: phone + album cover side by side (or stacked) ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          width: "100%",
          maxWidth: 360,
        }}
      >
        {/* ── Phone frame with mock Instagram DM ── */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.38, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%" }}
        >
          <PhoneChatFrame>
            {/* ── Instagram DM header ── */}
            <div
              style={{
                backgroundColor: "#fff",
                borderBottom: "1px solid #efefef",
                padding: "0.7rem 1rem 0.6rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                position: "sticky",
                top: 0,
                zIndex: 2,
              }}
            >
              {/* Back arrow */}
              <span
                aria-hidden="true"
                style={{
                  fontSize: "1rem",
                  color: "#262626",
                  lineHeight: 1,
                  marginRight: 2,
                }}
              >
                ‹
              </span>

              {/* Avatar */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ fontSize: "1rem", lineHeight: 1 }}
                >
                  🌸
                </span>
              </div>

              {/* Username */}
              <div>
                <p
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#262626",
                    fontFamily: "sans-serif",
                    lineHeight: 1.2,
                  }}
                >
                  anggi
                </p>
                <p
                  style={{
                    fontSize: "0.6rem",
                    color: "#8e8e8e",
                    fontFamily: "sans-serif",
                  }}
                >
                  Active now
                </p>
              </div>

              {/* Icons right side */}
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  gap: "0.85rem",
                  alignItems: "center",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ fontSize: "1rem", color: "#262626" }}
                >
                  📞
                </span>
                <span
                  aria-hidden="true"
                  style={{ fontSize: "1rem", color: "#262626" }}
                >
                  🎥
                </span>
              </div>
            </div>

            {/* ── DM conversation body ── */}
            <div
              style={{
                padding: "0.75rem 0.85rem 1rem",
                backgroundColor: "#fff",
                minHeight: 300,
              }}
            >
              {/* ── Story reply context (Fahri's story) ── */}
              <TimeLabel label="2 years later · Instagram Story" />

              {/* Fahri's story card (what Anggi replied to) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                style={{
                  backgroundColor: "#fafafa",
                  border: "1px solid #efefef",
                  borderRadius: 12,
                  padding: "0.5rem 0.7rem",
                  marginBottom: "0.65rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {/* Small album art placeholder */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 6,
                    background:
                      "linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/images/slchld-cover.jpg"
                    alt="cover"
                    width={18}
                    height={18}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.62rem",
                      color: "#8e8e8e",
                      fontFamily: "sans-serif",
                      lineHeight: 1.3,
                    }}
                  >
                    Fahri's story
                  </p>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      color: "#262626",
                      fontFamily: "sans-serif",
                      fontStyle: "italic",
                    }}
                  >
                    slchld — playing
                  </p>
                </div>
              </motion.div>

              {/* ── THE message that started everything ── */}
              <Bubble
                from="them"
                text="Finally found someone who's listening slchld"
                delay={0.72}
              />

              <TimeLabel label="just now" />

              {/* Fahri's reply */}
              <Bubble
                from="me"
                text="I think we have a good taste in music"
                delay={0.9}
                isRead
              />

              <SeenLabel />

              <Bubble
                from="them"
                text="yash ofc, actually it's rare to find people who know slchld"
                delay={1.1}
              />

              <Bubble from="them" text="aku suka yang huge mood" delay={1.1} />

              <Bubble
                from="me"
                text="yaa, me too, glad to know you hihihi"
                delay={1.28}
                isRead
              />

              <Bubble from="them" text="glad to know you too!" delay={1.45} />
            </div>
          </PhoneChatFrame>
        </motion.div>

        {/* ── Inline music player ──
            📁 Drop the audio file at: public/music/slchld.mp3
               The player renders fine even if the file isn't there yet.      */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.55 }}
          style={{ width: "100%" }}
        >
          <InlineMusicPlayer
            src="/music/slchld.mp3"
            title="slchld"
            artist="the song that brought us together"
            subtitle="reply to Fahri's story — 2 years later"
            coverSrc="/images/slchld-cover.jpg"
          />
        </motion.div>
      </div>

      {/* ── Narrative caption ── */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.55 }}
        className="font-serif"
        style={{
          fontSize: "clamp(0.82rem, 3.5vw, 0.92rem)",
          color: "var(--color-text-secondary)",
          textAlign: "center",
          maxWidth: 310,
          lineHeight: 1.8,
          fontStyle: "italic",
          marginTop: "1.5rem",
        }}
      >
        Three words. That's all it took. After two years of silence, you replied
        to my story — and everything changed.
      </motion.p>
    </section>
  );
}
