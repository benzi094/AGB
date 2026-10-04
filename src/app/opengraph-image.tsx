import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "African Global Business (AGB) – BTP et services en Guinée";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(path.join(process.cwd(), "public", "logo_agb_trim.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderBottom: "24px solid #dc0111",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={720} height={300} alt="African Global Business" style={{ objectFit: "contain" }} />
        <div style={{ marginTop: 40, fontSize: 38, color: "#0f172a", letterSpacing: 2 }}>
          BTP · Infrastructures · Logistique · Import-Export
        </div>
        <div style={{ marginTop: 12, fontSize: 30, color: "#475569" }}>Conakry, Guinée</div>
      </div>
    ),
    size,
  );
}
