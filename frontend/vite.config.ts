import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
    host: "0.0.0.0",
    port: 5173, // or your custom port
  },
  plugins: [react(), tailwindcss()],
});
