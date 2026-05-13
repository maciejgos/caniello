import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { loadEnv } from "vite";
import landingLeadsHandler from "./api/landing-leads";
import validationEventsHandler from "./api/validation-events";

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [react(), localApiRoutes()],
    server: {
      allowedHosts: ["host.docker.internal"]
    },
    test: {
      environment: "jsdom",
      globals: true,
      include: ["src/**/*.test.{ts,tsx}", "api/**/*.test.ts"],
      setupFiles: "./src/test/setup.ts"
    }
  };
});

function localApiRoutes(): Plugin {
  return {
    name: "caniello-local-api-routes",
    configureServer(server) {
      server.middlewares.use("/api/landing-leads", (request, response) => {
        void landingLeadsHandler(request, response).catch(() => {
          if (!response.headersSent) {
            response.statusCode = 500;
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify({ ok: false, message: "Lead capture failed." }));
          }
        });
      });

      server.middlewares.use("/api/validation-events", (request, response) => {
        void validationEventsHandler(request, response).catch(() => {
          if (!response.headersSent) {
            response.statusCode = 500;
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify({ ok: false, message: "Validation event failed." }));
          }
        });
      });
    }
  };
}
