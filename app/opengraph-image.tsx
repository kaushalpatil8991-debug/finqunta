import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.shortName} — Tally Partner for Indian SMEs`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default Open Graph image for pages that don't ship their own. Ivory
 * Pearl background with the Finquanta wordmark + tagline + partner chip.
 */
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #FBF7F0 0%, #F6F0E4 60%, #F5E4C7 100%)",
          padding: "64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "#7A4FB0",
              color: "#FBF7F0",
              fontSize: "48px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            F
          </div>
          <div
            style={{
              color: "#2E1B45",
              fontSize: "48px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            {site.shortName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              color: "#2E1B45",
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            Tally Partner for Indian SMEs.
          </div>
          <div
            style={{
              color: "#6E5485",
              fontSize: "30px",
              lineHeight: 1.3,
              maxWidth: "980px",
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#EEE0F5",
              color: "#4A2C6B",
              padding: "10px 20px",
              borderRadius: "999px",
              fontSize: "22px",
              fontWeight: 600,
            }}
          >
            Tally Partner
          </div>
          <div
            style={{
              background: "#F5E4C7",
              color: "#7A5C0F",
              padding: "10px 20px",
              borderRadius: "999px",
              fontSize: "22px",
              fontWeight: 600,
            }}
          >
            Sales · Support · Solutions
          </div>
        </div>
      </div>
    ),
    size
  );
}
