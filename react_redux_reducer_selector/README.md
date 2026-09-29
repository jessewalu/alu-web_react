# React Redux - Reducers & Selectors

Project for the ALU / ALX React course, repository `alu-web_react`, directory
`react_redux_reducer_selector`.

Author: Walusansa Jesse Kisaale

## Structure

Every task lives in its own `task_N/dashboard` folder. `task_0` starts from the dashboard
of `0x08_react_redux_action_creator_normalizr` (task 7), and each following task is a copy
of the previous one with the new work added on top.

| Task | What was added | Main files |
| ---- | -------------- | ---------- |
| 0 | Basic UI reducer (spread operator, no mutation) | `src/reducers/uiReducer.js`, `uiReducer.test.js` |
| 1 | UI reducer rewritten with Immutable `Map` and `set` | `src/reducers/uiReducer.js`, `uiReducer.test.js` |
| 2 | `FETCH_COURSE_SUCCESS` and the course reducer (ES6) | `src/actions/courseActionTypes.js`, `src/reducers/courseReducer.js`, `courseReducer.test.js` |
| 3 | `FETCH_NOTIFICATIONS_SUCCESS` and the notification reducer (ES6) | `src/actions/notificationActionTypes.js`, `src/reducers/notificationReducer.js`, `notificationReducer.test.js` |
| 4 | Normalizr + Immutable: `coursesNormalizer`, `notificationsNormalizer`, reducers using `Map`, `mergeDeep`, `set`, `setIn` | `src/schema/courses.js`, `src/schema/notifications.js`, `src/reducers/*` |
| 5 | Notification selectors | `src/selectors/notificationSelector.js`, `notificationSelector.test.js` |

## State shapes (task 4 and 5)

```
courses:        Map { courses: { [id]: { id, name, credit, isSelected } } }
notifications:  Map { filter: 'DEFAULT' | 'URGENT',
                      notifications: { [id]: { id, type, value, isRead } } }
```

## Usage

```bash
cd task_N/dashboard
npm install
npm test          # run the Jest tests
npm run lint      # ESLint
npm run build     # bundle into dist/
```

## Notes

- Reducers export both a named function and a default export (`uiReducer`, `courseReducer`,
  `notificationReducer`), and each file also exports its `initialState`.
- Reducers never mutate the previous state: spread operator in tasks 0-3, Immutable in
  tasks 1 and 4-5.
- `SELECT_COURSE`, `UNSELECT_COURSE` and `MARK_AS_READ` use the action's `index` as the item id.
