import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: 'https://undefinedrabb.it',
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), react()],
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
});