import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: "https://undefinedrabb.it",
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },

    build: {
      chunkSizeWarningLimit: 1000,
    },

    plugins: [tailwindcss()],
  },
});