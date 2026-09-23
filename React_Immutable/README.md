# React_Immutable

ALU/ALX project — hands-on practice with [Immutable.js](https://immutable-js.com/):
converting plain objects into immutable data structures, accessing nested
paths, working with `List`, chaining non-mutating updates, merging (shallow
and deep), structural equality, and lazy `Seq` transformations.

## Setup

```bash
npm install
```

## Running

```bash
npm test          # jest
npm run full-test # eslint [0-9]*.js && jest
./node_modules/.bin/eslint [0-9]*.js   # lint the task files directly
```

> Targets Node 12.x / npm 6.x per the assignment requirements.

## Files

| File | What it does |
|---|---|
| `0-fromjs.js` | `getImmutableObject(object)` — converts a plain object into an immutable `Map` via `fromJS`. |
| `1-map.js` | `getImmutableObject(object)` — same result, built directly with `Map`. |
| `2-nested.js` | `accessImmutableObject(object, array)` — converts `object` with `fromJS` and reads the value at the path in `array` via `getIn`; returns `undefined`, a string, or a `Map`. |
| `3-list.js` | `getListObject(array)` builds an immutable `List`; `addElementToList(list, element)` returns a new `List` with `element` pushed onto the end. |
| `4-mutations.js` | Exports `map` (an immutable `Map` of ids 1–6 to first names) and `map2`, derived from `map` by chaining `.set()` calls (id 2 → `Benjamin`, id 4 → `Oliver`) — no extra variables used. |
| `5-merge.js` | `concatElements(page1, page2)` concatenates two arrays into a `List`. `mergeElements(page1, page2)` merges two objects (page2 wins on key conflicts) and returns a `List` of the resulting values. |
| `6-deeply.js` | `mergeDeeplyElements(page1, page2)` — default export; deep-merges two nested objects with `Map#mergeDeep` so overlapping nested keys are combined rather than overwritten. |
| `7-equality.js` | `areMapsEqual(map1, map2)` — default export; structural equality between two Immutable `Map`s via `is`. |
| `8-seq.js` | `printBestStudents(grades)` — default export; uses a lazy `Seq` to filter out students scoring below 70, capitalizes each remaining student's first/last name, and logs the result. |
