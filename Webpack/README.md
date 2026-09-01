# Webpack

A hands-on introduction to Webpack: zero-config bundling, custom
`webpack.config.js`, CSS/image loaders and optimization, multi-entry code
splitting, a dev server, and build-speed tooling (source maps, cache
cleaning).

## Setup

Inside any `task_X` directory:

```bash
npm install
npm run build       # production/development build, per task
```

Task 3 additionally supports:

```bash
npm run start-dev   # webpack-dev-server on http://localhost:8564/
```

## Tasks

| Directory | Description |
|-----------|-------------|
| `task_0` | Zero-config Webpack (no `webpack.config.js`). `src/index.js` imports jQuery and appends 3 paragraphs to `<body>`. Bundles to `dist/main.js`, referenced from `dist/index.html`. |
| `task_1` | First custom `webpack.config.js`. `js/dashboard_main.js` builds the dashboard (title, subtitle, button, click counter, footer) with jQuery, and uses Lodash's `debounce` on the button's click handler. Output: `public/bundle.js` (mode: production). |
| `task_2` | Reuses `task_1`'s JS and adds a `css/main.css` stylesheet (bold, right-aligned counter; a 200x200 `#logo` element) plus a background logo image from `assets/`. Webpack is configured with `css-loader`/`style-loader` and `image-webpack-loader` (with `asset/resource`) to bundle and optimize the image. |
| `task_3` | Splits the app into three independent entry points — `modules/header`, `modules/body`, `modules/footer` — each with its own `.js`/`.css`. Webpack config adds: a dev server on port `8564`, `HtmlWebpackPlugin` to auto-generate `index.html`, `CleanWebpackPlugin` to clean `public/` on every build, `devtool: 'inline-source-map'` for real source-mapped debugging, and `optimization.splitChunks` to pull shared vendor code (jQuery/Lodash) into its own chunk. |

## Notes

- Generated build output (`dist/main.js`, `public/bundle.js`, and the whole
  `task_3/public/` directory) is intentionally **not** committed — each
  task's `.gitignore` excludes it, per the assignment requirements. Run
  `npm run build` to regenerate it locally.
- `task_2/assets/holberton-logo.jpg` and `task_3/assets/holberton-logo.jpg`
  are placeholder logo images — swap in the real Holberton logo if you have
  it.
