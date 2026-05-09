# Build the First Caniello Landing Page

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows `spec/plans/PLANS.md`. Keep this file self-contained so a fresh Codex agent or a human novice can implement the landing page without reading prior chat.

## Purpose / Big Picture

After this plan is implemented, Caniello will have its first reproducible web landing page. A visitor will be able to open the page, immediately understand that Caniello helps pet owners organize health records, reminders, documents, and shareable care information, and take one clear action to signal interest. A developer will be able to run the page locally through Docker and verify that the React and TailwindCSS implementation builds successfully.

The page exists to support the current validation goal in `README.md`: test whether pet owners understand and trust Caniello enough to join a waitlist or otherwise signal demand before a broader product is built. This plan deliberately avoids authenticated product functionality, medical claims, AI diagnosis, marketplace promises, clinic software, booking, payments, and any claim that Caniello replaces an official EU pet passport.

## Progress

- [x] (2026-05-09T12:34:19Z) Read repository guidance, `spec/plans/PLANS.md`, and accepted requirement `spec/requirements/first-landing-page.md`.
- [x] (2026-05-09T12:34:19Z) Created this Draft ExecPlan for human review.
- [ ] Human approves or revises the plan scope, implementation sequence, validation approach, and open assumptions.
- [ ] Create or switch to an implementation branch before editing source files.
- [ ] Scaffold the minimal React, TypeScript, Vite, and TailwindCSS frontend under `src/`.
- [ ] Add Docker and npm workflows that can run, build, lint, and test the landing page reproducibly.
- [ ] Implement the landing page UI and waitlist-interest behavior.
- [ ] Validate with automated checks, Docker execution, and browser review.
- [ ] Record validation evidence under `spec/validation/` using the validation-review workflow after implementation.

## Surprises & Discoveries

- Observation: The accepted requirement still contains the sentence "Until a human explicitly approves this requirement..." in its constraints even though its status is now `Accepted`.
  Evidence: `spec/requirements/first-landing-page.md` shows `Status` as `Accepted` and retains that constraint line. Treat the status as the governing approval signal, and avoid changing the requirement during this implementation unless the human asks for cleanup.

## Decision Log

- Decision: Use a minimal Vite React TypeScript application rather than a framework with routing, server rendering, or backend conventions.
  Rationale: The requirement is a first landing page. Vite gives a small, fast frontend baseline for React and TailwindCSS without introducing product-app architecture before validation requires it.
  Date/Author: 2026-05-09 / Codex

- Decision: Use a non-persistent email interest form for the first implementation unless the human supplies a storage destination before coding begins.
  Rationale: The requirement asks for a clear validation signal but leaves storage open. A non-persistent form can show an observable thank-you state and support later analytics or backend integration without collecting personal data prematurely.
  Date/Author: 2026-05-09 / Codex

- Decision: Build the first page in English only unless the human approves bilingual content before implementation.
  Rationale: The requirement leaves language unresolved. English matches the repository README and reduces content scope for the first validation slice. Polish or bilingual copy can be added as a later feature or design refinement.
  Date/Author: 2026-05-09 / Codex

- Decision: Include local UI tests and build checks, but defer analytics and persistent waitlist storage.
  Rationale: Analytics and storage have privacy and vendor choices that are not yet approved. The first implementation should prove the landing-page experience and Docker workflow while keeping data handling conservative.
  Date/Author: 2026-05-09 / Codex

## Outcomes & Retrospective

No implementation outcome has been recorded yet. When the work is complete, summarize the files changed, what a visitor can do, the validation commands and browser checks that passed, any skipped checks, and the remaining gaps such as real analytics, persistent waitlist storage, deployment target, or localized content.

## Context and Orientation

This repository is Caniello, a pet health and care organization utility. Its purpose is to help pet owners keep a trusted, shareable record of a pet's health, reminders, documents, and care information in one place. The repository is currently in a validation stage, and `README.md` identifies "landing page and waitlist" plus landing page conversion above 8% from relevant traffic as early validation signals.

The accepted source requirement is `spec/requirements/first-landing-page.md`. It says the first page must communicate the Caniello promise, help dog and cat owners understand who the product is for, capture a clear validation signal, use Docker, React, and TailwindCSS, and avoid overbuilding. It also says the page must not imply that Caniello replaces an official EU pet passport, provides AI diagnosis, or offers clinic/marketplace functionality.

The repository currently has no committed package manager setup. `src/` contains only guidance placeholders, and `tests/` is reserved for future executable tests. There is no nested `AGENTS.md` under `spec/`, so the root `AGENTS.md` applies to this plan. Before implementation, create or switch to a feature branch unless the human explicitly says to stay on the current branch.

Definitions used in this plan:

Vite is the development and build tool that serves the React app locally and creates production static files in a `dist/` directory.

React is the frontend library used to build the landing page as reusable UI components.

TypeScript is JavaScript with static types; use it so component props and test code are clearer.

TailwindCSS is the utility-class styling framework used to style the page from class names in React components.

Docker is the container runtime used to make local development reproducible. A `Dockerfile` describes the Node environment, and `docker-compose.yml` gives simple commands for running the app.

A waitlist-interest form is a page form that asks for an email address and then shows a thank-you state. In this first plan, it does not send data to a server unless the human approves a storage target before implementation.

## Plan of Work

Begin by checking the working tree with `git status --short`. If not already on a task branch, create one named `codex/first-landing-page` with `git checkout -b codex/first-landing-page`. Preserve any user edits and do not revert unrelated changes.

Create a minimal frontend toolchain at the repository root. Add `package.json`, `package-lock.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `postcss.config.js`, `tailwind.config.ts`, `.gitignore`, `.dockerignore`, `Dockerfile`, and `docker-compose.yml`. Keep all setup reproducible from committed files. Use npm as the package manager because no other package manager is committed. Use scripts named `dev`, `build`, `preview`, `lint`, and `test`.

Use `src/` for the React application. Replace the current placeholder `src/README.md` only if necessary; otherwise leave it in place and add source files beside it. Create `src/main.tsx`, `src/App.tsx`, `src/index.css`, and component files under `src/components/` if the page becomes clearer with small components. Keep component names focused, for example `LandingPage`, `WaitlistForm`, and `FeatureList`.

Use TailwindCSS for styling. The page should feel warm, trustworthy, and practical rather than like a generic software template. The first viewport must show the Caniello name, a plain-language value proposition, and the primary waitlist action. Subsequent content should briefly explain the main use cases from the README: reminders, health records and important notes, documents, and shareable care information. Include concise scope-safe copy such as "Caniello helps you organize care information; official pet passports remain documents issued by authorized veterinarians." Do not include claims about diagnosis, treatment recommendations, clinic integrations, or marketplace booking.

Implement the waitlist-interest form as client-side behavior. It should accept a syntactically valid email address, prevent empty or invalid submission, and show a clear thank-you state after submission. Since no storage target is approved, do not send the email to a backend or third-party service. Keep the entered email in component state only. Make the form accessible with a visible label or equivalent accessible name, helpful validation text, and keyboard-submittable behavior.

Add automated tests only after the toolchain exists. Use Vitest and React Testing Library if dependencies are added during implementation. Cover at least these behaviors: the Caniello value proposition is rendered, the waitlist form rejects an invalid email, and a valid submission shows a thank-you state. If adding Vitest is too much for the first pass because dependency installation is blocked, record that as a discovery and rely on build plus manual browser checks, but keep the test scripts ready for future CI.

Update documentation after implementation. In `README.md`, add exact commands for installing dependencies, running locally, running through Docker, building, testing, and linting. Update `AGENTS.md` only if the repository gains durable tooling instructions that future agents must follow. Keep changes narrow and avoid turning the repository into a broad application scaffold.

After implementation validation, use the validation-review workflow to create a validation artifact under `spec/validation/` that maps evidence back to `spec/requirements/first-landing-page.md`. Do not mark validation accepted or release readiness complete without explicit human approval.

## Concrete Steps

From the repository root `/Users/macg/Code/caniello`, inspect the state:

    git status --short

Create a feature branch unless the human has explicitly requested otherwise:

    git checkout -b codex/first-landing-page

Install or generate the minimal frontend dependency set. The exact command may be either a manual `package.json` followed by `npm install`, or a Vite scaffold command followed by pruning generated files. The resulting committed files must be minimal and reproducible. Prefer this dependency shape:

    npm install react react-dom
    npm install -D @vitejs/plugin-react vite typescript tailwindcss postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom eslint

If the TailwindCSS version used by npm requires a separate Vite plugin or different initialization command, follow the package's installed documentation and record the discovery in this plan. Do not leave untracked generated clutter or unused demo files.

Initialize TailwindCSS configuration if the package supports the command:

    npx tailwindcss init -p

If that command is unavailable in the installed TailwindCSS version, create `tailwind.config.ts` and `postcss.config.js` manually with content scanning for `index.html` and `src/**/*.{ts,tsx}`.

Create or update these source files:

    index.html
    src/main.tsx
    src/App.tsx
    src/index.css
    src/components/WaitlistForm.tsx
    src/components/FeatureList.tsx

Create or update these tooling files:

    package.json
    package-lock.json
    vite.config.ts
    tsconfig.json
    tsconfig.node.json
    tailwind.config.ts
    postcss.config.js
    Dockerfile
    docker-compose.yml
    .dockerignore
    .gitignore

Add tests under `tests/` or beside source files. Prefer `src/App.test.tsx` for a small app-level test because the repository has no test convention yet and the test is tightly coupled to the component behavior.

Run local validation:

    npm run build
    npm run test
    npm run lint

Expected successful output should include a Vite production build completing and Vitest reporting the landing page tests as passed. If the first implementation does not include linting because ESLint setup would be disproportionate, adjust `package.json` to avoid a fake lint script and record the tradeoff in this plan and the final implementation summary.

Run Docker validation:

    docker compose build
    docker compose up

The development server should listen on an exposed local port, preferably `http://localhost:5173`. In a separate terminal, or after starting the server as a background process, open the page in a browser and verify the first viewport, the responsive layout, and the waitlist form behavior. Stop the container afterward with:

    docker compose down

If `docker compose up` is interactive, it is acceptable during implementation to run:

    docker compose up --build

and stop it with Control-C after browser validation.

## Validation and Acceptance

The implementation is acceptable when a human or fresh agent can run the page from committed files and observe the required behavior.

Run `npm run build` from `/Users/macg/Code/caniello` and expect the command to finish successfully with a production build in `dist/`. This proves the React and TailwindCSS app compiles.

Run `npm run test` and expect tests to pass for rendering the core Caniello promise, invalid waitlist email handling, and valid waitlist thank-you behavior. This proves the most important visible behavior is protected by executable tests.

Run the Docker workflow from `/Users/macg/Code/caniello` with `docker compose build` and `docker compose up`. Open `http://localhost:5173` and expect to see Caniello in the first viewport, a plain-language value proposition about pet health and care organization, and a primary waitlist action. Submit an invalid email and expect inline validation. Submit a valid email and expect a thank-you state. Resize or inspect the page at mobile and desktop widths and expect the primary message and action to remain readable and usable.

Check the copy manually against the accepted requirement. The page must not say or imply that Caniello provides AI symptom checking, medical diagnosis, treatment advice, clinic PIMS/EHR software, booking and payments, full marketplace mechanics, or official EU pet passport replacement.

After implementation, create a validation artifact under `spec/validation/` that records which checks passed, failed, were skipped, or are unavailable. If Playwright or browser screenshots are used, include the screenshot paths or evidence summary in that validation artifact.

## Idempotence and Recovery

All implementation steps should be additive and safe to repeat. Running `npm install` again should update `node_modules` without changing source files except for legitimate lockfile updates. Running `npm run build`, `npm run test`, and Docker build commands repeatedly should not alter tracked source files.

If dependency installation fails because of network restrictions, stop and request approval to run the required npm command with network access. Do not vendor dependencies manually. Record the blocked command and error in `Surprises & Discoveries`.

If Docker build fails because the base image cannot be fetched, request approval for Docker network access or ask the human to provide the image locally. Do not replace Docker with a host-only workflow, because Docker is an accepted requirement constraint.

If the page design grows beyond a single landing page, reduce scope back to the accepted requirement. Do not add authenticated flows, routing, backend APIs, or persistent storage without a new approved requirement or explicit human instruction.

If a generated scaffold creates unrelated demo content, delete the demo content during implementation and keep only the minimal files needed for Caniello. Preserve unrelated user edits. Avoid destructive git commands such as `git reset --hard` or `git checkout -- <path>` unless the human explicitly asks for them.

## Artifacts and Notes

Source requirement:

    spec/requirements/first-landing-page.md

Relevant repository guidance:

    README.md
    AGENTS.md
    spec/plans/PLANS.md
    src/AGENTS.md
    tests/README.md

Expected implementation artifacts:

    package.json
    package-lock.json
    index.html
    vite.config.ts
    tsconfig.json
    tsconfig.node.json
    tailwind.config.ts
    postcss.config.js
    Dockerfile
    docker-compose.yml
    .dockerignore
    .gitignore
    src/main.tsx
    src/App.tsx
    src/index.css
    src/components/WaitlistForm.tsx
    src/components/FeatureList.tsx
    src/App.test.tsx

Example acceptance transcript after successful implementation:

    $ npm run build
    > caniello@0.1.0 build
    > vite build
    built in ...s

    $ npm run test
    > caniello@0.1.0 test
    > vitest run
    Test Files  1 passed
    Tests       3 passed

    $ docker compose build
    ... build completed successfully

    $ docker compose up
    ... Local: http://localhost:5173/

## Interfaces and Dependencies

Use npm, React, React DOM, TypeScript, Vite, TailwindCSS, PostCSS, Autoprefixer, Docker, and Docker Compose.

The React entry point must be `src/main.tsx`, which mounts the application into an element with id `root` in `index.html`.

The main application component should be exported from `src/App.tsx`. It should render the complete single-page landing page and may compose smaller components. If a `LandingPage` component is created, keep it in `src/components/LandingPage.tsx` and have `App` render it.

The waitlist form component should expose visible behavior, not a backend contract. A suitable component shape is:

    export function WaitlistForm() {
      // keeps email, error, and submitted state locally
    }

The component should validate that the email is non-empty and contains a simple email shape before showing the thank-you state. It should not call `fetch`, write to local storage, or send data to analytics in this first implementation.

The Docker setup should support local development. A suitable `Dockerfile` uses a Node image, sets `/app` as the working directory, copies package files first, installs dependencies, then copies the rest of the app. `docker-compose.yml` should map the Vite development port from the container to the host and run the npm dev script with a host binding so the page is reachable from the host browser.

Revision note: This Draft ExecPlan was created on 2026-05-09 from the accepted first landing page requirement. It resolves non-critical ambiguity by choosing a minimal Vite React TypeScript app, English-only content, and a non-persistent waitlist-interest form so implementation can proceed safely after human approval.
