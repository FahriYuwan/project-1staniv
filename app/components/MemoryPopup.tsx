"use client";

/* ─── MemoryPopup ─────────────────────────────────────────────────────────────
   A modal popup used in Chapter 2 (and wherever a memory needs to be revealed).
   - Spring-based scale + fade entrance animation
   - Blurred backdrop that closes on click
   - Accessible: focus trap hint, aria attributes, ESC key closes
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
  /* Close on ESC key */
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  /* Prevent body scroll while open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
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
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              zIndex: 60,
            }}
          />

          {/* ── Popup card ── */}
          <motion.div
            key="memory-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="memory-popup-title"
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 12 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 28,
              mass: 0.9,
            }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 70,
              width: "calc(100% - 2.5rem)",
              maxWidth: 360,
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-sand)",
              borderRadius: "1.5rem",
              padding: "2rem 1.75rem 1.75rem",
              boxShadow:
                "0 12px 48px rgba(62, 40, 16, 0.22), 0 2px 8px rgba(62,40,16,0.08)",
            }}
          >
            {/* ── Close button ── */}
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
                fontSize: "0.75rem",
                color: "var(--color-secondary)",
                transition: "background-color 0.15s",
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
                fontSize: "0.65rem",
                color: "var(--color-text-muted)",
                textAlign: "center",
                marginTop: "1.4rem",
                letterSpacing: "0.05em",
              }}
            >
              tap outside or press ESC to close
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
