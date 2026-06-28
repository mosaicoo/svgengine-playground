import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

/**
 * Global chrome state for the playground shell.
 *
 * The single source of truth for **embed mode**: when the current URL
 * carries `?embed=1`, all global navigation chrome (header tabs + the
 * sidebar) is hidden and only the work area of the active route is shown.
 * This is what the docs site (`svgengine-site` → Tutorials) loads inside
 * an `<iframe>` so the reader sees a clean, focused, interactive example.
 *
 * Reactive over router navigation so toggling routes (or arriving via a
 * deep link) keeps the flag in sync.
 */
@Injectable({ providedIn: 'root' })
export class LayoutChrome {
  private readonly router = inject(Router);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  /** True when the current URL carries `?embed=1`. Hides all global chrome. */
  readonly embedded = computed(() => /[?&]embed=1(?:&|$)/.test(this.url()));
}
