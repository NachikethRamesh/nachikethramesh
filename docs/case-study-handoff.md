# Case-study upgrade handoff

Current published collection: nine projects, ordered Tweet Index, R2D2, Kurate, Squadxoxo, AI-paper explanation skill, CommandVoice, Orbit PRM, Flow Finance, and LinkedIn Attribution System. MHustle and AirKitchen were removed from the site at the owner’s request; their obsolete media has also been removed. Earlier versions remain available in Git history. The original implementation record below includes those retired projects.

## Delivered

All nine current projects have their own `/projects/<slug>/` page, homepage discovery action, previous/next navigation, original useful links, role/status, context, evidence boundaries, and unique social cards. Shared project data powers the pages and build-time metadata. The retained original entries preserve their content, assets, skills, technology attribution, and links; unsupported payment-security phrasing is qualified rather than repeated as a verified claim.

Interaction types include annotated screenshot guides, a campaign timeline, a fictional attribution workflow, Tweet Index's complete six-chapter tour and recorded search replay, R2D2's four modes, Orbit's contact workflow and source-derived warmth calculation, a paper lesson and quiz, and CommandVoice's illustrated dictation stages.

The supplied Tweet Index video, poster, and captions were extracted. Its recording is unchanged byte-for-byte. Search result expansions, original X links, the five-stage pipeline, and playback-synchronized explanations remain functional. The case study and embedded walkthrough explain local storage versus external model calls and enrichment fetches.

## Verification

- `npm ci`: installed the existing lockfile without adding application dependencies.
- `npm run lint`: TypeScript passed.
- `npm run build`: client and server builds passed; prerendered homepage, nine case studies, a 404, sitemap, and robots file generated.
- `npm run check:pages`: all nine pages passed unique metadata, prerendered content, canonical/OG/Twitter, homepage discovery, and static-media-path checks.
- Chromium/Playwright: direct visits and refreshes on all nine routes; every screenshot gallery and guided workflow; disclosure controls; four R2D2 modes; Orbit slider endpoints and reminder add/remove; paper lesson choices and correct/incorrect/reset quiz behavior; CommandVoice optional paste and restart; all six chapters of the Tweet Index video; Tweet replay reset, all three expanded results and original links, all five pipeline stages, playback synchronization; legacy hash redirect and mobile navigation.
- Desktop 1440×1000 and mobile 390×844 checks; no horizontal overflow on the nine pages or Tweet frame. Inspected representative screenshots in `output/playwright/`.
- Keyboard skip link and Space activation; reduced-motion preference; no observed browser runtime errors or failed local media requests during the check.
- All ten current preview images are 1200×630. Tweet MP4 SHA-256 and provenance are recorded in the inventory.

## Specific source gaps and external limits

- The separate supplied `social.jpg` was not present in Downloads. Its former host returned 403 when requested. Tweet Index has a new local preview composed from the extracted original poster and project title. Replace `public/social/tweet-index.jpg` if the original is provided later.
- The LinkedIn browser source tool failed initially, but direct HTTP recovered all three public posts. R2D2 and paper-skill outgoing links were followed to the expected repositories, and Zara Zhang's inspiration repository was verified. Orbit's comment-only download link was not exposed; the public `Orbit_ProfessionalRelationshipManager` code was inspected independently.
- Flow Finance's existing App Store listing returned 404 in both IN and US regions. The original Flow Finance link is retained and labeled currently unavailable.
- MLive blocked automated retrieval with 403. Its original article URL and attribution remain.
- Flow Finance's 1.2k impressions and +33% download figures come from the existing portfolio, without raw analytics or a supplied measurement window. They are explicitly described as reported results. Arjun Mayur retains app-development credit.
- CommandVoice's public repository contains the Python core, not its independent Electron UI or installers. The page uses a labeled illustration rather than fabricating desktop UI.
- No real product integration, external model call, microphone recording, private contact import, or payment was exercised. Those are intentionally outside the portfolio demos.
- Browser checks used local Chromium, not Safari/Firefox or physical phones. Cloudflare dashboard settings, production deployment, and real LinkedIn unfurl cache behavior were not exercised. Static HTML metadata is verified locally.
- `npm ci` reported eight pre-existing dependency advisories (one low, one moderate, six high). Dependency upgrades were not folded into the case-study work.

## Review and publish

The homepage was subsequently redesigned to share the case studies' typography, navigation, page width, section rules, and pale-green accent. The approved introduction remains, Tweet Index is featured first, and all nine projects have visual previews. Category filters, a mobile navigation disclosure, keyboard access, and email-copy feedback were verified with `scripts/landing-browser-check.cjs` at seven widths from 360px to 2560px. Updated screenshots use the `landing-` filename prefix in `output/playwright/`. Product-management positioning has been removed from public copy and metadata.

Use the README's preview commands, review the changes, then commit and push through the existing Cloudflare Pages workflow. The build command remains `npm run build`, and the output remains `dist`. Generated project directories provide direct navigation without a fallback rewrite. The owner subsequently authorized repository cleanup, committing, and pushing. No separate deployment command is used.
