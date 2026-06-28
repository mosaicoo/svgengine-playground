import { Routes } from '@angular/router';

/** Functional grouping for the sidebar learning track (basic → advanced). */
export type TutorialGroup = 'Basics' | 'Editing paths' | 'Combining shapes';

/** Order in which groups appear in the sidebar. */
export const TUTORIAL_GROUPS: readonly TutorialGroup[] = [
  'Basics',
  'Editing paths',
  'Combining shapes',
];

export interface TutorialMeta {
  /** URL slug (English, per SVGEngine D-041). */
  readonly slug: string;
  /** Sidebar / heading label. */
  readonly title: string;
  /** Functional group for the sidebar. */
  readonly group: TutorialGroup;
  /** One-line summary (sidebar tooltip / landing card). */
  readonly blurb: string;
  /** Lazy component loader for the route. */
  readonly load: () => Promise<unknown>;
}

/**
 * Single source of truth for the tutorial learning track. Both the route
 * table ({@link tutorialRoutes}) and the sidebar navigation are derived
 * from this list, so adding a lesson is a one-line change here plus the
 * component file.
 */
export const TUTORIALS: readonly TutorialMeta[] = [
  {
    slug: 'draw-first-shape',
    title: 'Draw your first shape',
    group: 'Basics',
    blurb: 'Rectangle tool, select, and set a fill in the Inspector.',
    load: () => import('./draw-first-shape/draw-first-shape').then((m) => m.DrawFirstShape),
  },
  {
    slug: 'rounded-rectangle',
    title: 'Make it a rounded rectangle',
    group: 'Basics',
    blurb: 'Raise the corner radius in the Tool Options bar.',
    load: () => import('./rounded-rectangle/rounded-rectangle').then((m) => m.RoundedRectangle),
  },
  {
    slug: 'edit-path-points',
    title: "Edit a path's points",
    group: 'Editing paths',
    blurb: 'Convert a shape to a path and edit its anchors with Direct Select.',
    load: () => import('./edit-path-points/edit-path-points').then((m) => m.EditPathPoints),
  },
  {
    slug: 'freehand-smooth',
    title: 'Freehand stroke & smooth',
    group: 'Editing paths',
    blurb: 'Draw with the Pencil, then simplify with the Smooth tool.',
    load: () => import('./freehand-smooth/freehand-smooth').then((m) => m.FreehandSmooth),
  },
  {
    slug: 'combine-shapes',
    title: 'Combine two shapes',
    group: 'Combining shapes',
    blurb: 'Union or subtract overlapping shapes with Pathfinder.',
    load: () => import('./combine-shapes/combine-shapes').then((m) => m.CombineShapes),
  },
];

/** Route table generated from {@link TUTORIALS}. */
export const tutorialRoutes: Routes = TUTORIALS.map((t) => ({
  path: t.slug,
  loadComponent: t.load as () => Promise<never>,
}));
