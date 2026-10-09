# React Redux - Connectors & Providers

Project for the ALU / ALX React course, repository `alu-web_react`, directory
`react_redux_connectors_and_providers`.

Author: Walusansa Jesse Kisaale

## Structure

Every task lives in its own `task_N/dashboard` folder. `task_0` starts from the dashboard of
`react_redux_reducer_selector` (task 5) and each following task is a copy of the previous one
with the new work added on top.

| Folder | Exercises | What changed |
| ------ | --------- | ------------ |
| `task_0` | 0, 1, 2 | `mapStateToProps` + `connect` in `App.js`, `createStore` + `Provider` in `index.js`, `mapStateToProps` test |
| `task_1` | 3, 4, 5, 6 | `displayDrawer` from the store, simplified `mapDispatchToProps`, `App` refactor and tests |
| `task_2` | 7 - 12 | redux-thunk, `loginRequest` as `login` prop, connected `Header` / `Footer` (no Context), `uiReducer` LOGIN / LOGOUT, stateless component tests with `shallow` |
| `task_3` | 13 | Redux DevTools support in `index.js` |
| `task_4` | 14, 15, 16 | `rootReducer` (`courses`, `notifications`, `ui`) used by the store, connectors and tests updated |
| `task_5` | 17 - 21 | `setLoadingState`, `setNotifications`, `fetchNotifications`, notification reducer (loading, `mergeDeep`), connected `Notifications`, cleanup of `App`, new tests |
| `task_6` | 22 | `getUnreadNotifications` selector + `markAsAread` mapped to `markNotificationAsRead` |
| `task_7` | 23, 24, 25 | `getListCourses` selector, `fetchCourses` / `setCourses`, connected `CourseList` with `onChangeRow` and checkbox rows |
| `task_8` | 26, 27, 28 | `getUnreadNotificationsByType` (reselect), filter buttons, tests |
| `task_9` | 29 | `NotificationsContainer` (connector + fetch on mount) and functional `Notifications` |

## State shape

```
{
  courses:       Map { courses: { [id]: { id, name, credit, isSelected } } },
  notifications: Map { filter, loading, notifications: { users, messages, notifications } },
  ui:            Map { isNotificationDrawerVisible, isUserLoggedIn, user }
}
```

## Usage

```bash
cd task_N/dashboard
npm install
npm test          # Jest tests
npm run lint      # ESLint
npm run build     # bundle into dist/
npm start         # dev server on http://localhost:8564
```

The "API" files (`courses.json`, `login-success.json`, `notifications.json`) are served from
`dist/`, so `fetch('/courses.json')` etc. work with the dev server.

## Notes

- Every connected component also exports its stateless version (`App`, `Header`, `Footer`,
  `Notifications`, `CourseList`, ...) and its `mapStateToProps` / `mapDispatchToProps`.
- The bound action creators from the previous project and their placeholder store were removed:
  `connect` binds the action creators and the real store lives in `src/index.js`.
- `NotificationItemShape.js` and `CourseShape.js` do not exist in this dashboard (the shapes are
  declared inline in the components), so there is nothing to delete for those clean-up steps.
- The API sends string ids, so course ids and notification message ids (`guid`) are strings.
- `src/integration/App.integration.test.js` (task_2 onwards) mounts the whole app with the real store and
  a mocked API to check login / logout, the drawer, notifications, filters and the course list. It is
  kept apart from the unit tests: `App.test.js`, `Header.test.js` and `Footer.test.js` only use
  `shallow` on the stateless components, as the exercises ask.
- `dist/index.html` declares an empty favicon (`data:,`) so the browser console stays free of
  `/favicon.ico` 404 errors when the app is opened.
