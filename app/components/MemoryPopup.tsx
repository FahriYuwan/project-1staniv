"use client";

/* ─── MemoryPopup ─────────────────────────────────────────────────────────────
   A modal popup used in Chapter 2 (and wherever a memory needs to be revealed).

   Centering strategy:
   - A static (non-animated) wrapper div uses flexbox to perfectly center the
     modal both horizontally and vertically in the viewport.
   - The inner motion.div handles ONLY the scale/y/opacity entrance animation.
   - This avoids the conflict where Framer Motion's JS-driven transform
     overrides the CSS `transform: translate(-50%, -50%)` approach.

   Features:
   - Spring-based scale + fade entrance animation
   - Blurred backdrop (click to close)
   - ESC key closes the popup
   - Body scroll locked while open
   - Fully accessible: role="dialog", aria-modal, aria-labelledby
────────────────────────────────────────────────────────────────────────────── */

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MemoryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function MemoryPopup({
  isOpen,
  onClose,
  title,
  children,
}: MemoryPopupProps) {
  /* ── Close on ESC key ── */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  /* ── Lock body scroll while open ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ════════════════════════════════════════════════════════════════
              BACKDROP — blurred, full-screen, click to close
          ════════════════════════════════════════════════════════════════ */}
          <motion.div
            key="memory-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(62, 40, 16, 0.52)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 60,
            }}
          />

          {/* ════════════════════════════════════════════════════════════════
              CENTERING WRAPPER
              Static div — no Framer Motion — provides flexbox centering.
              The motion.div inside handles ONLY the entrance animation
              (scale + y + opacity). This prevents the centering transform
              from being overridden by Framer Motion's JS transform system.
          ════════════════════════════════════════════════════════════════ */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              /* Horizontal padding so the modal never touches screen edges */
              padding: "0 1.25rem",
              /* Let backdrop (z-60) receive pointer events for click-to-close;
                 pointer events are restored on the animated card below */
              pointerEvents: "none",
            }}
          >
            {/* ══════════════════════════════════════════════════════════════
                ANIMATED MODAL CARD
                Only scale / y / opacity transitions live here — no position
                or translate transforms that would fight flexbox centering.
            ══════════════════════════════════════════════════════════════ */}
            <motion.div
              key="memory-popup"
              role="dialog"
              aria-modal="true"
              aria-labelledby="memory-popup-title"
              initial={{ opacity: 0, scale: 0.86, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 28,
                mass: 0.9,
              }}
              style={{
                /* Restore pointer events so clicks inside don't close */
                pointerEvents: "auto",
                /* Full width up to max — centering handled by wrapper */
                width: "100%",
                maxWidth: 360,
                backgroundColor: "var(--color-bg-card)",
                border: "1px solid var(--color-sand)",
                borderRadius: "1.5rem",
                padding: "2rem 1.75rem 1.75rem",
                boxShadow:
                  "0 12px 48px rgba(62, 40, 16, 0.22), 0 2px 8px rgba(62,40,16,0.08)",
                /* Prevent the card itself from scrolling the page behind */
                position: "relative",
              }}
            >
              {/* ── Close (✕) button ── */}
              <button
                onClick={onClose}
                aria-label="Close memory"
                style={{
                  position: "absolute",
                  top: "0.9rem",
                  right: "0.9rem",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-parchment)",
                  border: "1.5px solid var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "0.72rem",
                  color: "var(--color-secondary)",
                  transition: "background-color 0.15s",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>

              {/* ── Decorative top petal ── */}
              <div
                aria-hidden="true"
                style={{
                  textAlign: "center",
                  fontSize: "1.4rem",
                  marginBottom: "0.5rem",
                  lineHeight: 1,
                }}
              >
                🌸
              </div>

              {/* ── Title ── */}
              <h3
                id="memory-popup-title"
                className="font-handwritten"
                style={{
                  fontSize: "clamp(1.4rem, 6vw, 1.75rem)",
                  color: "var(--color-secondary)",
                  marginBottom: "0.6rem",
                  /* Leave space for the close button */
                  paddingRight: "1.5rem",
                  lineHeight: 1.25,
                }}
              >
                {title}
              </h3>

              {/* ── Decorative divider ── */}
              <div
                aria-hidden="true"
                style={{
                  height: 1,
                  width: "65%",
                  background:
                    "linear-gradient(90deg, var(--color-primary), transparent)",
                  marginBottom: "1.1rem",
                }}
              />

              {/* ── Content ── */}
              <div
                className="font-serif"
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.8,
                }}
              >
                {children}
              </div>

              {/* ── Close hint ── */}
              <p
                className="font-sans"
                style={{
                  fontSize: "0.62rem",
                  color: "var(--color-text-muted)",
                  textAlign: "center",
                  marginTop: "1.4rem",
                  letterSpacing: "0.05em",
                }}
              >
                tap outside or press ESC to close
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
