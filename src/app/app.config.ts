import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideSvgEngineEditorBuiltins } from '@mosaicoo/svg-engine/edit';
import { provideSvgeUiBuiltins } from '@mosaicoo/svg-engine/ui';

import { routes } from './app.routes';

/**
 * Bootstrap providers for the public SVGEngine playground.
 *
 * Deliberately **lean** vs the monorepo playground: it wires only the
 * editor + UI built-ins needed to demonstrate the library. The AI tier
 * (NLU / Whisper voice / Ollama), the plugin loader and the demo Stamp
 * tool are intentionally omitted — they add heavy deps (transformers.js)
 * and chrome that distract from the didactic goal.
 *
 * - `provideSvgEngineEditorBuiltins()` (`/edit`) — headless built-ins:
 *   tools, libraries, io/optimize/effects, keyboard, menus (correct order).
 * - `provideSvgeUiBuiltins()` (`/ui`) — Material tier: tool-options +
 *   menu-opened dialogs.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // MatDialog/MatMenu transitions. Async variant lazy-loads the
    // animations engine on first use.
    provideAnimationsAsync(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),

    // ── Editor built-ins (headless tier) ──────────────────────────
    ...provideSvgEngineEditorBuiltins(),
    // ── UI built-ins (Material tier) ──────────────────────────────
    ...provideSvgeUiBuiltins(),
  ],
};
