# Nachiketh Ramesh Portfolio

Portfolio and nine interactive project case studies built with React 19, TypeScript, Vite 6, Motion, and Tailwind CSS v4. Cloudflare Pages serves the generated `dist/` directory.

## Local development and production preview

Use Node.js 22 LTS and npm.

```sh
npm ci
npm run dev
```

Development runs at http://localhost:3000. To review the actual prerendered output:

```sh
npm run lint
npm run build
npm run check:pages
npm run preview
```

Open http://localhost:4173 and any `/projects/<slug>/` URL. `lint` runs the repository's TypeScript check. No account, API key, model provider, or microphone is needed for these portfolio demonstrations.

## Project pages

| Project | Route |
|---|---|
| Tweet Index | `/projects/tweet-index/` |
| R2D2 | `/projects/r2d2/` |
| Kurate | `/projects/kurate/` |
| Squadxoxo | `/projects/squadxoxo/` |
| AI-paper explanation skill | `/projects/ai-paper-skill/` |
| CommandVoice | `/projects/commandvoice/` |
| Orbit PRM | `/projects/orbit-prm/` |
| Flow Finance | `/projects/flow-finance/` |
| LinkedIn Attribution System | `/projects/linkedin-attribution-system/` |

Existing `/#portfolio#<slug>` URLs redirect in the browser to their case study. Hash fragments are not sent to servers, so those legacy links cannot themselves carry per-project crawler metadata; share the new paths.

## How it is built

- `src/projects.json` is the shared content, media, attribution, link, and metadata source for the homepage and project pages.
- `src/App.tsx` and `src/landing.css` provide the homepage using the same layout and typography classes as the case studies. The nine projects appear in the order above by default, and category filters help visitors browse. About, skills, press attribution, and contact links remain available below the work. MHustle and AirKitchen have been removed from the published project collection; their obsolete media has also been removed. Earlier versions remain available in Git history.
- `src/CaseStudy.tsx` provides the shared editorial layout, accessible gallery and workflow controls, plus the project-specific demonstrations.
- `src/Site.tsx` selects the homepage, case study, or not-found page by pathname. Links use ordinary browser navigation, so direct visits and refreshes work without a client router dependency.
- `src/entry-server.tsx` renders the same React tree at build time. `scripts/prerender.mjs` writes a complete `index.html` for each project, with unique title, description, canonical, Open Graph, and Twitter metadata in the initial response. The browser hydrates that content.
- `public/media/tweet-index/` preserves the supplied interactive walkthrough as a same-origin, automatically sized frame. The MP4, JPEG poster, VTT captions, CSS, and JS are separate static assets. No dependency on the previous host remains.
- `public/social/` contains checked-in, project-specific 1200×630 JPEG previews. Regenerate them with `python scripts/create-previews.py` if needed (optional authoring dependency: Pillow; not needed to build the site).
- `scripts/check-pages.mjs` verifies all generated routes, metadata uniqueness, homepage links, and media references.

Videos use native controls, metadata preload, posters, and user-initiated playback. The homepage includes no video. Recreated interactions and fictional data are labeled; the site calls no product APIs.

## Deployment

Keep the existing Cloudflare Pages project and domain. The repository's `wrangler.toml` specifies `dist` as the output directory. In the existing Pages Git integration, use:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 22 LTS

After committing changes, push to the branch configured in your existing Pages project. The repository does not expose your dashboard's production branch or automatic-deployment settings, so confirm those in the existing project rather than creating a new deployment.

The generated directories serve `/projects/<slug>/` directly. Do not add a catch-all rewrite to `/index.html`: it would discard project-specific metadata. The generated top-level `404.html` also prevents unknown paths from receiving homepage metadata. See [Cloudflare's route matching documentation](https://developers.cloudflare.com/pages/configuration/serving-pages/).

This repository already tracks `dist/`; the local build refreshes that output and removes obsolete hashed bundles. Run the build again after any source edit before using a direct-upload workflow. Commits and pushes follow the normal Git workflow; no separate deployment command is required for a configured Pages Git integration.

## Verification and source notes

See [project inventory and provenance](docs/project-inventory.md) and [handoff / verification record](docs/case-study-handoff.md).

For the optional Chromium interaction check, start the production preview, then run:

```sh
npx --yes --package @playwright/cli playwright-cli -s=portfolio open http://localhost:4173
npx --yes --package @playwright/cli playwright-cli -s=portfolio run-code --filename scripts/browser-check.cjs
npx --yes --package @playwright/cli playwright-cli -s=portfolio run-code --filename scripts/landing-browser-check.cjs
```

The checks use the Playwright CLI's code-file format (an async function expression without a trailing semicolon). They exercise the routes, galleries, workflow steps, demos, video seeking, legacy redirect, mobile overflow, and keyboard controls. The landing-page check also covers category filters, clipboard success/failure with a mocked clipboard, mobile navigation, and layouts from 360px to 2560px. Screenshots go in ignored `output/playwright/`.
