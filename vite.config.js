import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [AntDesignVueResolver()],
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    VitePWA({
      manifest: {
        name: "iptv",
        short_name: "iptv",
        description:
          "Application to subscribe to global network TV channels at any time",
        theme_color: "#ffffff",
        icons: [
          {
            src: "./icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: "/vite-iptv-app/",
  build: {
    manifest: true,
    rollupOptions: {
      // 覆盖默认的 .html 入口
      input: "index.html",
    },
  },
});
