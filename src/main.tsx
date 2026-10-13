import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Site } from "./Site";
import projects from "./projects.json";
import "./index.css";

function legacyRedirect() {
  const match = location.hash.match(/^#(?:portfolio#|project[-/])(.+)$/);
  const project =
    match && projects.find((p) => p.slug === match[1].toLowerCase());
  if (project) location.replace(`/projects/${project.slug}/`);
}
legacyRedirect();
window.addEventListener("hashchange", legacyRedirect);
const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <Site pathname={location.pathname} />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
