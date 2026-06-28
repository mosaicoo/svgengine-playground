import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LayoutChrome } from '../layout/layout-chrome';

/**
 * Presentational frame shared by every tutorial route.
 *
 * Renders a numbered **steps** panel next to the interactive **work area**
 * (projected via `<ng-content>`). In `?embed=1` mode the steps panel and
 * heading are hidden so the docs-site `<iframe>` shows only the work area —
 * the textual explanation already lives on the docs page beside the frame.
 *
 * Step strings may contain light inline markup (`<kbd>`, `<strong>`,
 * `<code>`) — Angular's sanitizer allows these, and the content is static
 * (authored here, never user input).
 */
@Component({
  selector: 'pg-tutorial-frame',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!chrome.embedded()) {
      <aside class="steps">
        @if (level(); as lvl) {
          <p class="level">{{ lvl }}</p>
        }
        <h1>{{ title() }}</h1>
        <ol>
          @for (step of steps(); track $index) {
            <li [innerHTML]="step"></li>
          }
        </ol>
        <ng-content select="[notes]" />
      </aside>
    }
    <section class="work-area">
      <ng-content />
    </section>
  `,
  styles: `
    :host {
      display: flex;
      height: 100%;
      min-height: 0;
      gap: 0.75rem;
      padding: 0.75rem;
      box-sizing: border-box;
    }
    .steps {
      flex: 0 0 17rem;
      overflow-y: auto;
      padding: 1rem 1.1rem;
      border: 1px solid var(--mat-sys-outline-variant, rgba(0, 0, 0, 0.12));
      border-radius: 0.6rem;
      background: var(--mat-sys-surface-container-low, #f7f7f7);
    }
    .level {
      margin: 0 0 0.25rem;
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--mat-sys-primary, #1565c0);
    }
    h1 {
      margin: 0 0 0.75rem;
      font-size: 1.25rem;
      line-height: 1.2;
    }
    ol {
      margin: 0;
      padding-left: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
    }
    li {
      font-size: 0.9rem;
      line-height: 1.45;
    }
    .work-area {
      flex: 1 1 auto;
      min-width: 0;
      min-height: 0;
      border: 1px solid var(--mat-sys-outline-variant, rgba(0, 0, 0, 0.12));
      border-radius: 0.6rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    :host ::ng-deep kbd {
      display: inline-block;
      padding: 0.05rem 0.4rem;
      border: 1px solid var(--mat-sys-outline, rgba(0, 0, 0, 0.3));
      border-bottom-width: 2px;
      border-radius: 0.3rem;
      font-family: ui-monospace, monospace;
      font-size: 0.8em;
      background: var(--mat-sys-surface, #fff);
    }
    @media (max-width: 720px) {
      :host {
        flex-direction: column;
      }
      .steps {
        flex: 0 0 auto;
      }
      .work-area {
        flex: 1 1 24rem;
      }
    }
  `,
})
export class TutorialFrame {
  protected readonly chrome = inject(LayoutChrome);
  readonly title = input.required<string>();
  readonly level = input<string>('');
  readonly steps = input.required<readonly string[]>();
}
