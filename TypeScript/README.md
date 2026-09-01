# TypeScript

This project is a hands-on introduction to TypeScript: interfaces, classes,
ambient namespaces, namespace merging, string literal types, and nominal
(branded) typing. Each task lives in its own directory and can be built
independently with Webpack.

## Setup

Inside any `task_X` directory:

```bash
npm install
npm run build      # compiles with Webpack + ts-loader, no type errors
npm run start-dev   # (task_0 only) serves the compiled app in a browser
```

## Tasks

| Directory | Description |
|-----------|-------------|
| `task_0` | `Student` interface, an array of students, rendered into an HTML `<table>` with Vanilla JS |
| `task_1` | `Teacher` interface (readonly fields, optional field, index signature), `Directors` interface extending `Teacher`, `printTeacher` function typed via an interface, and a `StudentClass` class described through constructor/instance interfaces |
| `task_2` | `DirectorInterface` / `TeacherInterface`, `Director` and `Teacher` classes, a `createEmployee` factory function, a `isDirector` type predicate, `executeWork`, and a `Subjects` string literal type with `teachClass` |
| `task_3` | Ambient type declarations (`crud.d.ts`) for a plain JS library (`crud.js`), imported into `main.ts` via a triple-slash directive and shared `interface.ts` types (`RowID`, `RowElement`) |
| `task_4` | Ambient namespace `Subjects` split across multiple files (`Teacher.ts`, `Subject.ts`, `Cpp.ts`, `React.ts`, `Java.ts`) using declaration merging to progressively extend the `Teacher` interface |
| `task_5` | Nominal typing via "branded" interfaces (`MajorCredits`, `MinorCredits`) so that structurally identical types cannot be swapped for one another |

## Requirements

- All files use TypeScript (`.ts`) where possible.
- Webpack builds with **no type errors**.
- Configuration files (`tsconfig.json`, `webpack.config.js`, `package.json`,
  `.eslintrc.js`) follow the assignment specification for each task.
