import { ImageResponse } from "next/og";

export const alt = "DAGYM — Community Operation Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #081223 0%, #142340 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 56, border: "4px solid white", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6, padding: 8 }}>
            <div style={{ height: 6, background: "white" }} />
            <div style={{ height: 6, width: "70%", background: "#a8683a" }} />
            <div style={{ height: 6, background: "white" }} />
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 8 }}>DAGYM</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#d49a6e" }}>COMMUNITY OPERATION COMPANY</div>
          <div style={{ fontSize: 76, fontWeight: 700, marginTop: 20, lineHeight: 1.05 }}>Operation + Technology,</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>as one.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(255,255,255,0.6)" }}>
          <div>Apartment Community · Sports Facility · HILINK Platform</div>
          <div style={{ color: "#7fa2ff" }}>● HILINK</div>
        </div>
      </div>
    ),
    size,
  );
}
