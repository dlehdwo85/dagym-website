import { ImageResponse } from "next/og";

export const alt = "DAGYM — Community & Sports Facility Operation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 한글 폰트를 번들하지 않기 위해 영문으로만 구성합니다.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f6f5f2",
          color: "#1a1c1e",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: 4 }}>DAGYM</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>Apartment Community &amp;</div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>Sports Facility Operation</div>
          <div style={{ fontSize: 28, marginTop: 28, color: "#464b52" }}>On-site operation with HILINK access · booking · membership system</div>
        </div>
        <div style={{ height: 8, width: 160, background: "#1f3a5c" }} />
      </div>
    ),
    size,
  );
}
