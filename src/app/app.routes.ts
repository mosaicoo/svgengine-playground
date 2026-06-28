import { Routes } from '@angular/router';
import { TUTORIALS, tutorialRoutes } from './tutorials/tutorials';

/** Slug of the first tutorial — the default landing route. */
const FIRST_TUTORIAL = TUTORIALS[0]?.slug ?? '';

/**
 * Playground routes. The tutorial learning track lives under `/tutorials/*`
 * and is generated from the {@link TUTORIALS} manifest. Slugs are English
 * (SVGEngine D-041); each tutorial is a lazy, self-contained route so the
 * docs site can deep-link / `<iframe>` it (with `?embed=1`).
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: `tutorials/${FIRST_TUTORIAL}` },
  { path: 'tutorials', children: tutorialRoutes },
  { path: '**', redirectTo: `tutorials/${FIRST_TUTORIAL}` },
];
