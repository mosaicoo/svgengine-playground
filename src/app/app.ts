import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutChrome } from './layout/layout-chrome';
import { Sidebar } from './layout/sidebar';

/**
 * Playground root shell. Renders the grouped {@link Sidebar} next to a
 * `<router-outlet>`. In `?embed=1` mode the sidebar is omitted and only
 * the routed work area is shown — this is what the docs site loads inside
 * an `<iframe>` for a focused, distraction-free example.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly chrome = inject(LayoutChrome);
}
