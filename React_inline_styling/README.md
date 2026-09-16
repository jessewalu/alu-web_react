# React_inline_styling

ALU / ALX — `alu-web_react` repository, `React_inline_styling` project.

Author: Walusansa Jesse Kisaale

This project continues the School dashboard from `0x04. React components`
and replaces its CSS stylesheets with inline styling and Aphrodite,
adds responsive media queries, and finishes with CSS animations.

## Requirements

- Files are written for Node 12.x / npm 6.x (Ubuntu 18.04 LTS) and also
  run on modern Node.
- Every file ends with a new line.
- React is pinned to `16.14.0` so Enzyme's renderers work correctly.

## Directory layout

| Directory | Task | What it adds |
|---|---|---|
| `task_0/dashboard` | 0 | Inline styling on `CourseListRow` using constants |
| `task_1/dashboard` | 1 | Aphrodite installed and applied across six components |
| `task_2/dashboard` | 2 | Conditional styling on `NotificationItem` and `CourseListRow`; last CSS files removed |
| `task_3/dashboard` | 3 | Responsive design via media queries under 900px |
| `task_4/dashboard` | 4 | Opacity + bounce animations on the notifications menu item |

`task_0` is a copy of `React_component`'s `task_5`, as the task requires.
Each directory afterwards builds cumulatively on the one before it.

## Running any task

```
cd task_N/dashboard
npm install
npm test        # run the Enzyme/Jest test suite
npm start       # dev server on http://localhost:8564
npm run build   # production bundle in dist/
```

## Test results

| Task | Suites | Tests |
|---|---|---|
| `task_0` | 11 | 46 |
| `task_1` | 11 | 46 |
| `task_2` | 11 | 50 |
| `task_3` | 11 | 50 |
| `task_4` | 11 | 51 |

All suites pass with no errors or warnings.

## Notes for review

- Test files call `StyleSheetTestUtils.suppressStyleInjection()` in
  `beforeAll` and `clearBufferAndResumeStyleInjection()` in `afterAll`, as
  the task tips suggest. Without this, Aphrodite throws during tests.
- Once a component moves to Aphrodite, its class names become generated
  hashes, so selectors like `.menuItem` no longer resolve in Enzyme. The
  affected tests assert on the component reference or compare the
  `className` prop between variants instead.
- `src/assets/logo.jpg` is a locally generated placeholder. The original
  school logo lives behind the intranet and cannot be fetched from a
  sandbox. Drop the real file in at the same path if your review needs
  it — no code changes required.
