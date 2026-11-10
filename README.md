# TestStep Academy 🎓

> The open-source interactive learning platform for Tricentis Tosca automation engineers.

[![Deploy](https://github.com/Abhi23raj472/teststep-academy/actions/workflows/deploy.yml/badge.svg)](https://github.com/Abhi23raj472/teststep-academy/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Live site:** https://abhi23raj472.github.io/teststep-academy/

---

## What is TestStep Academy?

TestStep Academy is a free, open-source learning platform built by and for QA engineers preparing for **Tricentis Tosca certifications** (AS1, AS2, AE1, AE2, TDS1/2, TQL) and senior automation interviews.

### Core Modules

| Module | What you get |
|---|---|
| **📚 Learn** | 62 lessons across 26 modules and 6 phases — from workspace basics to advanced TQL, DEX, and CI/CD. Progress tracker included. |
| **🎯 Interview Prep** | 88 scenario-based questions with step-by-step expert answers, topic/difficulty filters, and flashcard mode. |
| **🧪 Mock Lab** | A live sandbox with dynamic tables, AJAX delays, modals, iFrame simulation, file upload, and a TDS record lifecycle demo — all annotated with XScan tips. |
| **📋 Cheatsheet** | Searchable TQL reference, steering parameters, TBox modules, and CI/CD commands. Plus a full 142-term glossary. |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Static Export)
- **Styling:** Tailwind CSS v4 + custom CSS tokens (glassmorphic dark theme)
- **Icons:** Lucide React
- **State:** Zustand + React `useState`
- **Data:** Plain JSON (`data/questions.json`, `data/study.json`)
- **Deployment:** GitHub Pages via GitHub Actions

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Abhi23raj472/teststep-academy.git
cd teststep-academy

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Preview production build
npm run start
```

**Requirements:** Node.js 20+, npm 10+

---

## Project Structure

```
teststep-academy/
├── app/
│   ├── layout.tsx          # Root layout (Navbar, Footer)
│   ├── page.tsx            # Home / landing page
│   ├── learn/page.tsx      # Structured learning path
│   ├── interview/page.tsx  # Interview companion
│   ├── lab/page.tsx        # Interactive Mock Lab
│   └── cheatsheet/page.tsx # TQL cheatsheet + glossary
├── components/
│   ├── ui/
│   │   └── Navbar.tsx      # Sticky nav with mobile menu
│   ├── interview/
│   │   └── InterviewClient.tsx  # Q&A list + flashcard mode
│   ├── lab/
│   │   └── LabClient.tsx   # All mock lab scenarios
│   └── learn/
│       ├── LearnClient.tsx       # Lessons + progress tracker
│       └── CheatsheetClient.tsx  # TQL cheatsheet + glossary
├── data/
│   ├── questions.json      # 88 interview questions
│   └── study.json          # 62 lessons, cheatsheet, glossary
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages CI/CD
└── next.config.ts          # Static export + basePath config
```

---

## Certification Coverage

| Cert | Topics covered |
|---|---|
| **AS1** | Workspace, Modules, TestCases, Sheets, Buffers, Loops, IF/Else |
| **AS2** | Advanced XScan, Steering Parameters, Dynamic Controls, Recovery |
| **AE1** | Custom Controls, Engines, Advanced TQL, TBox Automation Tools |
| **AE2** | Architecture deep-dive, multi-workspace, CI/CD pipelines |
| **TDS1/2** | TDM/TDS lifecycle, record locking, parallel execution |
| **TQL** | SUBPARTS, SUPERPARTS, filters, attribute selectors, execution |

---

## Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create a branch:** `git checkout -b feat/your-feature`
3. **Make your changes** — especially to `data/questions.json` or `data/study.json` to improve content
4. **Test locally:** `npm run dev`
5. **Open a PR** with a clear description of what you added or fixed

### Ways to contribute

- Add or improve interview questions (`data/questions.json`)
- Add lessons or improve existing ones (`data/study.json`)
- Add new lab scenarios in `components/lab/LabClient.tsx`
- Improve the UI or fix accessibility issues
- Translate content to other languages

---

## Roadmap

- [ ] AI Mock Interview mode (bring your own Anthropic API key)
- [ ] API Practice Sandbox (mock REST/SOAP endpoints)
- [ ] DEX execution visualiser
- [ ] User accounts + cloud-synced progress (Supabase)
- [ ] Mobile app (React Native / Expo)
- [ ] Video lessons integration

---

## License

MIT © [Abhishek Kumar](https://abhi23raj472.github.io/Abhishek-Kumar/)

---

*Built for the Tosca automation community. Not affiliated with Tricentis.*
