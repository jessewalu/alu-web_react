# 0x08. React Redux - Action creators & Normalizr

Project for the ALU / ALX React course, repository `alu-web_react`, directory
`0x08_react_redux_action_creator_normalizr`.

Author: Walusansa Jesse Kisaale

## Structure

Every task lives in its own `task_N/dashboard` folder. Each one is a copy of the
previous task's dashboard with the new work added on top.

| Task | What was added | Main files |
| ---- | -------------- | ---------- |
| 0 | Read `notifications.json`, `getAllNotificationsByUser` | `src/schema/notifications.js`, `src/schema/notifications.test.js` |
| 1 | Normalizr schema (`user`, `message`, `notification`) and `normalizedData` | `src/schema/notifications.js`, `src/schema/notifications.test.js` |
| 2 | `getAllNotificationsByUser` rewritten on the normalized data (single loop, no `Object.keys`) | `src/schema/notifications.js` |
| 3 | Course action types and creators | `src/actions/courseActionTypes.js`, `courseActionCreators.js`, `courseActionCreators.test.js` |
| 4 | UI action types and creators | `src/actions/uiActionTypes.js`, `uiActionCreators.js`, `uiActionCreators.test.js` |
| 5 | Notification action types, `NotificationTypeFilters` and creators | `src/actions/notificationActionTypes.js`, `notificationActionCreators.js`, `notificationActionCreators.test.js` |
| 6 | Bound action creators (Redux `bindActionCreators` + store) | `src/actions/*ActionCreators.js`, `src/store/store.js` |
| 7 | `LOGIN_SUCCESS` / `LOGIN_FAILURE`, `loginSuccess`, `loginFailure`, async `loginRequest` (redux-thunk), API files in `dist/` | `src/actions/uiActionTypes.js`, `uiActionCreators.js`, `uiActionCreators.test.js` |

## Usage

```bash
cd task_N/dashboard
npm install
npm test          # run the Jest tests
npm run lint      # ESLint
npm run build     # bundle into dist/
npm start         # dev server on http://localhost:8564
```

## Notes

- `markAsAread` is the name used in the task text; `markAsARead` is exported as an alias
  (the checklist uses that spelling), and both have a bound version.
- The bound action creators use a placeholder root reducer in `src/store/store.js`
  because the real reducers are part of the next project.
- `loginRequest` fetches `/login-success.json`, which is served from `dist/`
  (`login-success.json` and `notifications.json` are copied there in task 7).
- The app components (Header, Footer, Login, Notifications, CourseList, ...) form the
  dashboard carried from the earlier React projects. The graded work is in
  `src/schema` and `src/actions`.
