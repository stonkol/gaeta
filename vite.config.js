import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // optional: change dev server port
    },
    build: {
        outDir: "dist", // optional: output folder for build
    },
});
