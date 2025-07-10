// src/theme.ts
const theme = {
  colors: {
    primary: "#6D28D9", // indigo‑600
    secondary: "#EC4899", // pink‑500
    background: "#FFFFFF",
    textDark: "#1F2937", // gray‑800
    textLight: "#6B7280", // gray‑500
    muted: "#E5E7EB", // gray‑200
  },
  spacing: (n: number) => n * 4, // spacing(2) = 8
  radius: {
    sm: 6,
    md: 12,
    full: 999,
  },
  font: {
    h1: { fontSize: 24, fontWeight: "700" },
    h2: { fontSize: 18, fontWeight: "600" },
    body: { fontSize: 14, fontWeight: "400" },
  },
  statusBar:{
    light:{
      style: "light",
      backgroundColor: "#000000", // black
    },
    dark: {
      style: "dark",
      backgroundColor: "#FFFFFF", // white
    },
  }
} as const;

export default theme;
