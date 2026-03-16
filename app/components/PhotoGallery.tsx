import Image from "next/image";
import { motion } from "framer-motion";

/* ─── PhotoGallery ────────────────────────────────────────────────────────────
   Responsive image grid using next/image.
   - Rounded corners + soft warm shadow on every photo
   - Optional caption overlay at the bottom of each tile
   - Lazy-loads all images (loading="lazy")
   - Accepts 2 or 3 column layout
────────────────────────────────────────────────────────────────────────────── */

interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  columns?: 2 | 3;
}

export default function PhotoGallery({
  photos,
  columns = 2,
}: PhotoGalleryProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "0.75rem",
        width: "100%",
        maxWidth: columns === 3 ? 420 : 380,
        margin: "0 auto",
      }}
    >
      {photos.map((photo, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
          whileHover={{ scale: 1.03, zIndex: 1 }}
          style={{
            position: "relative",
            aspectRatio: "1 / 1",
            borderRadius: "0.875rem",
            overflow: "hidden",
            boxShadow:
              "0 4px 16px rgba(114, 74, 36, 0.16), 0 1px 4px rgba(114,74,36,0.08)",
            border: "1.5px solid var(--color-sand)",
            backgroundColor: "var(--color-parchment)",
          }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={
              columns === 3
                ? "(max-width: 600px) 30vw, 130px"
                : "(max-width: 600px) 44vw, 180px"
            }
            style={{ objectFit: "cover" }}
            loading="lazy"
          />

          {/* Caption overlay */}
          {photo.caption && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background:
                  "linear-gradient(to top, rgba(62,40,16,0.72) 0%, transparent 100%)",
                padding: "1.5rem 0.5rem 0.45rem",
              }}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: "0.62rem",
                  color: "#fdf8f0",
                  textAlign: "center",
                  lineHeight: 1.4,
                  fontStyle: "italic",
                }}
              >
                {photo.caption}
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
