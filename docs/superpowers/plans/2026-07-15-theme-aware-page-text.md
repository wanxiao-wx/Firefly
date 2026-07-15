# Theme-Aware Page Text Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make navigation and other custom pages use the same light/dark foreground behavior as article pages.

**Architecture:** Define the missing semantic foreground tokens once in the global Stylus theme variables. Existing page-local styles continue consuming those tokens, while intentional white text on colored or image-overlay backgrounds remains unchanged.

**Tech Stack:** Astro 7, Svelte, TypeScript, Stylus, Tailwind CSS, pnpm

## Global Constraints

- Light theme primary text uses black with the existing opacity hierarchy.
- Dark theme primary text uses white with the same opacity hierarchy.
- Preserve intentional fixed white text on primary buttons, banners, badges, and image overlays.
- Avoid unrelated formatting or page-local style churn.

---

### Task 1: Define semantic foreground tokens

**Files:**
- Modify: `src/styles/variables.styl`

**Interfaces:**
- Consumes: Existing page declarations such as `color: var(--text-90)` and `color: var(--text-50)`.
- Produces: Global CSS custom properties `--text-90`, `--text-75`, `--text-70`, `--text-50`, `--text-30`, and `--text-25` in both theme scopes.

- [x] **Step 1: Run the regression assertion and verify it fails**

```bash
node - <<'NODE'
const fs = require("node:fs");
const css = fs.readFileSync("src/styles/variables.styl", "utf8");
const names = ["90", "75", "70", "50", "30", "25"];
for (const name of names) {
	const matches = css.match(new RegExp(`--text-${name}:`, "g")) || [];
	if (matches.length !== 2) throw new Error(`--text-${name} expected twice, found ${matches.length}`);
}
NODE
```

Expected: FAIL because the variables are not yet defined.

- [x] **Step 2: Add the light-theme variables**

Add under the main `:root` theme variables:

```stylus
  --text-90: rgba(0, 0, 0, 0.9)
  --text-75: rgba(0, 0, 0, 0.75)
  --text-70: rgba(0, 0, 0, 0.7)
  --text-50: rgba(0, 0, 0, 0.5)
  --text-30: rgba(0, 0, 0, 0.3)
  --text-25: rgba(0, 0, 0, 0.25)
```

- [x] **Step 3: Add the dark-theme variables**

Add under `:root.dark`:

```stylus
  --text-90: rgba(255, 255, 255, 0.9)
  --text-75: rgba(255, 255, 255, 0.75)
  --text-70: rgba(255, 255, 255, 0.7)
  --text-50: rgba(255, 255, 255, 0.5)
  --text-30: rgba(255, 255, 255, 0.3)
  --text-25: rgba(255, 255, 255, 0.25)
```

- [x] **Step 4: Re-run the regression assertion**

Run the command from Step 1.

Expected: exit code 0 with no output.

### Task 2: Verify the affected pages and project build

**Files:**
- Verify: `src/pages/web-navigation/index.astro`
- Verify: `src/pages/projects.astro`
- Verify: `src/pages/timeline.astro`
- Verify: `src/pages/diary.astro`
- Verify: `src/pages/dongxin-videos.astro`

**Interfaces:**
- Consumes: Foreground tokens from Task 1.
- Produces: Verified light/dark rendering without changing intentional overlay colors.

- [x] **Step 1: Confirm all token consumers resolve to defined tokens**

```bash
rg -n -- 'var\(--text-(90|75|70|50|30|25)\)' src/pages src/components
```

Expected: affected pages use only the six variables defined in Task 1.

- [x] **Step 2: Run Astro diagnostics**

```bash
pnpm check
```

Expected: exit code 0.

- [ ] **Step 3: Run TypeScript validation**

```bash
pnpm type-check
```

Expected: exit code 0.

Execution note: the repository currently reports 18 pre-existing `--isolatedDeclarations` annotation errors in unrelated TypeScript files, so this step remains unchecked. `pnpm check` and `pnpm build` both complete successfully.

- [x] **Step 4: Build the production site**

```bash
pnpm build
```

Expected: exit code 0 and a generated `dist` site.

- [x] **Step 5: Visually inspect both themes**

Open `/web-navigation/` and representative affected pages on the local site. Verify primary text changes from black in light mode to white in dark mode, secondary opacity remains hierarchical, and fixed white overlay/button text is unchanged.
