# Project inventory

Current published collection: nine projects, ordered Tweet Index, R2D2, Kurate, Squadxoxo, AI-paper explanation skill, CommandVoice, Orbit PRM, Flow Finance, and LinkedIn Attribution System. MHustle and AirKitchen were removed from the site at the owner’s request; their obsolete media has also been removed. Earlier versions remain available in Git history. The original implementation record below includes those retired projects.

Prepared before implementation, 2026-10-11. Website baseline: `391f85c`. No AGENTS.md found in repository or parent directories. React 19, TypeScript 5.8, Vite 6, Motion 12, Tailwind 4; Cloudflare Pages (`wrangler.toml`, output `dist`). Existing project navigation uses `#portfolio#<slug>`.

| Project | Verified sources | Media | Route | Planned interaction |
|---|---|---|---|---|
| Kurate | Existing portfolio descriptions; kurate.net | Landing + dashboard screenshots | `/projects/kurate/` | Annotated save / organize / rediscover tour |
| Squadxoxo | Existing portfolio; squadxoxo.com; MLive attribution | Two screenshots | `/projects/squadxoxo/` | Join / preferences / Thursday drop / chat guide |
| LinkedIn Attribution System | Existing portfolio; public repository README | Two screenshots | `/projects/linkedin-attribution-system/` | Fictional engagement -> fit -> follow-up explorer |
| Flow Finance | Existing portfolio campaign account; App Store link | Two campaign images | `/projects/flow-finance/` | Problem / execution / reported results timeline; campaign contributor credit |
| MHustle | Existing portfolio; public prototype repository | Features image + original MP4 | `/projects/mhustle/` | Video chapters after inspecting recording; prototype scope |
| AirKitchen | Existing portfolio; Replit link; empty public repository | Landing + explore screenshots | `/projects/airkitchen/` | Annotated discovery / browsing walkthrough |
| Tweet Index | Supplied HTML; public README | Embedded MP4, poster, VTT; social.jpg not separately supplied | `/projects/tweet-index/` | Preserve all six chapters, replay, results, pipeline |
| R2D2 | Public README + AssistantService.cs + ModelProvider.cs + FloatingAskWindow.xaml; LinkedIn post recovered through direct HTTP | Public settings + provider images | `/projects/r2d2/` | Four fixed, labeled example learning modes |
| Orbit PRM | Public README + warmth / summarizer / Exa / database source; LinkedIn post recovered through direct HTTP | No verified product capture; use fictional example | `/projects/orbit-prm/` | Contact -> summary -> warmth -> enrichment -> reminder |
| AI-paper explanation skill | Public README + SKILL.md; post-verified Zara Zhang attribution; LinkedIn post recovered through direct HTTP | README output screenshots | `/projects/ai-paper-skill/` | Analogy / workflow / code / math and quiz example |
| CommandVoice | Public README + app / transcriber / model_selector / delivery Python source | No public desktop UI; illustrated flow | `/projects/commandvoice/` | Fixed hotkey -> recording -> transcription -> clipboard / paste illustration |

## Accuracy boundaries

- Orbit stores data locally but sends interaction content to OpenAI and contact queries to Exa; Google sync is external. Do not repeat the README's "data never leaves" claim. Warmth uses weighted interactions with a 90-day linear decay, capped at 100.
- CommandVoice's public repository is the Python console core, not the Electron UI or installers. Local faster-whisper inference may require model downloads.
- Flow results (1.2k impressions, +33% downloads) are the existing portfolio's self-reported campaign figures, not independently audited. Arjun Mayur built the app.
- MHustle and AirKitchen remain prototypes. Do not assert payment security.
- LinkedIn short links initially failed in the browser source tool; direct HTTP recovered all three public posts. The R2D2 and paper-skill outbound links resolve to the repositories used here. Orbit's download is in comments not exposed in the retrieved post; its public repository independently verifies implementation.
- Supplied HTML references a former host social.jpg, but the image was not attached separately. Use a locally generated project-specific fallback. The old host returns HTTP 403 for that image; a poster-based preview is included.
- The paper-skill post explicitly credits Zara Zhang and links to https://github.com/zarazhangrui/codebase-to-course. This is a paper-to-lesson skill, distinct from her codebase-to-course work.

## Source URLs and media provenance

### Kurate

- [Visit project](https://kurate.net)
- [Original portfolio source](https://github.com/NachikethRamesh/nachikethramesh/blob/391f85cd3782c0a79fa8af14927de73f68c860ec/src/App.tsx)
- `public/images/kurate_landing.png`: Original Kurate landing page: a personal library for articles, videos, and podcasts.
- `public/images/kurate_dashboard.png`: Original Kurate dashboard: reading states, categories, a saved-content list, and the Add Link panel.

### Squadxoxo

- [Visit project](https://squadxoxo.com)
- [MLive article](https://www.mlive.com/news/ann-arbor/2026/03/fed-up-with-dating-apps-2-university-of-michigan-students-made-a-friendship-platform-instead.html)
- [Original portfolio source](https://github.com/NachikethRamesh/nachikethramesh/blob/391f85cd3782c0a79fa8af14927de73f68c860ec/src/App.tsx)
- `public/images/Squad1.png`: Original Squad landing page, introducing weekly friendship groups at UMich.
- `public/images/Squad2.png`: Original Squad dashboard, with preference settings and the next group drop.

### LinkedIn Attribution System

- [GitHub](https://github.com/NachikethRamesh/LinkedIn-Engagement-Attribution-System)
- [Original portfolio source](https://github.com/NachikethRamesh/nachikethramesh/blob/391f85cd3782c0a79fa8af14927de73f68c860ec/src/App.tsx)
- `public/images/LAS_2.png`: Original attribution prototype dashboard for engagement and account context.
- `public/images/LAS_1.png`: Original workflow diagram: engagement data, account mapping, intent, and pipeline paths.

### Flow Finance

- [Original App Store listing (currently unavailable)](https://apps.apple.com/in/app/flow-fast-finance-news/id6751279102)
- [Original portfolio source](https://github.com/NachikethRamesh/nachikethramesh/blob/391f85cd3782c0a79fa8af14927de73f68c860ec/src/App.tsx)
- `public/images/Flow1.jpeg`: Original campaign photograph at Michigan Ross; app developed by Arjun Mayur.
- `public/images/Flow2.jpeg`: Original photograph of the in-person Flow Finance marketing stunt.

### MHustle

- [GitHub](https://github.com/NachikethRamesh/MHustle)
- [Original portfolio source](https://github.com/NachikethRamesh/nachikethramesh/blob/391f85cd3782c0a79fa8af14927de73f68c860ec/src/App.tsx)
- `public/images/MHustle_Features.png`: Original MHustle concept sheet. Trust and payment claims shown in the artwork are prototype ambitions, not verified guarantees.
- `public/images/Demo_Seeker_web.mp4`: Original MHustle seeker-flow prototype recording.

### AirKitchen

- [Original demo (currently unavailable)](https://home-chef-connect--doncheetos.replit.app/)
- [Original portfolio source](https://github.com/NachikethRamesh/nachikethramesh/blob/391f85cd3782c0a79fa8af14927de73f68c860ec/src/App.tsx)
- `public/images/airkitchen_landing.png`: Original AirKitchen landing prototype for discovering home-cooked meals.
- `public/images/airkitchen_explore.png`: Original AirKitchen browse prototype, showing search, categories, and meal cards.

### Tweet Index

- [GitHub](https://github.com/NachikethRamesh/Tweet-Index)

### R2D2

- [GitHub](https://github.com/NachikethRamesh/R2D2)
- [Original LinkedIn post](https://lnkd.in/p/g_tCJbwT)
- [AssistantService.cs](https://github.com/NachikethRamesh/R2D2/blob/HEAD/AssistantService.cs)
- [ModelProvider.cs](https://github.com/NachikethRamesh/R2D2/blob/HEAD/ModelProvider.cs)
- `public/images/r2d2-settings.png`: Actual settings window from the R2D2 README.
- `public/images/r2d2-providers.png`: Actual provider selector from the README; model availability can change.

### Orbit PRM

- [GitHub](https://github.com/NachikethRamesh/Orbit_ProfessionalRelationshipManager)
- [Original LinkedIn post](https://lnkd.in/p/gzX7EmdX)
- [warmth.service.ts](https://github.com/NachikethRamesh/Orbit_ProfessionalRelationshipManager/blob/HEAD/src/services/warmth.service.ts)
- [summarizer.service.ts](https://github.com/NachikethRamesh/Orbit_ProfessionalRelationshipManager/blob/HEAD/src/services/summarizer.service.ts)
- [exa.service.ts](https://github.com/NachikethRamesh/Orbit_ProfessionalRelationshipManager/blob/HEAD/src/services/exa.service.ts)

### AI-paper explanation skill

- [GitHub](https://github.com/NachikethRamesh/ai-paper-skill)
- [Original LinkedIn post](https://lnkd.in/p/gkiw5bpx)
- [SKILL.md](https://github.com/NachikethRamesh/ai-paper-skill/blob/HEAD/SKILL.md)
- [Inspiration: Zara Zhang's codebase-to-course](https://github.com/zarazhangrui/codebase-to-course)
- `public/images/paper-example-1.png`: Actual lesson output from the ai-paper-skill README — Attention Is All You Need, view 1.
- `public/images/paper-example-2.png`: Actual lesson output from the ai-paper-skill README — Attention Is All You Need, view 2.
- `public/images/paper-example-3.png`: Actual lesson output from the ai-paper-skill README — Attention Is All You Need, view 3.
- `public/images/paper-example-4.png`: Actual lesson output from the ai-paper-skill README — Attention Is All You Need, view 4.

### CommandVoice

- [GitHub](https://github.com/NachikethRamesh/CommandVoice)
- [app.py](https://github.com/NachikethRamesh/CommandVoice/blob/HEAD/commandvoice/app.py)
- [transcriber.py](https://github.com/NachikethRamesh/CommandVoice/blob/HEAD/commandvoice/transcriber.py)
- [model_selector.py](https://github.com/NachikethRamesh/CommandVoice/blob/HEAD/commandvoice/model_selector.py)

Tweet Index MP4, JPEG poster, and VTT were decoded from the supplied HTML without re-encoding. MP4 SHA-256: `7f4c5c408a432417d4dc07f60aa6eeebedc639b7c42a979108c45fd7ca0abece`. Only the extracted walkthrough fragment, CSS, JS, and normal static media ship; the 21 MB base64 HTML does not.

R2D2 images are copied from its public `docs/settings.png` and `docs/providers.png`. Paper lesson images are copied from the four GitHub attachment URLs embedded in its README. Existing portfolio images and videos are retained. MHustle chapter times (0, 4, 9, 14, 19, 23 seconds) were checked against frames from the existing 39.829-second recording; its new VTT describes the visual workflow, not spoken dialogue.

External checks: existing Flow Finance App Store URLs (IN and US) and the existing AirKitchen Replit demo returned HTTP 404. Original links remain explicitly labeled as currently unavailable. MLive returned HTTP 403 to the retrieval client; its original attribution/link remains. Kurate, Squadxoxo, all linked project GitHub pages, and all three LinkedIn posts returned HTTP 200.
