# School Dashboard - task_5

Task 5 of the `React_component` project: performance optimizations.

- `src/Notifications/NotificationItem.js` is exported through
  `React.memo`, making it a pure component that only re-renders when
  its props actually change.
- `src/Notifications/Notifications.js` implements
  `shouldComponentUpdate(nextProps)`, which returns `true` only when
  `nextProps.listNotifications.length` is greater than
  `this.props.listNotifications.length`.

Note: because `shouldComponentUpdate` is deliberately restricted to the
notification-list length (as the task requires), the drawer open/close
toggle no longer triggers a re-render of `Notifications`. This is the
expected behaviour for this task.

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
