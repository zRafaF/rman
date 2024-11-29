import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";
// import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/rman/",

  plugins: [
    react(),
    svgr(), // Add the SVGR plugin
    // VitePWA({ registerType: "autoUpdate" }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react"],
          "react-dom": ["react-dom"],
        },
      },
    },
  },
});
