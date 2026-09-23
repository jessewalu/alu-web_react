# react_state

ALU/ALX front-end React project — `react_state`. Builds directly on top of the
`React_inline_styling` project's dashboard, adding real interactivity: local
component state, controlled forms, React Context, and React Hooks.

## Structure

Each task lives in its own self-contained `dashboard` app:

```
react_state/
├── task_0/dashboard   # Local state for the notifications drawer
├── task_1/dashboard   # Controlled Login form + state callback
├── task_2/dashboard   # React Context for the logged-in user + login/logout
├── task_3/dashboard   # Context consumer (Footer) + markNotificationAsRead
└── task_4/dashboard   # React Hooks: per-row checkbox on CourseListRow
```

Every task folder is a full CRA-style React app (React 16.14, Aphrodite for
styling, PropTypes for prop validation, Enzyme + Jest for tests) that can be
run independently.

## Setup (per task)

```bash
cd task_N/dashboard
npm install
```

## Running

```bash
npm start        # dev server at http://localhost:3000
npm test         # Jest + Enzyme test suite
npm run lint     # ESLint (eslint:recommended + plugin:react)
npm run build    # production build
```

> Note: this project targets Node 12.x / npm 6.x per the assignment
> requirements. It was developed and tested here on a newer Node version; if
> you hit unrelated tooling errors with `npm start` / `npm run build` on a
> very new Node version, running under Node 12–18 (as specified) avoids them.
> `npm test` and `npm run lint` were verified clean on every task.

## Task summaries

### task_0 — Adding a local state for notifications
- `App` gets a `displayDrawer` boolean in local state, with
  `handleDisplayDrawer` / `handleHideDrawer` to flip it.
- `Notifications` receives `displayDrawer` and the two handlers as props,
  wires them to the "Your notifications" menu item and the close button, and
  its `shouldComponentUpdate` now also re-renders when `displayDrawer`
  changes.

### task_1 — Controlled components and state callback
- `Login` becomes a controlled form: `email`, `password` and `enableSubmit`
  live in local state, `handleChangeEmail` / `handleChangePassword` update it
  as the user types, and the submit `<input type="submit">` is only enabled
  once both fields are non-empty. `handleLoginSubmit` prevents the default
  page reload.

### task_2 — Context
- `AppContext.js` defines a default `user` object and `logOut` function and
  creates the context.
- `App` holds `user` and `logOut` in state, exposes `logIn(email, password)`
  and `logOut()`, wraps the tree in `AppContext.Provider`, and switches
  between `Login` and `CourseList` based on `state.user.isLoggedIn`.
- `Header` becomes a class component using `static contextType = AppContext`
  and shows a `#logoutSection` ("Welcome `<email>` (Log out)") only when the
  context user is logged in; clicking "Log out" calls the context `logOut`.

### task_3 — Context consumer & advanced state
- `Footer` (still a function component) subscribes via
  `AppContext.Consumer` and shows a "Contact us" link only when the context
  user is logged in.
- `App` moves `listNotifications` into state and adds
  `markNotificationAsRead(id)`, which removes that notification from state.
- `Notifications` drops its own `markAsRead` and `shouldComponentUpdate` in
  favor of `React.PureComponent`, and forwards the real
  `markNotificationAsRead` down to each `NotificationItem`.

### task_4 — Introduction to React Hooks
- `CourseListRow` (a function component, not a class) uses `useState` to
  track a `checked` boolean. Non-header rows get a checkbox in the first
  cell; checking it applies the new `rowChecked` (`#e6e4e4`) background
  style to the row.
