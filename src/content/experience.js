// Experience, newest first. Order in this file doesn't matter except for ties.
//
//   slug     unique id, used in URLs and asset folders
//   chapter  heading; entries with the same chapter are grouped
//   start    "YYYY-MM"
//   end      "YYYY-MM", or null if current
//   domain   optional tag, e.g. "Finance"
//   why      the one line shown under the heading
//   bullets  shown under Details
//   stack    shown under Details
//   photos   [{ src, alt, caption? }] in public/imgs/experience/<slug>/ (.jpg, .png, .webp)
//   files    [{ label, href }] in public/files/experience/<slug>/
//   story    null, or blocks ({ type: "heading" | "text" | "image", ... }) for /experience/<slug>
//   hidden   true to keep an entry here without showing it

export const experience = [
  {
    slug: "pgim",
    chapter: "Production at enterprise scale",
    org: "Prudential PGIM Technology",
    role: "Software Engineer Intern",
    start: "2026-06",
    end: "2026-08",
    domain: "Finance",
    why: "In regulated finance, production infrastructure has to be secure, repeatable, and simple enough that the next team can trust it.",
    // Resume figures left out until cleared for public use.
    bullets: [
      "Developed reusable Terraform modules for AWS Lambda, S3, and KMS to migrate off CloudFormation under enterprise infrastructure-as-code standards spanning multiple business units, cutting build time and infrastructure code for pilot applications.",
      "Automated reporting on monthly AWS spend with a React and FastAPI dashboard on S3, replacing a manual process.",
      "Led a team of five engineers to second place in PGIM's internal hackathon with an AI-powered Confluence pipeline that detects stale pages, suggests updates, and notifies reviewers, improving the documentation Copilot and Claude MCP rely on.",
    ],
    stack: ["Terraform", "AWS", "CloudFormation", "React", "FastAPI"],
    photos: [],
    files: [],
    story: null,
  },
  {
    slug: "lijing-wang-lab",
    chapter: "From hypothesis to evidence",
    org: "Lijing Wang Lab, NJIT",
    role: "Undergraduate Research Assistant",
    start: "2026-01",
    end: "2026-06",
    why: "Turning a professor's hypothesis into code means building experiments clean enough that every answer holds up.",
    bullets: [
      "Turned a professor's research hypothesis on gradient cancellation into a modular Python framework for rapid iteration, executing 250+ controlled fine-tuning runs across 4 language and vision models on an A100 GPU cluster (6,000+ GPU service units).",
      "Audited Hugging Face and PyTorch internals to remove hidden global seed state, building custom seed modules and checkpoints so each source of randomness could be tested in isolation, preventing invalidation of 400+ planned runs.",
      "Built Python and Jupyter analysis scripts that turn raw fine-tuning output into structured results reports and visualizations, enabling faster faculty review of experiment outcomes.",
    ],
    stack: ["PyTorch", "Hugging Face Transformers", "SLURM", "Jupyter"],
    photos: [],
    files: [],
    story: null,
  },
  {
    slug: "ai-imaging-medicine-lab",
    chapter: "Reliable Clinical AI",
    org: "AI Imaging Medicine Lab, NJIT",
    role: "Applied AI Research Engineer Intern",
    start: "2026-01",
    end: "2026-06",
    domain: "Healthcare",
    why: "A model that reasons like a radiologist still needs tests that prove it before any surgeon sees its output.",
    bullets: [
      "Ported a neurosurgical PyQt application to Linux HPC and built an automated QA harness over 100 natural-language prompt suites, capturing UI screenshots and telemetry to isolate failures, driving fixes that raised pass rates from 20% to 100%.",
      "Designed a LangChain workflow that breaks one-shot tumor diagnosis into a 5-step radiologist-style reasoning chain (e.g., symmetry, lesion location), each a dedicated model call on BraTS MRI data, delivering a prototype to inform the lab's system design.",
    ],
    stack: ["Python", "LangChain", "PyQt", "Linux", "HPC"],
    photos: [],
    files: [],
    story: null,
  },
  {
    slug: "lijing-wang-lab-forecasting",
    chapter: "Engineering for research",
    org: "Lijing Wang Lab, NJIT",
    role: "Deep Learning Research Intern",
    start: "2025-08",
    end: "2026-01",
    domain: "Public health",
    why: "Nobody handed me research experience, so I found my first lab and learned research code needs real engineering discipline.",
    bullets: [
      "Parallelized independent forecasting workloads across CPU cores with joblib, cutting experiment runtime by ~80% and enabling faster iteration without HPC resources.",
      "Engineered modular Python preprocessing (NumPy, pandas) to clean, trim, and interpolate 10+ multi-location epidemic datasets (~900 weekly observations each), producing consistent train/test splits for rolling-origin forecasting across 5 diseases.",
    ],
    stack: ["Python", "NumPy", "pandas", "joblib"],
    photos: [],
    files: [],
    story: null,
  },
];
