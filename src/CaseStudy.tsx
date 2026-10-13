import { useEffect, useRef, useState, type CSSProperties } from "react";
import projects from "./projects.json";
import "./case-study.css";

export type Project = (typeof projects)[number];
const path = (p: Project) => `/projects/${p.slug}/`;

function Choices({
  labels,
  value,
  onChange,
  label,
}: {
  labels: string[];
  value: number;
  onChange: (i: number) => void;
  label: string;
}) {
  return (
    <div className="choices" role="group" aria-label={label}>
      {labels.map((text, i) => (
        <button
          key={text}
          aria-pressed={value === i}
          onClick={() => onChange(i)}
        >
          <span>{String(i + 1).padStart(2, "0")}</span>
          {text}
        </button>
      ))}
    </div>
  );
}

function Gallery({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const media = project.media.filter((m) => m.type === "image");
  if (!media.length) return null;
  return (
    <section className="case-section" aria-labelledby="gallery-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">From the project</p>
          <h2 id="gallery-title">A closer look.</h2>
        </div>
        <p>
          Original project assets. Open an image to inspect it at full
          resolution.
        </p>
      </div>
      <Choices
        labels={media.map((_, i) => `View ${i + 1}`)}
        value={active}
        onChange={setActive}
        label="Choose a project image"
      />
      <figure className="gallery">
        <a
          href={media[active].url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${media[active].caption} at full resolution in a new tab`}
        >
          <img
            src={media[active].url}
            alt={media[active].caption}
            loading="lazy"
          />
        </a>
        <figcaption>
          {media[active].caption} <span>Full resolution ↗</span>
        </figcaption>
      </figure>
    </section>
  );
}

function GuidedStory({ project }: { project: Project }) {
  const [active, setActive] = useState(0),
    step = project.steps[active];
  const attribution = project.slug === "linkedin-attribution-system";
  const campaign = project.slug === "flow-finance";
  return (
    <div className={campaign ? "guided campaign" : "guided"}>
      <p className="demo-label">
        {attribution
          ? "Illustrated workflow · fixed fictional data · no live integrations"
          : campaign
            ? "Campaign timeline · original photographs"
            : "Annotated product guide · original screenshots"}
      </p>
      <Choices
        labels={project.steps.map((s) => s.label)}
        value={active}
        onChange={setActive}
        label="Explore the workflow"
      />
      <div className="story-grid">
        <div className="story-copy" aria-live="polite">
          <p className="eyebrow">
            {campaign ? "Campaign moment" : "Workflow step"} {active + 1} /{" "}
            {project.steps.length}
          </p>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
          {attribution && (
            <div className="sample-card">
              <small>FICTIONAL EXAMPLE</small>
              <strong>
                {
                  [
                    "Avery · Fictional Labs",
                    "Account: Fictional Labs",
                    "Signal: implementation question",
                    "Suggested action: share a resource",
                  ][active]
                }
              </strong>
              <p>
                {
                  [
                    "“How would this work with our existing tools?”",
                    "Company and role context add meaning to the engagement.",
                    "Interest needs human qualification.",
                    "A recommendation for a sales team, not an automated message.",
                  ][active]
                }
              </p>
            </div>
          )}
          {campaign && active === 2 && (
            <div className="metrics">
              <div>
                <strong>1,200</strong>
                <span>reported impressions</span>
              </div>
              <div>
                <strong>+33%</strong>
                <span>reported increase in downloads</span>
              </div>
            </div>
          )}
        </div>
        <figure>
          <img
            src={project.media[step.media].url}
            alt={project.media[step.media].caption}
            loading="lazy"
          />
          <figcaption>{project.media[step.media].caption}</figcaption>
        </figure>
      </div>
    </div>
  );
}

function TweetTour() {
  const frame = useRef<HTMLIFrameElement>(null),
    [height, setHeight] = useState(2200);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (
        event.origin === location.origin &&
        event.source === frame.current?.contentWindow &&
        event.data?.type === "tweet-tour-height" &&
        Number.isFinite(event.data.height)
      )
        setHeight(Math.max(600, event.data.height + 12));
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);
  return (
    <iframe
      allowFullScreen
      ref={frame}
      className="tweet-frame"
      src="/media/tweet-index/tour.html"
      title="Tweet Index: six-chapter video tour, recorded search replay, and five-stage pipeline"
      style={{ height }}
      loading="lazy"
    />
  );
}

const modes = [
  [
    "Explain",
    "Semantic search represents a query and documents as numerical vectors. Nearby vectors suggest related meanings, so a saved post can match even when it uses different words.",
  ],
  [
    "Simplify",
    "Search for the idea you remember, even if you forgot the exact words.",
  ],
  [
    "Define",
    "Embedding: a list of numbers used to represent features of text. Semantic search: retrieval based on meaning rather than only exact word matches.",
  ],
  [
    "Key Takeaways",
    "1. Meaning can matter more than matching words.\n2. Embeddings help retrieve related text.\n3. A relevant-looking match still needs human judgment.",
  ],
];
function R2D2() {
  const [mode, setMode] = useState(0);
  return (
    <div className="learning-demo">
      <p className="demo-label">
        Recreated teaching interaction · fixed example answers · no model calls
      </p>
      <div className="reading-grid">
        <div className="reading-passage">
          <small>SELECTED PASSAGE · AUTHORED EXAMPLE</small>
          <blockquote>
            Semantic search retrieves documents by comparing embeddings that
            represent the meaning of a query and its candidate texts.
          </blockquote>
          <p>One passage. Four ways to understand it.</p>
        </div>
        <div className="assistant-panel">
          <Choices
            labels={modes.map((m) => m[0])}
            value={mode}
            onChange={setMode}
            label="Choose an explanation mode"
          />
          <div className="answer" aria-live="polite">
            <span className="eyebrow">{modes[mode][0]}</span>
            <p>{modes[mode][1]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const orbitSteps = ["Ingest", "Summarize", "Warmth", "Enrich", "Follow up"];
function Orbit() {
  const [step, setStep] = useState(0),
    [days, setDays] = useState(14),
    [reminder, setReminder] = useState(false);
  const warmth = Math.min(100, Math.round(30 * Math.max(0, 1 - days / 90)));
  return (
    <div className="orbit-demo">
      <p className="demo-label">
        Recreated workflow · fictional contact and conversation · browser-only
        state
      </p>
      <Choices
        labels={orbitSteps}
        value={step}
        onChange={setStep}
        label="Explore contact to follow-up"
      />
      <div className="orbit-grid">
        <aside>
          <div className="avatar" aria-hidden="true">
            JL
          </div>
          <h3>Jordan Lee</h3>
          <p>
            Product designer
            <br />
            Example Studio · fictional
          </p>
          <span className="pill">Sample contact</span>
        </aside>
        <div className="orbit-detail" aria-live="polite">
          {step === 0 && (
            <>
              <h3>Start with a contact.</h3>
              <p>
                The actual app can ingest Google contacts and people from email
                interactions. This example begins with Jordan and one fictional
                meeting.
              </p>
              <div className="sample-card">
                <small>MEETING · EXAMPLE</small>
                <strong>Discussed an onboarding research plan.</strong>
                <p>Agreed to exchange a draft before the next conversation.</p>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <h3>Keep the useful context.</h3>
              <p className="quote">
                “Discussed onboarding research. Next step: share the draft plan
                and ask for feedback.”
              </p>
              <p>
                This fixed summary illustrates the product’s conversation recap.
                In the real app, relevant interaction content is sent to OpenAI.
              </p>
            </>
          )}
          {step === 2 && (
            <>
              <h3>See how a signal cools.</h3>
              <label htmlFor="warmth-days">
                Days since one fictional meeting: <strong>{days}</strong>
              </label>
              <input
                id="warmth-days"
                type="range"
                min="0"
                max="100"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              />
              <div className="warmth">
                <strong>
                  {warmth}
                  <small>/100</small>
                </strong>
                <meter
                  min="0"
                  max="100"
                  value={warmth}
                  aria-label="Example warmth score"
                />
              </div>
              <p>
                Source formula: meeting weight 3 × 10 points × freshness.
                Freshness decreases linearly to zero over 90 days; all
                interaction scores are added together and capped at 100. This is
                a prioritization signal, not a measure of human closeness.
              </p>
            </>
          )}
          {step === 3 && (
            <>
              <h3>Add context, then verify it.</h3>
              <dl>
                <dt>Example role</dt>
                <dd>Product designer</dd>
                <dt>Example company</dt>
                <dd>Example Studio</dd>
              </dl>
              <p>
                These details are fictional. Real enrichment uses Exa and
                OpenAI; contact identifiers leave the device. Enriched
                information still needs review.
              </p>
            </>
          )}
          {step === 4 && (
            <>
              <h3>Turn context into a next step.</h3>
              <p>Example reminder: share the research draft with Jordan.</p>
              <button
                className="primary"
                onClick={() => setReminder(!reminder)}
              >
                {reminder ? "Remove example reminder" : "Add example reminder"}
              </button>
              <p role="status">
                {reminder
                  ? "Example reminder added for next week on this page only."
                  : "No reminder is scheduled outside this demonstration."}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Paper() {
  const [tab, setTab] = useState(0),
    [answer, setAnswer] = useState<number | null>(null);
  return (
    <div className="paper-demo">
      <p className="demo-label">
        Authored teaching example · illustrates the skill’s output patterns
      </p>
      <Choices
        labels={["Analogy", "Workflow", "Code", "Math → English"]}
        value={tab}
        onChange={setTab}
        label="Explore the example lesson"
      />
      <article className="lesson" aria-live="polite">
        <span className="eyebrow">Mini-lesson / weighted attention</span>
        {tab === 0 && (
          <>
            <h3>A reading group with different voices.</h3>
            <p>
              Imagine asking a question in a reading group. You listen more
              closely to the people whose notes are relevant. Attention
              similarly combines information with different weights. This
              analogy explains weighting, not every detail of a Transformer.
            </p>
          </>
        )}
        {tab === 1 && (
          <>
            <h3>Compare. Weight. Combine.</h3>
            <ol className="lesson-flow">
              <li>
                <b>Compare</b>
                <p>Compare a query to available keys.</p>
              </li>
              <li>
                <b>Weight</b>
                <p>Convert scores into weights that sum to one.</p>
              </li>
              <li>
                <b>Combine</b>
                <p>Use those weights to mix the values.</p>
              </li>
            </ol>
          </>
        )}
        {tab === 2 && (
          <>
            <h3>A tiny weighted combination.</h3>
            <pre>
              <code>
                {
                  "weights = [0.8, 0.2]\nvalues = [10, 30]\noutput = sum(w * v for w, v in zip(weights, values))\n# 14.0"
                }
              </code>
            </pre>
            <p>
              The first value contributes 8; the second contributes 6. Fixed
              illustrative code, not an executable model.
            </p>
          </>
        )}
        {tab === 3 && (
          <>
            <h3>What the numbers are saying.</h3>
            <p className="equation">0.8 × 10 + 0.2 × 30 = 14</p>
            <dl>
              <dt>0.8 and 0.2</dt>
              <dd>How much weight each value receives.</dd>
              <dt>10 and 30</dt>
              <dd>The example values being combined.</dd>
              <dt>14</dt>
              <dd>The resulting weighted combination.</dd>
            </dl>
          </>
        )}
      </article>
      <fieldset className="quiz">
        <legend>Check your understanding</legend>
        <p>
          A value gets a larger attention weight. What changes in this
          simplified example?
        </p>
        {[
          "It contributes more to the weighted combination.",
          "It becomes a verified fact.",
          "The other values are deleted.",
        ].map((a, i) => (
          <label key={a}>
            <input
              type="radio"
              name="quiz"
              checked={answer === i}
              onChange={() => setAnswer(i)}
            />
            <span>{a}</span>
          </label>
        ))}
        {answer !== null && (
          <p className="feedback" role="status">
            {answer === 0
              ? "Correct. A larger weight increases influence; it does not establish truth."
              : "Try again. Weight changes influence, not truth or whether a value exists."}
          </p>
        )}
        <button onClick={() => setAnswer(null)} disabled={answer === null}>
          Reset answer
        </button>
      </fieldset>
    </div>
  );
}

function CommandVoice() {
  const [step, setStep] = useState(0),
    [paste, setPaste] = useState(false);
  const labels = [
    "Hotkey",
    "Recording",
    "Transcription",
    paste ? "Clipboard + paste" : "Clipboard",
  ];
  return (
    <div className="voice-demo">
      <p className="demo-label">
        Illustrated Python core · fixed transcript · no microphone, hotkey, or
        clipboard access
      </p>
      <Choices
        labels={labels}
        value={step}
        onChange={setStep}
        label="Explore dictation stages"
      />
      <div className="voice-screen" aria-live="polite">
        <small>COMMANDVOICE / WORKFLOW ILLUSTRATION</small>
        {step === 0 ? (
          <>
            <div className="keys">
              <kbd>Ctrl</kbd>
              <span>+</span>
              <kbd>R</kbd>
            </div>
            <h3>A shortcut starts the desktop recorder.</h3>
            <p>
              Default stop shortcut: Ctrl + Shift + R. This webpage does not
              register either shortcut.
            </p>
          </>
        ) : step === 1 ? (
          <>
            <div className="wave" aria-hidden="true">
              ▂ ▄ ▆ █ ▃ ▅ ▇ ▄ ▂ ▆ ▃
            </div>
            <h3>Capture a thought.</h3>
            <p>
              Illustration only. The desktop core records microphone audio until
              its stop hotkey is pressed.
            </p>
          </>
        ) : step === 2 ? (
          <>
            <span className="pill">faster-whisper · local inference</span>
            <h3>Turn the audio into text.</h3>
            <blockquote>
              Let’s send the revised product brief tomorrow.
            </blockquote>
            <p>
              Fixed example transcript. Automatic model selection depends on
              available hardware.
            </p>
          </>
        ) : (
          <>
            <h3>
              {paste
                ? "Copy, then paste into the active window."
                : "Deliver text to the clipboard."}
            </h3>
            <div className="sample-card">
              Let’s send the revised product brief tomorrow.
            </div>
            <p>
              {paste
                ? "The desktop core can synthesize a paste after copying. This preview only displays the destination text."
                : "The actual core copies the transcript. This preview leaves your clipboard unchanged."}
            </p>
          </>
        )}
      </div>
      <div className="demo-actions">
        <label>
          <input
            type="checkbox"
            checked={paste}
            onChange={(e) => setPaste(e.target.checked)}
          />{" "}
          Illustrate optional paste
        </label>
        <button className="primary" onClick={() => setStep((step + 1) % 4)}>
          {step === 3 ? "Restart illustration" : "Next stage →"}
        </button>
      </div>
    </div>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const index = projects.findIndex((p) => p.slug === project.slug),
    next = projects[(index + 1) % projects.length],
    prev = projects[(index + projects.length - 1) % projects.length];
  const demos: Record<string, React.ReactNode> = {
    "tweet-index": <TweetTour />,
    r2d2: <R2D2 />,
    "orbit-prm": <Orbit />,
    "ai-paper-skill": <Paper />,
    commandvoice: <CommandVoice />,
  };
  return (
    <div
      className="case-page"
      style={{ "--accent": project.accent } as CSSProperties}
    >
      <a className="skip-link" href="#case-main">
        Skip to content
      </a>
      <nav className="case-nav">
        <a href="/" className="wordmark">
          NACHIKETH RAMESH
        </a>
        <a href="/#portfolio">← Back to Portfolio</a>
      </nav>
      <main id="case-main" className="case-main">
        <header className="case-hero">
          <div className="hero-meta">
            <span className="eyebrow">
              Selected work / {String(index + 1).padStart(2, "0")}
            </span>
            <span className="pill">{project.status}</span>
          </div>
          <h1>{project.title}</h1>
          <p className="case-deck">{project.summary}</p>
          <div className="hero-bottom">
            <p>
              <span className="eyebrow">My role</span>
              {project.role}
            </p>
            <div className="project-links">
              <a className="primary" href="#explore">
                Explore the story ↓
              </a>
              {project.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </header>
        <section className="case-section context">
          <div>
            <p className="eyebrow">01 / The context</p>
            <h2>
              {project.slug === "flow-finance"
                ? "A campaign with a clear role."
                : "A problem worth exploring."}
            </h2>
          </div>
          <div>
            <p className="lead">{project.problem}</p>
            <p>{project.description}</p>
          </div>
        </section>
        <section className="case-section" id="explore">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / Inside the project</p>
              <h2>
                {project.slug === "flow-finance"
                  ? "Follow the campaign."
                  : "See how it works."}
              </h2>
            </div>
            <p>
              Choose a step, inspect the details, and explore the thinking
              behind the experience.
            </p>
          </div>
          {demos[project.slug] ?? <GuidedStory project={project} />}
        </section>
        <Gallery project={project} />
        <section className="case-section context">
          <div>
            <p className="eyebrow">03 / Decisions & evidence</p>
            <h2>
              {project.slug === "flow-finance"
                ? "Contribution & results."
                : "Behind the experience."}
            </h2>
          </div>
          <div>
            <h3>
              {project.slug === "flow-finance"
                ? "My contribution"
                : "Approach & boundaries"}
            </h3>
            <p>{project.approach}</p>
            <div className="tags">
              {project.technology.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {project.skills.length > 0 && (
              <>
                <h3>Skills in practice</h3>
                <div className="tags">
                  {project.skills.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </>
            )}
            <h3>What the evidence shows</h3>
            <p>{project.outcome}</p>
            <details className="source-details">
              <summary>Sources & attribution</summary>
              <p>
                Reviewed against the linked public sources and supplied assets.
                Demonstrations on this page use fixed example content unless
                labeled as an original recording or screenshot.
              </p>
              <ul>
                {[...project.links, ...project.sources].map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noreferrer">
                      {l.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </section>
        <nav className="project-pagination" aria-label="More projects">
          <a href={path(prev)}>
            <small>← Previous project</small>
            <strong>{prev.title}</strong>
          </a>
          <a href={path(next)}>
            <small>Next project →</small>
            <strong>{next.title}</strong>
          </a>
        </nav>
      </main>
      <footer className="case-footer">
        <a href="/#portfolio">All projects</a>
        <span>Nachiketh Ramesh</span>
      </footer>
    </div>
  );
}

export function NotFound() {
  return (
    <main className="case-main case-page">
      <h1>Project not found.</h1>
      <p>Explore the current collection of projects.</p>
      <a href="/#portfolio">Back to Portfolio →</a>
    </main>
  );
}
