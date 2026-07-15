# Profile and Logo Image Replacement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the profile avatar, navigation logo, and browser favicon with the approved square source image.

**Architecture:** Generate one shared 512 × 512 WebP page asset and dedicated favicon files from the same source. Point the two page-level configuration consumers at the shared WebP while preserving the existing favicon URL and all unrelated presentation settings.

**Tech Stack:** Astro 7, TypeScript configuration, `cwebp`, macOS `sips`, pnpm, in-app browser.

## Global Constraints

- Source image: `/Users/wanxiao/Desktop/图标/微信图片_20260708002352_75_2002.jpg`.
- Preserve the complete square composition without cropping.
- Use WebP for the profile and navbar image, and PNG/ICO for favicon compatibility.
- Do not change profile copy, site title, colors, layout, or unrelated images.
- Keep `.playwright-cli/` and `output/` untracked and untouched.

---

### Task 1: Generate Shared Page Asset and Favicons

**Files:**
- Create: `public/assets/images/profile-logo.webp`
- Modify: `public/favicon/favicon-32.png`
- Modify: `public/favicon/favicon-64.png`
- Modify: `public/favicon/favicon.ico`

**Interfaces:**
- Consumes: the approved 1254 × 1254 JPEG source image.
- Produces: `/assets/images/profile-logo.webp` for page configuration and `/favicon/favicon.ico` for HTML metadata.

- [ ] **Step 1: Verify the source contract**

Run:

```bash
test -r '/Users/wanxiao/Desktop/图标/微信图片_20260708002352_75_2002.jpg'
sips -g pixelWidth -g pixelHeight '/Users/wanxiao/Desktop/图标/微信图片_20260708002352_75_2002.jpg'
```

Expected: exit code 0 and both dimensions equal `1254`.

- [ ] **Step 2: Generate the shared WebP**

Run:

```bash
cwebp -quiet -q 88 -resize 512 512 '/Users/wanxiao/Desktop/图标/微信图片_20260708002352_75_2002.jpg' -o public/assets/images/profile-logo.webp
```

Expected: `public/assets/images/profile-logo.webp` exists and reports `512 × 512` via `sips`.

- [ ] **Step 3: Generate favicon PNG and ICO assets**

Run:

```bash
sips -s format png -z 32 32 '/Users/wanxiao/Desktop/图标/微信图片_20260708002352_75_2002.jpg' --out public/favicon/favicon-32.png
sips -s format png -z 64 64 '/Users/wanxiao/Desktop/图标/微信图片_20260708002352_75_2002.jpg' --out public/favicon/favicon-64.png
sips -s format ico -z 64 64 '/Users/wanxiao/Desktop/图标/微信图片_20260708002352_75_2002.jpg' --out public/favicon/favicon.ico
```

Expected: PNG files report 32 × 32 and 64 × 64; `file public/favicon/favicon.ico` reports a Microsoft icon resource.

- [ ] **Step 4: Validate the generated files**

Run:

```bash
file public/assets/images/profile-logo.webp public/favicon/favicon-32.png public/favicon/favicon-64.png public/favicon/favicon.ico
sips -g pixelWidth -g pixelHeight public/assets/images/profile-logo.webp public/favicon/favicon-32.png public/favicon/favicon-64.png
```

Expected: all four files are recognized images with their planned dimensions.

### Task 2: Point Profile and Navbar Configuration at the Shared Asset

**Files:**
- Modify: `src/config/profileConfig.ts:9`
- Modify: `src/config/siteConfig.ts:77`

**Interfaces:**
- Consumes: `/assets/images/profile-logo.webp` from Task 1.
- Produces: profile and navbar configuration values that resolve to the same public image.

- [ ] **Step 1: Update the profile avatar path**

Apply this exact replacement in `src/config/profileConfig.ts`:

```ts
avatar: "/assets/images/profile-logo.webp",
```

- [ ] **Step 2: Update the navbar logo path**

Apply this exact replacement in `src/config/siteConfig.ts`:

```ts
logo: {
	type: "image",
	value: "/assets/images/profile-logo.webp",
	alt: "潇拾壹",
},
```

- [ ] **Step 3: Verify the configuration references**

Run:

```bash
rg -n 'profile-logo\.webp' src/config/profileConfig.ts src/config/siteConfig.ts
```

Expected: exactly two references, both `/assets/images/profile-logo.webp`.

- [ ] **Step 4: Run Astro diagnostics**

Run:

```bash
pnpm check
```

Expected: 0 errors, 0 warnings, and 0 hints.

- [ ] **Step 5: Commit the asset and configuration change**

```bash
git add public/assets/images/profile-logo.webp public/favicon/favicon-32.png public/favicon/favicon-64.png public/favicon/favicon.ico src/config/profileConfig.ts src/config/siteConfig.ts
git commit -m "feat: update profile and site logo"
```

### Task 3: Verify the Local Website

**Files:**
- Verify only: homepage at `http://127.0.0.1:4321/`

**Interfaces:**
- Consumes: the generated assets and updated Astro configuration from Tasks 1–2.
- Produces: visual and browser-console evidence that all three requested locations use the new image.

- [ ] **Step 1: Ensure the development server is running**

Run:

```bash
pnpm astro dev status || pnpm dev --host 127.0.0.1
```

Expected: local server available at `http://127.0.0.1:4321/`.

- [ ] **Step 2: Reload the existing local homepage**

Use the in-app browser to reload `http://127.0.0.1:4321/` after the asset changes.

Expected: the profile card image and navbar logo both show the approved yellow-background portrait.

- [ ] **Step 3: Verify DOM image sources and favicon metadata**

Read the rendered image and icon URLs from the page.

Expected:

```text
profile image: /assets/images/profile-logo.webp
navbar logo: /assets/images/profile-logo.webp
favicon: /favicon/favicon.ico
```

- [ ] **Step 4: Check browser errors**

Inspect browser console errors after reload.

Expected: no 404 or decode errors for `profile-logo.webp` or `favicon.ico`.

- [ ] **Step 5: Confirm repository state**

Run:

```bash
git status -sb
git log -1 --oneline
```

Expected: only the intentionally excluded `.playwright-cli/` and `output/` remain untracked, and the latest commit is `feat: update profile and site logo`.
