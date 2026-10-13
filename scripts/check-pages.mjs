import { readFile, access, readdir } from "node:fs/promises";
import assert from "node:assert/strict";
const projects = JSON.parse(await readFile("src/projects.json", "utf8"));
const origin = "https://nachikethramesh.com";
assert.deepEqual(
  (await readdir("dist/projects")).sort(),
  projects.map((p) => p.slug).sort(),
  "generated routes must match the current project collection",
);
const titles = new Set(),
  descriptions = new Set(),
  images = new Set();
for (const p of projects) {
  const route = `/projects/${p.slug}/`;
  const html = await readFile(`dist${route}index.html`, "utf8");
  const tags = [
    ...html.matchAll(/<meta (?:name|property)="([^"]+)" content="([^"]*)"/g),
  ];
  const meta = Object.fromEntries(tags.map((m) => [m[1], m[2]]));
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title?.startsWith(p.title), `${route}: title`);
  assert.equal(meta["og:url"], origin + route);
  assert(html.includes(`<link rel="canonical" href="${origin + route}"`));
  assert.equal(meta["og:title"], title);
  assert.equal(meta["twitter:title"], title);
  assert.equal(meta["twitter:card"], "summary_large_image");
  assert.equal(meta["og:description"], meta.description);
  assert.equal(meta["twitter:description"], meta.description);
  assert.equal(meta["og:image"], origin + p.preview);
  assert.equal(meta["twitter:image"], origin + p.preview);
  assert(html.includes(`<h1>${p.title}</h1>`), `${route}: prerendered content`);
  assert(!html.includes('href="#"'), `${route}: placeholder link`);
  titles.add(title);
  descriptions.add(meta.description);
  images.add(meta["og:image"]);
  await access("dist" + p.preview);
  for (const m of html.matchAll(/(?:src|poster|href)="(\/[^"#?]*)/g)) {
    if (m[1] === "/" || m[1].startsWith("/projects/")) continue;
    await access("dist" + m[1]);
  }
}
for (const values of [titles, descriptions, images])
  assert.equal(values.size, projects.length, "metadata must be unique");
const home = await readFile("dist/index.html", "utf8");
assert(!home.includes("<video"), "homepage must not load video");
for (const p of projects)
  assert(
    home.includes(`href="/projects/${p.slug}/"`),
    `missing homepage card: ${p.slug}`,
  );
const tour = await readFile("dist/media/tweet-index/tour.html", "utf8");
assert(!tour.includes("data:video"), "video must be external");
for (const m of tour.matchAll(/(?:src|poster|href)="(\/[^"#]*)/g))
  await access("dist" + m[1]);
for (const file of await readdir("dist/assets")) {
  if (file.endsWith(".js"))
    assert(
      !(await readFile("dist/assets/" + file, "utf8")).includes("data:video"),
      "no bundled video",
    );
}
for (const name of ["tour.html", "tour.css", "tour.js"])
  assert(
    !(await readFile("dist/media/tweet-index/" + name, "utf8")).includes(
      "chatgpt.site",
    ),
  );
await access("dist/404.html");
await access("dist/sitemap.xml");
console.log(
  `PASS: ${projects.length} initial HTML pages, unique metadata, portfolio links, local media, and extracted Tweet Index assets.`,
);
