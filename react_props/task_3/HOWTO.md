# task_3 — React DevTools screenshots

This task can't be automated — it requires you to interact with the
running app in an actual Chrome browser with the React Developer
Tools extension installed. Here's exactly how to produce both files.

## Setup

1. Install the "React Developer Tools" extension in Chrome
   (Chrome Web Store).
2. From `task_2/dashboard` (or a copy of it), run:
   ```bash
   npm install
   npm start
   ```
3. Open http://localhost:8564 in Chrome.
4. Open Chrome DevTools (F12 or Cmd+Option+I) and find the new
   "Components" and "Profiler" tabs added by the extension.

## change_property.png

1. In the "Components" tab, find the app's component tree and select
   the first `NotificationItem` (the one showing "New course
   available").
2. In the right-hand props panel, change its `type` prop from
   `"default"` to `"urgent"`.
3. The notification's text should turn red (matching your `urgent`
   CSS rule).
4. Take a screenshot of the browser window showing this change, and
   save it as `task_3/change_property.png`.

## profiler.png

1. In the "Profiler" tab, click the record (circle) button.
2. Reload the page (or trigger a re-render, e.g. by toggling a prop
   again in Components).
3. Stop the recording.
4. The flame graph will show each component and how long it took to
   render. Take a screenshot showing App and its child components
   (Header, Login/CourseList, Footer, Notifications, etc.) with their
   render times, and save it as `task_3/profiler.png`.

Once you have both PNGs, just drop them directly into `task_3/` —
no other files are needed for this task.
