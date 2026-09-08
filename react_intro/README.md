# react_intro

React Intro project — `alu-web_react` repository, `react_intro` directory.

A series of tasks building a "School dashboard" React app, starting from
`create-react-app`, progressively adding logic, tests, and a deployment
pipeline, then finishing with a hand-rolled Webpack + Babel build.

## Contents

| Task | Folder | What it covers |
|------|--------|-----------------|
| 0 | `task_0/dashboard` | Basic CRA app: header/body/footer, logo, favicon |
| 1 | `task_1/dashboard` | `utils.js` helpers, `Notifications` component |
| 2 | `task_2/dashboard` | Login form (email/password/OK), Notifications list + close button |
| 3 | `task_3/dashboard` | Jest + Enzyme unit tests (`utils`, `App`, `Notifications`) |
| 4 | `task_4/dashboard` | GitHub Pages deploy setup (`gh-pages` package + scripts) |
| 5 | `task_5/dashboard` | From-scratch Webpack + Babel build, reorganized into `App/`, `Notifications/`, `utils/`, `assets/`, `config/` |

Each `task_N/dashboard` is a self-contained project — `cd` into it, run
`npm install`, then `npm start`.

## Running any CRA-based task (0–4)

```bash
cd task_X/dashboard
npm install
npm start        # dev server on http://localhost:3000
npm run build     # production build, verifies no lint/build errors
npm test          # task_3 and task_4 only — Enzyme/Jest suite
```

## Running task_5 (Webpack/Babel)

```bash
cd task_5/dashboard
npm install
npm start   # webpack-dev-server on http://localhost:8564
npm run build   # outputs dist/bundle.js
npm test    # jest + Enzyme, 3 suites / 11 tests
```

## Deploying task_4 to GitHub Pages

1. Push this repo to GitHub as `alu-web_react`.
2. In `task_4/dashboard/package.json`, replace `YOUR_GITHUB_USERNAME` in the
   `homepage` field with your actual GitHub username.
3. From `task_4/dashboard`, run:
   ```bash
   npm run deploy
   ```
   This builds the app and pushes the `build/` output to a `gh-pages`
   branch. Once GitHub Pages is enabled for that branch (Settings > Pages
   in your repo), the app will be live at the `homepage` URL.
4. Add the live URL to this README once deployed.

**Live demo URL:** _add after deploying_

## Notes on assets

The Holberton logo and favicon used across all tasks were extracted
directly from the assignment's reference screenshots (cropped and
cleaned up), not downloaded from the intranet (this environment's
network doesn't have access to the Holberton/Intranet asset hosts).
The `close-icon.png` used for the Notifications "X" button is a
small generated icon matching the reference screenshot's style. If
your grading environment expects the exact original binary files
from the intranet, swap them in at:

- `task_X/dashboard/src/holberton_logo.jpg` (tasks 0–3)
- `task_X/dashboard/src/favicon.ico` and `public/favicon.ico` (tasks 0–3)
- `task_2/dashboard/src/close-icon.png`, `task_3/dashboard/src/close-icon.png`
- `task_5/dashboard/src/assets/holberton-logo.jpg`, `favicon.ico`, `close-icon.png`

Everything else (imports, component structure, styling) already
points at these files, so dropping in replacements with the same
filenames requires no code changes.

## Environment

Built and verified with Node.js and npm available in this environment
(newer than the officially listed Ubuntu 18.04 / Node 12.x / npm 6.x,
since that combination isn't available here). All React dependencies
are pinned to React 16.14.0 for Enzyme shallow-rendering compatibility
in the test tasks. Code itself doesn't use any syntax or APIs specific
to newer Node/npm, so it should run the same on the officially
specified versions.
