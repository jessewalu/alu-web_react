# School Dashboard - task_4

Task 4 of the `React_inline_styling` project. Adds two animations to the
notifications menu item.

- `opacityKeyframes` takes opacity from 0.5 to 1.
- `bounceKeyframes` translates the element on the Y axis between 0px, -5px
  and 5px.

The menu item floats at the top right above every other element, has a
`#fff8f8` background and a pointer cursor. On hover both animations run —
1s for the opacity change, 0.5s for the bounce — repeating 3 times. When
the notifications list is open, the menu item is hidden via styling.

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
