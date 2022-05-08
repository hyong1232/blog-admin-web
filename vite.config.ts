import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/admin": {
        target: "http://192.168.1.10:8086",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/admin/, '/admin')
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({ resolvers: ElementPlusResolver() }),
  ],
});
