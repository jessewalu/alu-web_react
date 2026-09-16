# School Dashboard - task_1

Task 1 of the `React_inline_styling` project. Aphrodite is installed and
used in `App`, `BodySectionWithMarginBottom`, `CourseList`, `Header`,
`Login` and `Notifications`. `App.css`, `Header.css`, `Login.css`,
`Footer.css` and the `BodySection` stylesheets are deleted;
`CourseList.css` and `Notifications.css` remain but the rules moved into
the components have been stripped out of them.

Test files call `StyleSheetTestUtils.suppressStyleInjection()` so that
Aphrodite does not try to inject styles during the test run.

## Setup

```
npm install
```

## Run the dev server

```
npm start
```

## Run the tests

```
npm test
```

## Build for production

```
npm run build
```
