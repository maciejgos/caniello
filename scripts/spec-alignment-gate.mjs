import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

// Configuration: paths to spec files
const SPEC_ROADMAP_PATH = "spec/roadmap.md";
const SPEC_PRODUCT_CONTEXT_PATH = "spec/product-context.md";
const SPEC_TASKS_DIR = "spec/tasks/";

// Forbidden patterns derived from spec
const NOT_NOW_PATTERNS = [
  // From spec/roadmap.md - Not Now section
  { pattern: /marketplace|market place/i, reason: "marketplace mechanics are Not Now" },
  { pattern: /booking.*payment|payment.*booking/i, reason: "full booking and payments are Not Now" },
  { pattern: /payments.*first|payments-first/i, reason: "payments-first monetization flows are Not Now" },
  { pattern: /clinic.*saas|clinic.*pims|clinic.*ehr|pims|ehr/i, reason: "clinic SaaS, PIMS, or EHR integrations are Not Now" },
  { pattern: /clinic.*portal|broad.*clinic|partner.*workflow.*ownership/i, reason: "broad clinic portals or partner workflow ownership are Not Now" },
  { pattern: /ai.*symptom|symptom.*check|ai.*diagnos|diagnos|treatment.*recommend|veterinary.*decision/i, reason: "AI symptom checking, diagnosis, treatment recommendations are Not Now" },
  { pattern: /replaces.*veterinarian|veterinary.*replacement/i, reason: "veterinary replacement claims are Not Now" },
  { pattern: /eu.*pet.*passport.*replac|official.*eu.*passport/i, reason: "EU pet passport replacement claims are Not Now" },
  { pattern: /complex.*partner.*integration|partner.*integration.*complex/i, reason: "complex partner integrations are Not Now" },
  { pattern: /advanced.*multi-role|multi-role.*care.*team|family.*plan|complex.*household/i, reason: "advanced multi-role care teams are Not Now" },
  { pattern: /advanced.*analytics|referral.*mechanics|duplicate.*detection|calendar.*sync|partner.*document.*upload/i, reason: "advanced analytics, referral mechanics, etc. are Not Now" },
  { pattern: /broad.*back-office/i, reason: "broad back-office systems are Not Now" },
];

const NON_GOALS_PATTERNS = [
  // From spec/product-context.md - Explicit Non-Goals
  { pattern: /marketplace/i, reason: "marketplace mechanics are explicit non-goals" },
  { pattern: /full.*booking|booking.*system/i, reason: "full booking systems are explicit non-goals" },
  { pattern: /payments.*monetization|monetization.*payments/i, reason: "payments-first monetization is an explicit non-goal" },
  { pattern: /clinic.*saas|pims|ehr.*integration/i, reason: "clinic SaaS, PIMS, or EHR integrations are explicit non-goals" },
  { pattern: /clinic.*portal|partner.*workflow.*ownership/i, reason: "broad clinic portals are explicit non-goals" },
  { pattern: /ai.*symptom|ai.*diagnos|treatment.*recommendation|veterinary.*decision/i, reason: "AI diagnosis/treatment is an explicit non-goal" },
  { pattern: /replaces.*official.*eu.*pet.*passport|eu.*pet.*passport.*replacement/i, reason: "EU pet passport replacement is an explicit non-goal" },
  { pattern: /advanced.*multi-role|complex.*household.*permission/i, reason: "complex multi-role permissions are explicit non-goals" },
  { pattern: /advanced.*analytics|referral.*mechanic|duplicate.*detection|calendar.*sync/i, reason: "advanced analytics, etc. are explicit non-goals" },
];

// Allowed scope patterns from roadmap - Now section
const NOW_ALLOWED_SCOPE = [
  "pet profile",
  "health records",
  "reminders",
  "document vault",
  "trusted sharing",
  "share link",
  "pdf export",
  "care card",
  "owner account",
  "privacy",
  "consent",
  "localization",
  "language",
  "local development",
  "ci",
  "validation",
  "platform reliability",
  // Common implementation terms
  "pet",
  "pets",
  "owner",
  "household",
  "document",
  "documents",
  "timeline",
  "reminder",
  "vaccination",
  "medication",
  "deworming",
  "visit",
  "allergies",
  "chip",
  "note",
  "notes",
  "sharing",
  "export",
  "share",
];

// Medical/legal boundary patterns
const MEDICAL_BOUNDARY_PATTERNS = [
  { pattern: /ai.*symptom.*check/i, reason: "AI symptom checking violates medical boundary" },
  { pattern: /ai.*diagnos/i, reason: "AI diagnosis violates medical boundary" },
  { pattern: /treatment.*recommendation/i, reason: "treatment recommendations violate medical boundary" },
  { pattern: /veterinary.*decision|veterinary.*advice/i, reason: "veterinary decision/advice violates medical boundary" },
  { pattern: /emergency.*advice/i, reason: "emergency advice violates medical boundary" },
  { pattern: /replaces.*authorized.*veterinarian/i, reason: "replacing authorized veterinarian violates medical boundary" },
  { pattern: /official.*eu.*pet.*passport.*replacement/i, reason: "EU pet passport replacement violates legal boundary" },
];

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function changedFilesFromGit() {
  const files = new Set();
  const base = process.env.SPEC_GATE_BASE;
  const head = process.env.SPEC_GATE_HEAD || "HEAD";

  if (base) {
    try {
      git(["diff", "--name-only", "--diff-filter=ACMRT", `${base}...${head}`])
        .split("\n")
        .filter(Boolean)
        .forEach((file) => files.add(file));
      return files;
    } catch {
      try {
        git(["diff", "--name-only", "--diff-filter=ACMRT", base, head])
          .split("\n")
          .filter(Boolean)
          .forEach((file) => files.add(file));
      } catch {
        git(["diff-tree", "--no-commit-id", "--name-only", "-r", head])
          .split("\n")
          .filter(Boolean)
          .forEach((file) => files.add(file));
      }
      return files;
    }
  }

  // Fallback for local development
  for (const args of [
    ["diff", "--name-only", "--diff-filter=ACMRT", "HEAD"],
    ["diff", "--cached", "--name-only", "--diff-filter=ACMRT"],
    ["ls-files", "--others", "--exclude-standard"],
  ]) {
    try {
      git(args)
        .split("\n")
        .filter(Boolean)
        .forEach((file) => files.add(file));
    } catch {
      // Ignore unavailable local diff sources
    }
  }

  return files;
}

function changedFiles() {
  if (process.env.SPEC_GATE_FILES) {
    return new Set(
      process.env.SPEC_GATE_FILES.split(/[\n,]/)
        .map((file) => file.trim())
        .filter(Boolean),
    );
  }
  return changedFilesFromGit();
}

function readFile(path) {
  if (!existsSync(path)) {
    return "";
  }
  return readFileSync(path, "utf8");
}

function extractSection(content, heading) {
  const match = content.match(
    new RegExp(`^## ${heading}\\s*\\n+([\\s\\S]*?)(?=\\n## |\\s*$)`, "m"),
  );
  return match?.[1]?.trim() ?? "";
}

function extractListItems(content) {
  const items = [];
  const lines = content.split("\n");
  let inList = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
      const item = trimmed.substring(1).trim();
      if (item) {
        items.push(item);
      }
    }
  }
  return items;
}

function loadNotNowList() {
  const content = readFile(SPEC_ROADMAP_PATH);
  const notNowSection = extractSection(content, "Not Now");
  return extractListItems(notNowSection)
    .map((item) => item.replace(/^Do not implement without explicit human approval and a roadmap update:?$/, "").trim())
    .filter(Boolean);
}

function loadNonGoalsList() {
  const content = readFile(SPEC_PRODUCT_CONTEXT_PATH);
  const nonGoalsSection = extractSection(content, "Explicit Non-Goals");
  return extractListItems(nonGoalsSection)
    .map((item) => item.replace(/^Do not build these in the first product phase without explicit human approval and a roadmap update:?$/, "").trim())
    .filter(Boolean);
}

function loadAllowedScope() {
  const content = readFile(SPEC_ROADMAP_PATH);
  const nowSection = extractSection(content, "Now - MVP Foundation");
  const allowedScopeSection = extractSection(nowSection, "Allowed scope");
  return extractListItems(allowedScopeSection).filter(Boolean);
}

function getSourceFiles() {
  const sourceExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".jsx"]);
  const gateScripts = new Set([
    "scripts/spec-alignment-gate.mjs",
    "scripts/pdlc-lifecycle-gate.mjs",
    "scripts/repo-hygiene-gate.mjs",
    "scripts/platform-foundation-gate.mjs",
    "scripts/mailerlite-integration-gate.mjs",
    "scripts/format-check-changed.mjs",
  ]);
  const files = [];
  
  for (const file of changedFiles()) {
    if (sourceExtensions.has(file.slice(file.lastIndexOf("."))) && !gateScripts.has(file)) {
      files.push(file);
    }
  }
  return files;
}

function checkNotNowViolations(files) {
  const violations = [];
  const notNowList = loadNotNowList();
  
  for (const file of files) {
    if (!existsSync(file)) continue;
    
    const content = readFileSync(file, "utf8");
    const fileLower = file.toLowerCase();
    const contentLower = content.toLowerCase();
    
    // Check for Not Now patterns
    for (const { pattern, reason } of NOT_NOW_PATTERNS) {
      if (pattern.test(fileLower) || pattern.test(contentLower)) {
        violations.push(`${file}: ${reason}`);
      }
    }
    
    // Check against Not Now list items
    for (const item of notNowList) {
      const itemLower = item.toLowerCase();
      if (fileLower.includes(itemLower) || contentLower.includes(itemLower)) {
        violations.push(`${file}: implements "${item}" which is marked as Not Now in roadmap`);
      }
    }
  }
  
  return violations;
}

function checkNonGoalsViolations(files) {
  const violations = [];
  const nonGoalsList = loadNonGoalsList();
  
  for (const file of files) {
    if (!existsSync(file)) continue;
    
    const content = readFileSync(file, "utf8");
    const fileLower = file.toLowerCase();
    const contentLower = content.toLowerCase();
    
    // Check for Non-Goals patterns
    for (const { pattern, reason } of NON_GOALS_PATTERNS) {
      if (pattern.test(fileLower) || pattern.test(contentLower)) {
        violations.push(`${file}: ${reason}`);
      }
    }
    
    // Check against Non-Goals list items
    for (const item of nonGoalsList) {
      const itemLower = item.toLowerCase();
      if (fileLower.includes(itemLower) || contentLower.includes(itemLower)) {
        violations.push(`${file}: implements "${item}" which is an explicit non-goal`);
      }
    }
  }
  
  return violations;
}

function checkMedicalBoundaryViolations(files) {
  const violations = [];
  
  for (const file of files) {
    if (!existsSync(file)) continue;
    
    const content = readFileSync(file, "utf8");
    const contentLower = content.toLowerCase();
    
    for (const { pattern, reason } of MEDICAL_BOUNDARY_PATTERNS) {
      if (pattern.test(contentLower)) {
        violations.push(`${file}: ${reason}`);
      }
    }
  }
  
  return violations;
}

function checkSpecArtifactChanges() {
  const violations = [];
  const specArtifacts = [
    "spec/roadmap.md",
    "spec/product-context.md",
  ];
  
  for (const file of changedFiles()) {
    if (specArtifacts.includes(file)) {
      violations.push(`${file}: spec artifact changed - verify roadmap governance and human approval`);
    }
  }
  
  return violations;
}

// Main execution
const violations = [];

// Get all changed files
const allChangedFiles = [...changedFiles()];
const sourceFiles = getSourceFiles();

// Check spec artifact changes
violations.push(...checkSpecArtifactChanges());

// Only check source files for alignment
if (sourceFiles.length > 0) {
  violations.push(...checkNotNowViolations(sourceFiles));
  violations.push(...checkNonGoalsViolations(sourceFiles));
  violations.push(...checkMedicalBoundaryViolations(sourceFiles));
}

if (violations.length > 0) {
  console.error("Spec alignment gate failed:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  console.error("\nTo fix: Review spec/roadmap.md and spec/product-context.md for scope constraints.");
  console.error("If this change is intentional, update the roadmap or add explicit approval.");
  process.exit(1);
}

if (allChangedFiles.length === 0) {
  console.log("Spec alignment gate passed: no changed files.");
} else {
  console.log(`Spec alignment gate passed: checked ${sourceFiles.length} source file(s) against spec constraints.`);
}
