import { MotionConfig } from "motion/react";
import App from "./App";
import { CaseStudy, NotFound } from "./CaseStudy";
import projects from "./projects.json";

export function Site({ pathname }: { pathname: string }) {
  const slug = pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  const project = projects.find((p) => p.slug === slug);
  return (
    <MotionConfig reducedMotion="user">
      {pathname === "/" ? (
        <App />
      ) : project ? (
        <CaseStudy project={project} />
      ) : (
        <NotFound />
      )}
    </MotionConfig>
  );
}
