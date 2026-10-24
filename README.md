# TestStep Academy

Study material for Tricentis Tosca in one small website:

- **Home** shows your progress, the next lesson to open, how to use the site
  and the whole learning path in six phases.
- **Syllabus** covers Tosca from scratch in 62 lessons, grouped into 26 modules:
  from an introduction and the workspace, through Modules, TestCases, dynamic
  expressions, test data, technology engines, API testing and execution, to
  administration, integrations, AI in Tosca, best practices, debugging,
  exploratory testing, performance and data testing, and upgrades. Every lesson
  has formal definitions of its key terms, the
  same idea in simple words, an explanation, a diagram, a worked example, key
  points, a common mistake and links to the Tricentis manual.
- **Interview preparation** holds the scenario-based interview questions, each
  with a step-by-step approach, the exact syntax, a short answer and its source.
- **Mock interview** is a practice interview: an AI interviewer reads questions
  aloud, you answer by speaking or typing, and every answer gets a score out of
  10 with what was good, what to improve and a stronger answer. It ends with a
  scorecard and the lessons to revise. It needs your own Anthropic API key (see
  "Mock interview" below).
- **Cheat sheet** lists the expressions and settings you type most often.
- **Glossary** explains Tosca terms from A to Z.

There is no database and no backend. The site is plain HTML, CSS and JavaScript.
The interview questions live in `questions.json`, and the syllabus, cheat sheet
and glossary in `study.json`.

## Files

| File | Purpose |
| --- | --- |
| `index.html`, `style.css` | The page and its styles |
| `theme.js` | Sets the light or dark theme before the page is drawn |
| `script.js` | The Interview preparation page |
| `site.js` | Navigation, Home, Syllabus, lessons, Cheat sheet and Glossary |
| `mock.js` | The Mock interview page |
| `config.js` | The Worker address and Google client ID the Mock interview uses |
| `worker/` | The Cloudflare Worker that rates answers with the site's Anthropic key (see "Mock interview server") |
| `vendor/motion.js` | Animation library (see "Design and animation") |
| `questions.json` | All interview questions |
| `study.json` | Modules, lessons, cheat sheet and glossary. Edited by hand |
| `questions.js`, `study.js` | Generated copies of the two `.json` files (see "Opening the site" below) |
| `fetch_questions.py` | Collects new questions from YouTube and web pages |
| `urls.txt` | Your list of public blog and forum pages to read |
| `requirements.txt`, `.env.example` | Setup for the script |
| `tests/`, `playwright.config.js`, `package.json` | Automated checks for errors and broken links (see "Testing") |
| `.github/workflows/site-tests.yml` | Runs those checks on GitHub |

## Opening the site

Double-click `index.html`. That is all.

One detail: browsers do not let a page opened from disk (`file://`) read a JSON
file. So the site tries `questions.json` and `study.json` first and, when the
browser blocks that, loads `questions.js` and `study.js`, which hold the same
data. On GitHub Pages or any web server, the `.json` files are read directly.

`fetch_questions.py` rewrites `questions.js` every time it changes
`questions.json`. If you edit `questions.json` or `study.json` by hand, refresh
the copies with:

```bash
python fetch_questions.py --sync
```

To preview the site through a local server instead:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Using the site

The menu at the top switches between the pages. Each page has its own address
(for example `index.html#/syllabus`), so you can bookmark or share it.

- **Syllabus**: hover over it (or move to it with the Tab key) to see every
  lesson, and click one to open it. On a phone, the menu button opens the
  navigation and Syllabus leads to the full list of lessons.
- **A lesson** ends with a button to the interview questions on the same topic,
  "Mark as done", and Previous/Next. Lessons you mark as done are ticked in the
  menu and counted on the Home page.
- **Interview preparation**: search filters as you type (press `/` to jump to
  the search box). Topic and Difficulty narrow the list, and Bookmarked only
  shows saved questions. Click a card to see the approach, the syntax, the
  mistake to avoid, the short answer and the source. Expand all opens every
  question in the current list.
- **Cheat sheet** and **Glossary** each have a search box. Every syntax entry
  has a Copy button.
- Progress, bookmarks and the dark-mode choice are saved in your browser. No login.

## Mock interview

Visitors sign in with Google and answer by voice or by typing; no API key is
needed. Only the emails on the Worker's list can use it for now.

- **What you need:** Chrome, Edge or Safari for voice answers (other browsers
  can type), a microphone, and optionally a camera.
- **How it works:** questions come from `questions.json`, filtered by the topic
  and level you choose. The browser reads each question aloud with its own
  voices and turns your spoken answer into text with its own speech service.
  The text of your answer, the question and its reference answer go to the
  site's Worker, which asks Claude for a score for correct facts, approach,
  structure and Tosca terms. With follow-ups on, Claude may ask one follow-up
  question about an answer; it takes the place of the last question not asked
  yet, so the length stays as chosen. At the end, one more request writes the
  summary on the scorecard.
- **Camera:** the live screen looks like a video call: the interviewer on one
  side, your own camera on the other. The picture is shown on the page only. It
  is never recorded, saved or sent anywhere, and you can turn it off on the
  setup page or during the interview.
- **Sign-in and limits:** Google signs you in; the Worker checks that sign-in,
  lets in only the emails on its list and keeps you signed in on that browser
  for a week. Each person gets 5 interviews a day (reset at midnight, India
  time) and up to 15 rated answers per interview.
- **Kept in your browser:** your settings, your sign-in token and a short list
  of past interviews. Recordings of your voice and camera are not kept.

Until `config.js` holds the Worker address and the Google client ID, the page
says the mock interview is not open yet.

## Mock interview server

The Anthropic key lives in a small [Cloudflare Worker](https://developers.cloudflare.com/workers/)
in `worker/`, never in this repository or in the page. A free Cloudflare
account is enough. You need [Node.js](https://nodejs.org) 18 or newer.

### 1. Create the Google client ID

1. In [Google Cloud Console](https://console.cloud.google.com/), create a
   project (or pick one). Under **Google Auth Platform > Branding**, give it the
   app name "TestStep Academy" and your support email. The default scopes
   (email, profile, openid) are all it needs. Under **Audience**, either publish
   the app or add your Google email as a test user, or Google will refuse the
   sign-in.
2. Under **Google Auth Platform > Clients**, choose **Create client**, with
   application type **Web application**.
3. Under **Authorized JavaScript origins**, add `https://abhi23raj472.github.io`
   and, for testing on your computer, `http://localhost`,
   `http://localhost:4173` and `http://127.0.0.1:4173`. No redirect URI is
   needed.
4. Copy the client ID (it ends in `.apps.googleusercontent.com`).

### 2. Set up and deploy the Worker

```bash
cd worker
npx wrangler login
npx wrangler kv namespace create USAGE
```

Put the `id` that the last command prints into `wrangler.toml`, in place of
`REPLACE_WITH_YOUR_KV_NAMESPACE_ID`, and put the Google client ID into
`GOOGLE_CLIENT_ID` there. Then store the three secrets (each command asks for
the value, which is never written to a file):

```bash
npx wrangler secret put ANTHROPIC_API_KEY   # your Anthropic key
npx wrangler secret put SESSION_SECRET      # a long random string, at least 32 characters
npx wrangler secret put ALLOWED_EMAILS      # your Google email; several are separated by commas
npx wrangler deploy
```

`deploy` prints the Worker's address, for example
`https://teststep-academy-api.your-name.workers.dev`. For a random secret,
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
prints one.

### 3. Point the site at it

In `config.js`, set `apiBase` to the Worker's address and `googleClientId` to
the client ID, then commit and push. The page may only call addresses ending in
`.workers.dev` (see "Security"); if you later give the Worker its own domain,
add that domain to `connect-src` in `index.html` and to `ALLOWED_ORIGINS` in
`wrangler.toml`.

### Changing who can use it, and the limits

- **Who:** run `npx wrangler secret put ALLOWED_EMAILS` again with the new list.
  Removing an email locks that person out at once.
- **Limits:** `DAILY_INTERVIEWS`, `CALLS_PER_INTERVIEW` and `ALLOWED_MODELS` in
  `wrangler.toml`, then `npx wrangler deploy`.
- **Cost:** each rated answer is one request to Anthropic and each scorecard one
  more, billed to your key. Set a monthly spend limit in the Anthropic Console
  as a safety net.

The Worker has its own tests: `cd worker && npm test`.

## Design and animation

The look is called "Soft clay". It mixes two styles:

- **Neumorphism** for structure. Panels, cards, the menu bar and the sidebars
  are made of the page's own colour and seem raised out of it (a light shadow
  at the top left, a darker one at the bottom right). Search fields, progress
  tracks, code snippets and the selected menu item are pressed into the page
  with the same shadows on the inside.
- **Claymorphism** for anything to act on or notice. Buttons, module numbers,
  phase labels, the "In simple words" box, key-point ticks, the common mistake
  and the short interview answer are puffy pastel shapes with a soft coloured
  shadow and an inner highlight.

The 26 modules are grouped into six phases, and each phase has its own clay
colour (sky, lilac, mint, peach, lemon and pink) that carries through the Home
page, the Syllabus, the menu and the lesson pages. The phases are defined in
`study.json` (see "Editing the study content"). The main action colour is
indigo, and every pastel shape uses dark text on a light colour, so text keeps
a high contrast in both themes. The dark theme uses the same shapes on a
charcoal surface. Text is set in Nunito and Tosca expressions such as
`{B[Name]}` in JetBrains Mono; both come from Google Fonts, and the page falls
back to system fonts when offline.

The diagrams in the lessons are drawn from the lesson data with HTML and CSS,
so they follow the light and the dark theme. Lessons and the interview page
have a sidebar next to the content; it moves out of the way on tablets and
phones.

Animation is kept to what helps: a question opening and closing, the progress
bar and a short fade between pages. It uses [Motion](https://motion.dev), the
library behind Framer Motion.
`vendor/motion.js` is the plain-JavaScript build that ships inside the
`framer-motion` package (version 13.4.4, file `dist/dom.js`, MIT licence in
`vendor/motion-LICENSE.md`), so no React and no build step are needed. To update
it, install a newer `framer-motion` and copy that file again.

The page still works if `vendor/motion.js` is missing, only without animation,
and animation is switched off for visitors whose system asks for reduced motion.

## Testing

Automated [Playwright](https://playwright.dev) tests check that the site has
no errors and no broken links:

- `tests/pages.spec.js` opens every page, every lesson and the theme switch. A
  test fails on a script error, a console error (which includes a blocked
  inline style or script), or a file of the site that does not load. It also
  checks every link inside the site: each lesson, page, interview topic and
  `#id` it points to must exist.
- `tests/mock.spec.js` runs a whole mock interview with typed answers: Google
  sign-in, rating, a follow-up, a skipped question, the scorecard, the daily
  limit, an account not on the list, and the camera (with the browser's fake
  camera). The tests answer for Google and the Worker themselves, so they need
  no key and cost nothing.
- `tests/mock-worker.spec.js` runs the page against the real Worker code, with
  only Google and Anthropic faked, so the two are known to work together.
- `worker/test/` checks the Worker on its own: Google token checks, the email
  list, sessions, the limits, and that only the interview's requests reach
  Anthropic.
- `tests/links.spec.js` checks every link to another website, one test per
  address: the Tricentis manual pages, the YouTube videos and Google Fonts. A
  link fails when it answers with an error or shows a "not found" page.
  YouTube videos are checked through YouTube's oEmbed address, because a
  deleted video's page still loads.

To run them you need [Node.js](https://nodejs.org) 18 or newer:

```bash
npm install
npx playwright install chromium
npm test
```

`npm run test:pages` runs only the page checks, and `npm run test:links` only
the website links. Without internet, skip the website links with
`SKIP_EXTERNAL=1 npm test` (in PowerShell: `$env:SKIP_EXTERNAL=1; npm test`).
The tests start their own small server (`tests/serve.js`), so nothing else
needs to be running.

On GitHub, the "Site tests" workflow runs everything on each push to `main`,
on each pull request and every Monday, so a manual page that moves is noticed
even when nothing in the site changed. When a run fails, its Playwright report
is attached to the run.

## Security

- The page carries a Content-Security-Policy: only this site's own script files
  may run, plus Google's sign-in script; styles and fonts may come only from
  this site, Google Fonts and Google sign-in; and the page may send data only to
  this site, Google sign-in and, for the mock interview, the Worker on
  `*.workers.dev`.
  For that reason the page has no inline scripts, inline event handlers or
  `style` attributes; keep it that way when you edit `index.html`.
- All text from `questions.json` and `study.json` is inserted as text, never as
  HTML, and a link is only created for `http` and `https` addresses.
- `fetch_questions.py` reads only public internet addresses. It refuses
  localhost and local-network addresses, checks every redirect in the same way,
  and reads at most 5 MB of a page.
- API keys belong in `.env`, which is listed in `.gitignore`. The Anthropic key
  for the mock interview is a Worker secret; the page never sees it.
- The Worker checks every Google sign-in against Google's keys and your client
  ID, accepts only the emails on its list, answers only this site's addresses,
  passes on only the fields the interview uses (no other models, no server
  tools, capped length), and limits interviews per person and day.

## Editing the study content

`study.json` has five parts: `units`, `phases`, `lessons`, `cheatsheet` and
`glossary`. The site shows each entry of `units` as a module (Module 1 to
Module 26), and a lesson's `unit` field holds the number of its module.

`phases` groups the modules for the Home page and the Syllabus, and gives each
group its colour:

```json
{ "title": "Foundations", "from": 1, "to": 3, "tone": "sky",
  "text": "What Tosca is, the workspace, and how its sections fit together." }
```

`from` and `to` are module numbers, and `tone` is one of `sky`, `lilac`, `mint`,
`peach`, `lemon` or `pink`. Without `phases`, all modules are shown as one group.

Lessons appear, and Previous/Next moves through them, in the order of the
`lessons` list, so keep that list sorted by module. A lesson looks like this:

```json
{
  "id": "buffers",
  "unit": 4,
  "title": "Buffers",
  "definitions": [
    { "term": "Buffer", "text": "A precise, one-sentence definition of the term." }
  ],
  "simple": "One or two sentences in everyday words.",
  "body": ["A paragraph.", "Another paragraph."],
  "graphics": [
    { "type": "flow", "title": "The life of a Buffer",
      "steps": [{ "label": "Store", "text": "..." }, { "label": "Use", "text": "..." }] }
  ],
  "example": {
    "title": "Storing and reading",
    "intro": "A sentence that sets the scene.",
    "grid": { "columns": ["TestStepValue", "Value", "ActionMode"], "rows": [["Order number", "OrderNo", "Buffer"]] },
    "code": [{ "label": "Where it goes", "code": "{B[OrderNo]}" }],
    "outcome": "What happens."
  },
  "points": ["A key point."],
  "mistake": "A common mistake.",
  "docs": [{ "title": "Manual page", "url": "https://..." }],
  "questions": "Buffers and parameterisation"
}
```

- `definitions` lists the key terms of the lesson, each with a formal
  definition. They are shown first on the lesson page, and the syllabus search
  covers them. `simple` says the same idea in everyday language.
- `graphics` is a list of diagrams. The types are `flow` (numbered steps
  joined by a track), `tree` (a root with children), `compare` (columns side by side),
  `stack` (a ranked list) and `grid` (a table).
- An `example` can have a `grid`, a list of `code` snippets, or both.
- `questions` names a topic from `questions.json`. The lesson then shows a
  button to those interview questions. Use `null` for none.
- A `cheatsheet` group has a `title`, `items` (each a pair of code and meaning)
  and optional `docs`. A `glossary` entry has `term`, `simple`, `detail` and `topic`.

After editing, run `python fetch_questions.py --sync`.

## Adding questions by hand

Add an entry to `questions.json` with the next free `id`:

```json
{
  "id": 21,
  "question": "The scenario and what is asked",
  "approach": ["Step 1", "Step 2", "Common mistake: ..."],
  "syntax": [
    { "label": "Message control, ActionMode Verify", "code": "Order {XB[OrderNo]} created" }
  ],
  "answer": "A 2-3 sentence summary.",
  "topic": "TBox",
  "difficulty": "Intermediate",
  "source": { "title": "Video or article title", "url": "https://..." }
}
```

`topic` should be one of: Module scanning (XScan), TestCase design,
Test data (TDM/TDS), API testing, Execution lists and DEX, Recovery and cleanup
scenarios, TBox, Steering dynamic controls, Buffers and parameterisation,
CI/CD integration, SAP testing, Multi-user workspaces, Reporting.
`difficulty` is Beginner, Intermediate or Advanced.

`syntax` is optional. Use it for the exact text a tester types: a Tosca
expression, a property check, a steering parameter, a command or an SQL query.
Each item has a `label` (where it goes) and the `code`, plus an optional `note`
for a caveat that is shown under the code. The page shows these in a "Syntax"
block with a copy button, and search covers them too. Leave the field out when
a solution has no fixed syntax.

`docs` is optional as well: a list of `{ "title": ..., "url": ... }` entries
for the Tricentis manual pages the syntax was checked against. They appear as
"Checked against" links under the Syntax block. Then run
`python fetch_questions.py --sync`.

## Collecting questions with the script

### 1. Install

Python 3.10 or newer.

```bash
pip install -r requirements.txt
```

### 2. Get the two API keys

**YouTube Data API v3** (free, 10,000 quota units a day; one search costs 100):

1. Go to https://console.cloud.google.com/ and create a project.
2. Open "APIs & Services" > "Library", find **YouTube Data API v3** and enable it.
3. Open "APIs & Services" > "Credentials" > "Create credentials" > "API key".
4. Recommended: edit the key and restrict it to the YouTube Data API v3.

**Anthropic API** (paid per use):

1. Go to https://console.anthropic.com/ and create an API key.
2. Add credit under Billing.

### 3. Store the keys

Copy `.env.example` to `.env` and fill in both keys. `.env` is listed in
`.gitignore`, so it is not committed. Never put keys in `script.js` or any file
that is published.

```bash
cp .env.example .env
```

### 4. List your pages

Put one public URL per line in `urls.txt`. Lines starting with `#` are ignored.

### 5. Run

```bash
python fetch_questions.py
```

Useful options:

| Command | What it does |
| --- | --- |
| `python fetch_questions.py --dry-run` | Shows what would be added, writes nothing |
| `python fetch_questions.py --skip-youtube` | Only reads the pages in `urls.txt` |
| `python fetch_questions.py --skip-urls` | Only searches YouTube |
| `python fetch_questions.py --query "Tosca SAP scenario questions" --max-videos 5` | Your own search term (repeatable) |
| `python fetch_questions.py --reprocess` | Analyses sources again that an earlier run already covered |
| `python fetch_questions.py --sync` | Only rebuilds `questions.js` |

What the script does on each run:

1. Searches YouTube through the official Data API and fetches each video's transcript.
2. Reads each page in `urls.txt`. It checks `robots.txt` first and skips pages that
   are disallowed, return a login page, or redirect to a sign-in.
3. Sends each transcript or page to Claude, which keeps only scenario questions
   (no "What is Tosca?" definitions) and writes the approach and answer in its
   own words.
4. Skips questions already in `questions.json` (exact or near-identical wording),
   appends the new ones with their source link, and updates `questions.js`.

Sources it has analysed are remembered in `.processed_sources.json`, so a second
run does not pay to analyse them again.

### Things to know

- **Transcripts.** The official YouTube API can search and return titles, but it
  only lets a video's owner download captions. The script therefore uses the
  open-source `youtube-transcript-api` package for transcripts. It is unofficial,
  can stop working when YouTube changes, and YouTube may block it from some
  networks. Videos without captions are skipped.
- **Cost.** Each source is one Claude request. The model is `claude-opus-5-5` by
  default. To use a cheaper one, set `ANTHROPIC_MODEL` in `.env`, for example
  `ANTHROPIC_MODEL=claude-haiku-5-5`. Start with `--max-videos 3 --dry-run` to see
  the output before a full run.
- **Review before publishing.** The answers are written by a model from other
  people's material. Read the new entries, fix or delete anything wrong, and
  keep the source links.

## Hosting on GitHub Pages

1. Create a new public repository on GitHub, for example `teststep-academy`.
2. From this folder:

   ```bash
   git init
   git add index.html style.css theme.js script.js site.js vendor questions.json questions.js study.json study.js README.md fetch_questions.py requirements.txt urls.txt .env.example .gitignore
   git commit -m "TestStep Academy"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/teststep-academy.git
   git push -u origin main
   ```

3. On GitHub, open the repository's **Settings > Pages**. Under "Build and
   deployment", choose **Deploy from a branch**, branch **main**, folder **/ (root)**,
   and save.
4. After a minute the site is live at
   `https://YOUR-USERNAME.github.io/teststep-academy/`.

To publish new questions later: run the script, review `questions.json`, then
commit and push `questions.json` and `questions.js`. After editing lessons,
commit and push `study.json` and `study.js`.

Before the first commit, check that `git status` does not list `.env`.

## Note on the content

The lessons, cheat sheet and glossary are study notes written in simple words.
They were checked against the Tricentis manual pages they link to, but menu
names and options differ between Tosca versions, so check them for the version
you use. The first 20 interview questions were written as study notes and link
to the Tricentis documentation home page, not to a specific article.
This project is not affiliated with Tricentis.
