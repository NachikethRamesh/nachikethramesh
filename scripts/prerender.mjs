import { readFile, writeFile, mkdir } from "node:fs/promises";
import { render } from "../.prerender/entry-server.js";

const projects = JSON.parse(await readFile("src/projects.json", "utf8"));
const template = (await readFile("dist/index.html", "utf8")).replace(/\r\n/g, "\n");
if (!template.includes("<!--metadata-->") || !template.includes('<div id="root"></div>')) {
  throw new Error('Expected a fresh Vite template. Run npm run build instead of prerendering existing output.');
}
const origin = "https://nachikethramesh.com";
const escape = (s) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
function html(route, project) {
  const title = project
    ? `${project.title} | Nachiketh Ramesh`
    : "Nachiketh Ramesh | Technology & Strategy";
  const description = project
    ? project.description
    : "Technology, strategy, and ideas put into practice. Explore tools, apps, campaigns, and interactive case studies by Nachiketh Ramesh.";
  const image = origin + (project?.preview ?? "/social/portfolio.jpg");
  const meta = `<title>${escape(title)}</title>
    <meta name="description" content="${escape(description)}" />
    <link rel="canonical" href="${origin + route}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:url" content="${origin + route}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escape(project?.title ?? "Nachiketh Ramesh")} — project portfolio" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="${image}" />`;
  return template
    .replace("<!--metadata-->", meta)
    .replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
}
await writeFile("dist/index.html", html("/"));
for (const project of projects) {
  const route = `/projects/${project.slug}/`;
  await mkdir(`dist${route}`, { recursive: true });
  await writeFile(`dist${route}index.html`, html(route, project));
}
await writeFile(
  "dist/404.html",
  template
    .replace(
      "<!--metadata-->",
      '<title>Page not found | Nachiketh Ramesh</title><meta name="robots" content="noindex"/>',
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${render("/404/")}</div>`,
    ),
);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", ...projects.map((p) => `/projects/${p.slug}/`)].map((route) => `<url><loc>${origin + route}</loc></url>`).join("")}</urlset>`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
console.log(
  `Prerendered homepage and ${projects.length} project pages with unique initial-HTML metadata.`,
);
