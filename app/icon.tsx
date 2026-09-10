import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Generated favicon — Ivory Pearl "F" mark. Next.js picks this up
 * automatically when named `app/icon.tsx`.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#7A4FB0",
          color: "#FBF7F0",
          fontSize: 22,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        F
      </div>
    ),
    size
  );
}
