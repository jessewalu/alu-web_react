# react_props

React Props project — `alu-web_react` repository, `react_props` directory.

Builds on `react_intro/task_5`'s Webpack + Babel dashboard, breaking the
monolithic `App` into small, tested, prop-driven components.

## Contents

| Task | Folder | What it covers |
|------|--------|-----------------|
| 0 | `task_0/dashboard` | Split App into Header, Login, Footer components |
| 1 | `task_1/dashboard` | Real tests for every component (6 suites / 18 tests) |
| 2 | `task_2/dashboard` | Split Notifications into `NotificationItem` (7 suites / 22 tests) |
| 3 | `task_3/` | React DevTools screenshots — see `task_3/HOWTO.md`, **needs to be done manually by you** |
| 4 | `task_4/dashboard` | PropTypes, `CourseList`, `isLoggedIn` toggle, `displayDrawer`/`menuItem` on Notifications |
| 5 | `task_5/dashboard` | Shapes (`CourseShape`, `NotificationItemShape`), loops + keys, empty-state handling (9 suites / 40 tests) |

## Running any task

```bash
cd task_X/dashboard
npm install
npm start        # webpack-dev-server on http://localhost:8564
npm run build     # production build, verifies no errors
npm test          # or npm run test-watch (from task_1 onward)
```

## Known discrepancy: task_4 expected test counts

The assignment text for task_4 states the suite should show
`Test Suites: 5 passed, 5 total` / `Tests: 24 passed, 24 total`.
Given everything task_4 requires adding on top of task_2's already-passing
7 suites / 22 tests (CourseListRow tests, CourseList tests, 3 new App
tests, 4 new Notifications tests), those numbers can't mathematically
be reached without deleting existing, still-required test files. This
build keeps every required test and passes **9 suites / 34 tests** with
zero failures — treat the "5/24" figure in the instructions as a likely
transcription error rather than a target.

## task_3 — manual step required

React DevTools profiling and prop-editing screenshots can't be produced
from an automated environment — they require a live Chrome session with
the React Developer Tools extension. Full step-by-step instructions are
in `task_3/HOWTO.md`. Run `task_2/dashboard` (or any later task), open
it in Chrome, and follow the steps to capture `change_property.png` and
`profiler.png`.

## Notes on assets

Same real Holberton logo/favicon as `react_intro` (extracted from your
screenshots), carried forward into every task here. The `close-icon.png`
for the Notifications close button is still a generated stand-in — swap
in the original from the intranet if your grader checks the exact binary.

## Environment

Built and verified with the Node/npm available in this environment
(newer than the officially listed Ubuntu 18.04 / Node 12.x / npm 6.x).
React is pinned to 16.14.0 across every task for Enzyme shallow-rendering
compatibility. No syntax or APIs used are specific to newer Node/npm, so
behavior should be identical on the officially specified versions.
