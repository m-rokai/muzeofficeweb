"use client";

import { useEffect } from "react";

// global-error replaces the root layout entirely (it renders its own
// <html>/<body>), so it cannot rely on Tailwind/layout CSS — use inline styles.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAFAF7",
          color: "#1A1A1A",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <h1
            style={{ fontSize: "1.75rem", fontWeight: 600, margin: "0 0 0.75rem" }}
          >
            Something went wrong
          </h1>
          <p style={{ color: "#74726D", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
            Sorry — the site hit an unexpected error. Please try again, or reach
            us directly and we&apos;ll help right away.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#1A1A1A",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.7rem 1.4rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "#74726D" }}>
            <a
              href="tel:+17023707515"
              style={{ color: "#8A6000", fontWeight: 600 }}
            >
              (702) 370-7515
            </a>
            {" · "}
            <a
              href="mailto:franchise@muzeoffice.com"
              style={{ color: "#8A6000", fontWeight: 600 }}
            >
              franchise@muzeoffice.com
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
