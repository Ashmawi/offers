"use client";

import { useState } from "react";
import Image from "next/image";

interface ImagePopupProps {
  imageUrl: string;
  alt: string;
  thumbnailUrl?: string;
  className?: string;
}

export default function ImagePopup({ imageUrl, alt, thumbnailUrl = imageUrl, className }: ImagePopupProps) {
  const [open, setOpen] = useState(false);

  return (
    <main style={{ padding: 24 }} dir="rtl">
      <div style={{ maxWidth: 320, cursor: "pointer" }} onClick={() => setOpen(true)}>
        <Image
          src={thumbnailUrl}
          alt={alt}
          style={{ borderRadius: 8 }}
          className={className}
          unoptimized
          fill
        />
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          tabIndex={-1}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.75)",
            zIndex: 2000,
            padding: 20,
          }}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "95%", maxHeight: "95%", overflow: "auto" }}>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: 24,
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <Image
              src={imageUrl}
              alt={alt}
              width={1200}
              height={800}
              style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
              className={className}
              unoptimized
            />
          </div>
        </div>
      )}
    </main>
  );
}
