import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  AUTO_PARENT,
  CommandBus,
  ConvertNodeToPathCommand,
  createEllipse,
  createRect,
  EditorStateService,
  findNodeById,
  InsertNodeCommand,
  SubtractCommand,
  UnionCommand,
} from '@mosaicoo/svg-engine/core';
import {
  Marquee,
  provideSvgEngineEditorScope,
  RotationPivot,
  SelectionOverlay,
  SelectionService,
  SnapGuides,
} from '@mosaicoo/svg-engine/edit';
import { SvgeEditor, SvgeToolsPalette } from '@mosaicoo/svg-engine/ui';
import { TutorialFrame } from '../tutorial-frame';

/** Leaf shape types auto-converted to a path before a boolean op. */
const CONVERTIBLE = new Set(['rect', 'ellipse', 'line', 'polygon', 'polyline']);

/**
 * **Tutorial — Combine two shapes** (Combining shapes).
 *
 * Seeds two overlapping shapes and exposes **Union** / **Subtract** action
 * buttons wired through the `CommandBus`. Each op auto-converts non-path
 * leaves first (mirrors the canonical playground's Pathfinder behavior),
 * then runs the boolean operation on the current multi-selection.
 */
@Component({
  selector: 'pg-combine-shapes',
  imports: [
    TutorialFrame,
    SvgeEditor,
    SvgeToolsPalette,
    SelectionOverlay,
    RotationPivot,
    Marquee,
    SnapGuides,
  ],
  providers: [provideSvgEngineEditorScope()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pg-tutorial-frame level="Combining shapes" title="Combine two shapes" [steps]="steps">
      <div notes class="actions">
        <button type="button" (click)="combine('union')" [disabled]="!canCombine()">Union</button>
        <button type="button" (click)="combine('subtract')" [disabled]="!canCombine()">
          Subtract
        </button>
      </div>
      <div class="canvas-row">
        <svge-tools-palette class="palette"></svge-tools-palette>
        <svge-editor class="editor" [showToolbar]="true" [showStatusBar]="true">
          <svg:g svgeSelectionOverlay></svg:g>
          <svg:g svgeRotationPivot></svg:g>
          <svg:g svgeMarquee></svg:g>
          <svg:g svgeSnapGuides></svg:g>
        </svge-editor>
      </div>
    </pg-tutorial-frame>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
    .actions {
      margin-top: 1rem;
      display: flex;
      gap: 0.5rem;
    }
    .actions button {
      flex: 1 1 0;
      padding: 0.5rem 0.5rem;
      border-radius: 0.4rem;
      border: 1px solid var(--mat-sys-primary, #1565c0);
      background: var(--mat-sys-primary, #1565c0);
      color: var(--mat-sys-on-primary, #fff);
      font: inherit;
      font-size: 0.85rem;
      cursor: pointer;
    }
    .actions button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .canvas-row {
      display: flex;
      height: 100%;
      min-height: 0;
    }
    .palette {
      flex: 0 0 auto;
      border-right: 1px solid var(--mat-sys-outline-variant, rgba(0, 0, 0, 0.12));
    }
    .editor {
      flex: 1 1 auto;
      min-width: 0;
    }
  `,
})
export class CombineShapes {
  private readonly bus = inject(CommandBus);
  private readonly state = inject(EditorStateService);
  private readonly selection = inject(SelectionService);

  protected readonly steps: readonly string[] = [
    'Two overlapping shapes are ready on the canvas (draw your own too).',
    'Press <kbd>V</kbd> and <strong>Shift-click</strong> both to select them.',
    'Apply a <strong>Pathfinder</strong> operation — try <strong>Union</strong> to merge them, or <strong>Subtract</strong> to cut one from the other.',
  ];

  /** Boolean ops need at least two selected nodes. */
  protected readonly canCombine = computed(() => this.selection.count() >= 2);

  constructor() {
    // Route-scoped state is fresh per visit; the editor shell already
    // creates a page node so we cannot gate seeding on nodeCount().
    queueMicrotask(() => {
      this.bus.dispatch(
        new InsertNodeCommand(
          AUTO_PARENT,
          createRect(
            { x: 150, y: 140, width: 180, height: 130 },
            { style: { fill: '#90caf9', stroke: '#1565c0', strokeWidth: 1 } },
          ),
        ),
      );
      this.bus.dispatch(
        new InsertNodeCommand(
          AUTO_PARENT,
          createEllipse(
            { cx: 320, cy: 230, rx: 95, ry: 95 },
            { style: { fill: '#ffcc80', stroke: '#ef6c00', strokeWidth: 1 } },
          ),
        ),
      );
    });
  }

  protected combine(op: 'union' | 'subtract'): void {
    const ids = Array.from(this.selection.selectedIds());
    if (ids.length < 2) return;
    const root = this.state.document().root;
    // Auto-convert non-path leaves first (each its own undoable step).
    for (const id of ids) {
      const node = findNodeById(root, id);
      if (node && CONVERTIBLE.has(node.type)) {
        this.bus.dispatch(new ConvertNodeToPathCommand(id));
      }
    }
    this.bus.dispatch(op === 'union' ? new UnionCommand(ids) : new SubtractCommand(ids));
    this.selection.select(ids[0]!);
  }
}
