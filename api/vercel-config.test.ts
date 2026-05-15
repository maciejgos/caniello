import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type VercelRewrite = {
  source: string;
  destination: string;
};

type VercelConfig = {
  rewrites?: VercelRewrite[];
};

const config = JSON.parse(readFileSync(resolve(process.cwd(), "vercel.json"), "utf8")) as VercelConfig;

describe("Vercel SPA rewrite config", () => {
  it("excludes API routes from the SPA fallback", () => {
    expect(config.rewrites).toEqual([
      {
        source: "/:path((?!api/).*)",
        destination: "/"
      }
    ]);
  });
});
