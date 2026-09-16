# School Dashboard - task_4

Task 4 of the `React_component` project: adds the `WithLogging` Higher
Order Component in `src/HOC/WithLogging.js`.

It logs `Component NAME is mounted` on `componentDidMount()` and
`Component NAME is going to unmount` on `componentWillUnmount()`, where
`NAME` is the wrapped component's `displayName`, then its `name`, and
finally falls back to `Component` for anonymous/pure-HTML elements. The
HOC's own `displayName` is set to `WithLogging(NAME)` for the React
DevTools.

`App` wraps `Login` with the HOC, so loading the app logs
`Component Login is mounted`.

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
