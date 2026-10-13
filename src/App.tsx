import { useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import projects from "./projects.json";
import "./landing.css";

const articleUrl =
  "https://www.mlive.com/news/ann-arbor/2026/03/fed-up-with-dating-apps-2-university-of-michigan-students-made-a-friendship-platform-instead.html";
const email = "naramesh@umich.edu";
const categories = [
  "All work",
  "AI tools",
  "Apps",
  "Prototypes",
  "Campaigns",
] as const;
type Category = (typeof categories)[number];
const categoryBySlug: Record<string, Category> = {
  "tweet-index": "AI tools",
  r2d2: "AI tools",
  "orbit-prm": "AI tools",
  "ai-paper-skill": "AI tools",
  commandvoice: "AI tools",
  kurate: "Apps",
  squadxoxo: "Apps",
  "linkedin-attribution-system": "Prototypes",
  "flow-finance": "Campaigns",
};
const orderedProjects = projects;
const skills = [
  {
    title: "Strategy & growth",
    description: "Understand the problem. Find a direction.",
    items: [
      "Go-to-market strategy",
      "Customer research",
      "Market analysis",
      "Data analysis",
      "Pricing strategy",
      "Roadmapping",
      "Sales strategy",
      "Viral marketing",
      "Growth hacking",
    ],
  },
  {
    title: "Development",
    description: "Turn an idea into something you can use.",
    items: ["JavaScript", "Node.js", "Python", "SQL", "C#"],
  },
  {
    title: "Tools & workflow",
    description: "Research, design, build, and iterate.",
    items: [
      "Figma",
      "Jira",
      "Power BI",
      "Tableau",
      "Git",
      "Antigravity",
      "Cursor",
      "Claude Code",
      "Replit",
    ],
  },
];
const navItems = [
  { id: "portfolio", label: "Portfolio" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const featured = project.slug === "tweet-index";
  const screenshot = project.media.find((m) => m.type === "image");
  const src = featured
    ? "/media/tweet-index/poster.jpg"
    : (screenshot?.url ?? project.preview);
  return (
    <article
      className={`work-card${featured ? " work-card-featured" : ""}`}
      style={{ "--project-accent": project.accent } as CSSProperties}
    >
      <div className="work-visual">
        <div className="work-visual-label">
          <span>
            {featured ? "Featured walkthrough" : categoryBySlug[project.slug]}
          </span>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <img
          src={src}
          alt={
            featured
              ? "Tweet Index terminal showing a search through saved X posts."
              : (screenshot?.caption ??
                `${project.title} illustrated project preview.`)
          }
          loading="lazy"
          decoding="async"
          width="1200"
          height="630"
        />
        <span className="work-media-caption">
          {featured
            ? "Original recording · 6 interactive chapters"
            : screenshot
              ? "From the project"
              : "Illustrated project overview"}
        </span>
      </div>
      <div className="work-copy">
        <span className="work-status">{project.status}</span>
        <h3>
          <a className="work-title" href={`/projects/${project.slug}/`}>
            {project.title}
          </a>
        </h3>
        <p>
          {featured
            ? "Find the post you meant to come back to. Explore a local search engine for saved X likes and bookmarks."
            : project.summary}
        </p>
        {featured && (
          <div className="work-feature-notes">
            <span>Chaptered video</span>
            <span>Search replay</span>
            <span>Behind the pipeline</span>
          </div>
        )}
        <a
          className="explore-project"
          href={`/projects/${project.slug}/`}
          aria-label={`Explore project: ${project.title}`}
        >
          Explore project <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<Category>("All work");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const menuButton = useRef<HTMLButtonElement>(null);
  const visibleProjects = orderedProjects.filter(
    (p) => category === "All work" || categoryBySlug[p.slug] === category,
  );
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }
  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="case-page landing">
      <a className="skip-link" href="#landing-main">
        Skip to content
      </a>
      <header
        className="landing-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            closeMenu();
            menuButton.current?.focus();
          }
        }}
      >
        <nav className="case-nav landing-nav" aria-label="Main navigation">
          <a href="#home" className="wordmark" onClick={closeMenu}>
            NACHIKETH RAMESH
          </a>
          <div className="landing-desktop-nav">
            {navItems.map((item) => (
              <a href={`#${item.id}`} key={item.id}>
                {item.label}
              </a>
            ))}
          </div>
          <button
            ref={menuButton}
            className="landing-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="landing-mobile-nav"
          >
            {menuOpen ? (
              <X size={21} aria-hidden="true" />
            ) : (
              <Menu size={21} aria-hidden="true" />
            )}
          </button>
        </nav>
        <nav
          id="landing-mobile-nav"
          className="landing-mobile-nav"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {navItems.map((item) => (
            <a href={`#${item.id}`} onClick={closeMenu} key={item.id}>
              {item.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </header>

      <main id="landing-main" className="case-main">
        <section
          className="landing-hero"
          id="home"
          aria-labelledby="home-heading"
        >
          <div className="landing-hero-meta">
            <span className="eyebrow">Technology & strategy</span>
            <a href="#portfolio">
              Explore {projects.length} projects{" "}
              <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>
          <h1 id="home-heading">
            I turn ideas into
            <br className="hero-line-break" /> <span>useful tools, apps,</span>
            <br className="hero-line-break" /> and experiences.
          </h1>
          <div className="landing-hero-bottom">
            <p>
              My work spans AI tools, consumer apps, and growth experiments,
              informed by a background in strategy and consulting.
            </p>
            <div className="landing-hero-actions">
              <a className="primary" href="#portfolio">
                Explore my work <ArrowDown size={16} aria-hidden="true" />
              </a>
              <a className="quiet-link" href="#about">
                A little about me <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          className="case-section work-section"
          id="portfolio"
          aria-labelledby="portfolio-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Selected work</p>
              <h2 id="portfolio-heading">Ideas, put into practice.</h2>
            </div>
            <p>
              Tools, apps, prototypes, and campaigns. Each project has a story
              you can explore.
            </p>
          </div>
          <div className="work-toolbar">
            <div
              className="work-filters"
              role="group"
              aria-label="Filter projects"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                  <span>
                    {item === "All work"
                      ? projects.length
                      : projects.filter((p) => categoryBySlug[p.slug] === item)
                          .length}
                  </span>
                </button>
              ))}
            </div>
            <p className="work-count" role="status">
              {visibleProjects.length} of {projects.length} projects
            </p>
          </div>
          <div className="work-grid">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={orderedProjects.findIndex(
                  (p) => p.slug === project.slug,
                )}
              />
            ))}
          </div>
          {category !== "All work" && (
            <button
              className="show-all-work"
              onClick={() => setCategory("All work")}
            >
              Show all {projects.length} projects{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          )}
        </section>

        <section
          className="case-section context landing-about"
          id="about"
          aria-labelledby="about-heading"
        >
          <div>
            <p className="eyebrow">02 / A little background</p>
            <h2 id="about-heading">
              Strategy meets
              <br />
              hands-on curiosity.
            </h2>
            <div className="about-signature">
              Nachiketh Ramesh<span>Research. Build. Learn.</span>
            </div>
          </div>
          <div>
            <p className="lead">
              I’m interested in what happens when business strategy meets the
              craft of making things.
            </p>
            <p>
              My background spans technology, management consulting with BCG,
              and an MBA journey at Michigan Ross. I’ve worked across the
              ideation, design, development, and rollout of 50+
              enterprise-grade products.
            </p>
            <p>
              At Ross, events such as Tech-Innovation Jam and Dare to Dream
              helped me explore consumer interviews, surveys, and analytics to
              better understand what people need.
            </p>
            <p>
              I put those ideas into practice by creating productivity tools and
              social apps with AI coding tools, and by running marketing
              campaigns.
            </p>
            <a
              className="press-link"
              href={articleUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="eyebrow">Featured in MLive / Ann Arbor</span>
              <span>
                Fed up with dating apps? 2 U-M students made a friendship
                platform instead.
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          className="case-section landing-skills"
          id="skills"
          aria-labelledby="skills-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / How I work</p>
              <h2 id="skills-heading">A toolkit for making progress.</h2>
            </div>
            <p>
              Technical skills and strategic thinking, developed through 7+
              years of professional experience.
            </p>
          </div>
          <div className="skill-columns">
            {skills.map((group, index) => (
              <article key={group.title}>
                <span className="skill-number">0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>
                  {group.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          className="case-section landing-contact"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div>
            <p className="eyebrow">04 / Start a conversation</p>
            <h2 id="contact-heading">
              Have an idea in mind?
              <br />
              <span>Let’s talk.</span>
            </h2>
            <p>A project, a question, or something worth exploring together.</p>
          </div>
          <div className="contact-links">
            <a className="email-link" href={`mailto:${email}`}>
              {email}
              <ArrowUpRight size={23} aria-hidden="true" />
            </a>
            <button className="copy-email" onClick={copyEmail}>
              {copyStatus === "copied" ? (
                <Check size={15} aria-hidden="true" />
              ) : (
                <Copy size={15} aria-hidden="true" />
              )}
              {copyStatus === "copied" ? "Email copied" : "Copy email address"}
            </button>
            <p className="copy-status" role="status">
              {copyStatus === "failed"
                ? "Could not copy. You can select the address above or open it in your email app."
                : copyStatus === "copied"
                  ? "Copied to clipboard."
                  : ""}
            </p>
            <div className="contact-socials">
              <a
                href="https://www.linkedin.com/in/nachikethramesh/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                href="https://github.com/NachikethRamesh"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="case-footer landing-footer">
        <span>© 2026 Nachiketh Ramesh</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}
