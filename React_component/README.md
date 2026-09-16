# React_component

ALU / ALX — `alu-web_react` repository, `React_component` project.

Author: Walusansa Jesse Kisaale

This project continues the School dashboard built in `0x02. React intro`
and `0x03. React Props`, and covers React class components, lifecycle
methods, event handling, containment/specialization, Higher Order
Components, and render optimization.

## Requirements

- Files are written for Node 12.x / npm 6.x (Ubuntu 18.04 LTS) and also
  run on modern Node.
- Every file ends with a new line.
- React is pinned to `16.14.0` so that Enzyme's shallow/mount renderers
  work correctly.

## Directory layout

| Directory | Task(s) | What it adds |
|---|---|---|
| `task_0/dashboard` | 0 | `App` converted from a function to a React class |
| `task_1/dashboard` | 1 | `logOut` prop + `ctrl+h` keydown listener added/removed in lifecycle methods |
| `task_2/dashboard` | 2 | `Notifications` as a class with bound `markAsRead(id)`; `NotificationItem` calls it on click |
| `task_3/dashboard` | 3, 4, 5, 6 | `BodySection` (containment), `BodySectionWithMarginBottom` (specialization), wired into `App` |
| `task_4/dashboard` | 7, 8 | `WithLogging` Higher Order Component + its tests |
| `task_5/dashboard` | 9, 10, 11 | `React.memo` on `NotificationItem`, `shouldComponentUpdate` on `Notifications` |

Each task directory is a complete, self-contained project. Every task
builds cumulatively on the one before it.

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
| `task_0` | 8 | 26 |
| `task_1` | 8 | 28 |
| `task_2` | 8 | 30 |
| `task_3` | 10 | 39 |
| `task_4` | 11 | 42 |
| `task_5` | 11 | 44 |

All suites pass with no errors or warnings.

## A note on the logo asset

`src/assets/logo.jpg` is a locally generated placeholder image. The
original Holberton/ALX logo lives behind the school intranet and cannot
be fetched from a sandboxed environment. Replace this file with the real
logo if your review requires the exact asset — no code changes are
needed, the filename and import path are already correct.
