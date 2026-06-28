# SVGEngine Playground

Interactive examples and a learning track for the
[`@mosaicoo/svg-engine`](https://www.npmjs.com/package/@mosaicoo/svg-engine)
library. A standalone Angular app that consumes the **published npm package**
(not a monorepo build), so each example doubles as a live, dogfooded proof
that the package works as shipped.

It is a practical extension of the official docs at
**https://mosaicoo.github.io/svgengine-site** — each tutorial route is
self-contained and embeddable, so a docs page can explain a concept and then
show a focused, interactive demo of exactly that feature.

## Learning track

Tutorials are grouped basic → advanced in the sidebar. Each page imports
**only** the components the lesson needs — no NLU, benchmarks or plugins —
to keep the surface distraction-free.

| Group | Route | Teaches |
| --- | --- | --- |
| Basics | `/tutorials/draw-first-shape` | Draw a rectangle, select it, set a fill in the Inspector |
| Basics | `/tutorials/rounded-rectangle` | Corner radius via the Tool Options bar |
| Editing paths | `/tutorials/edit-path-points` | Convert a shape to a path and edit anchors with Direct Select |
| Editing paths | `/tutorials/freehand-smooth` | Freehand Pencil stroke, then Smooth to simplify |
| Combining shapes | `/tutorials/combine-shapes` | Union / Subtract overlapping shapes with Pathfinder |

Add a lesson by creating the component and appending one entry to
[`src/app/tutorials/tutorials.ts`](src/app/tutorials/tutorials.ts) — the route
table and the sidebar are both derived from that manifest.

## Embed mode

Append **`?embed=1`** to any tutorial URL to hide all chrome (sidebar +
steps panel) and render only the work area. This is what the docs site loads
inside an `<iframe>`:

```html
<iframe
  src="https://mosaicoo.github.io/svgengine-playground/tutorials/draw-first-shape?embed=1"
  width="100%"
  height="560"
  loading="lazy"
></iframe>
```

## Develop

```bash
npm install
npm start          # ng serve → http://localhost:4200
```

The app is **zoneless** and uses Angular Material (Material 3 theme). It
requires the same Angular peer versions the library declares (`^21.2.0`).

## Build & deploy

```bash
npm run build         # plain production build → dist/svgengine-playground/browser
npm run build:pages   # adds --base-href /svgengine-playground/ + a 404.html SPA fallback
```

CI is in [`.github/workflows`](.github/workflows):

- **ci.yml** — build check on pull requests.
- **deploy.yml** — on push to `main`, runs `build:pages` and publishes to
  GitHub Pages via `actions/deploy-pages`.

GitHub Pages serves the app as a static SPA. Because client-side routing is
used, `build:pages` copies `index.html` to `404.html` so deep links (and the
`?embed=1` iframe) resolve after a hard refresh.
