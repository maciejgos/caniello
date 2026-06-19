import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    settings: {
      next: {
        rootDir: "apps/web",
      },
      react: {
        version: "19.2",
      },
    },
    rules: {
      "@next/next/no-html-link-for-pages": "warn",
      "@next/next/no-img-element": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([
    "**/.next/**",
    "**/.turbo/**",
    "**/node_modules/**",
    "**/coverage/**",
    "dist/**",
    "playwright-report/**",
    "test-results/**",
    "apps/web/next-env.d.ts",
  ]),
]);
