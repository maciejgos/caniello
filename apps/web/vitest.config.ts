import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["features/**/*.test.{ts,tsx}", "app/**/*.test.ts", "../../packages/contracts/src/**/*.test.ts"],
    setupFiles: "./features/marketing/test/setup.ts"
  }
});

