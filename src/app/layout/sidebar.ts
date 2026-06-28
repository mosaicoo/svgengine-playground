import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TUTORIAL_GROUPS, TUTORIALS, type TutorialMeta } from '../tutorials/tutorials';

interface SidebarGroup {
  readonly name: string;
  readonly items: readonly TutorialMeta[];
}

/**
 * Grouped navigation sidebar for the playground. Renders the tutorial
 * learning track organized by functional group (Basics → Combining
 * shapes), derived from the {@link TUTORIALS} manifest. Hidden entirely
 * in `?embed=1` mode (the parent shell omits it).
 */
@Component({
  selector: 'pg-sidebar',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="brand">
      <span class="logo">SVG</span>
      <span class="name">Engine Playground</span>
    </div>
    <nav aria-label="Tutorials">
      @for (group of groups; track group.name) {
        @if (group.items.length) {
          <p class="group-label">{{ group.name }}</p>
          <ul>
            @for (t of group.items; track t.slug) {
              <li>
                <a
                  [routerLink]="['/tutorials', t.slug]"
                  routerLinkActive="active"
                  [title]="t.blurb"
                >
                  {{ t.title }}
                </a>
              </li>
            }
          </ul>
        }
      }
    </nav>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      width: 16rem;
      height: 100%;
      box-sizing: border-box;
      padding: 0.75rem 0.5rem;
      border-right: 1px solid var(--mat-sys-outline-variant, rgba(0, 0, 0, 0.12));
      background: var(--mat-sys-surface-container, #f2f2f2);
      overflow-y: auto;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0.6rem 0.9rem;
    }
    .logo {
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.04em;
      padding: 0.15rem 0.4rem;
      border-radius: 0.3rem;
      color: var(--mat-sys-on-primary, #fff);
      background: var(--mat-sys-primary, #1565c0);
    }
    .name {
      font-weight: 500;
      font-size: 0.95rem;
    }
    .group-label {
      margin: 0.8rem 0.6rem 0.3rem;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6));
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    a {
      display: block;
      padding: 0.45rem 0.6rem;
      border-radius: 0.4rem;
      font-size: 0.9rem;
      color: var(--mat-sys-on-surface, inherit);
      text-decoration: none;
    }
    a:hover {
      background: var(--mat-sys-surface-container-high, rgba(0, 0, 0, 0.06));
    }
    a.active {
      background: var(--mat-sys-secondary-container, #d6e3ff);
      color: var(--mat-sys-on-secondary-container, #001b3f);
      font-weight: 500;
    }
  `,
})
export class Sidebar {
  protected readonly groups: readonly SidebarGroup[] = TUTORIAL_GROUPS.map((name) => ({
    name,
    items: TUTORIALS.filter((t) => t.group === name),
  }));
}
