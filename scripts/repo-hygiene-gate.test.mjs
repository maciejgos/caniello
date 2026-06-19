import assert from "node:assert/strict";
import test from "node:test";
import {
  sourceBoundaryViolations,
  trackedArtifactViolations,
} from "./repo-hygiene-gate.mjs";

test("rejects tracked generated and local environment files", () => {
  assert.equal(trackedArtifactViolations("apps/web/.next/build.js").length, 1);
  assert.equal(trackedArtifactViolations("apps/web/.env.local").length, 1);
  assert.deepEqual(trackedArtifactViolations(".env.example"), []);
});

test("rejects privileged provider access from UI", () => {
  const file = "apps/web/features/account/components/Unsafe.tsx";
  assert.equal(
    sourceBoundaryViolations(
      file,
      `import { createClient } from "@supabase/supabase-js";\nconst key = process.env.SUPABASE_SERVICE_ROLE_KEY;`,
    ).length,
    2,
  );
});

test("allows provider access in feature server helpers", () => {
  const file = "apps/web/features/account/server/safe.ts";
  assert.deepEqual(
    sourceBoundaryViolations(
      file,
      `import { createClient } from "@supabase/supabase-js";`,
    ),
    [],
  );
});

test("rejects direct audit writes from UI", () => {
  const file = "apps/web/features/account/components/Unsafe.tsx";
  assert.equal(
    sourceBoundaryViolations(file, `const table = "audit_logs";`).length,
    1,
  );
});

test("rejects cross-feature imports and permits same-feature imports", () => {
  const file = "apps/web/features/account/components/Example.tsx";
  assert.equal(
    sourceBoundaryViolations(
      file,
      `import { x } from "@/features/marketing/lib/example";`,
    ).length,
    1,
  );
  assert.deepEqual(
    sourceBoundaryViolations(
      file,
      `import { x } from "@/features/account/lib/example";`,
    ),
    [],
  );
});
