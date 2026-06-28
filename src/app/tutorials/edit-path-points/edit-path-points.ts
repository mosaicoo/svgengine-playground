import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  AUTO_PARENT,
  CommandBus,
  ConvertNodeToPathCommand,
  createRect,
  EditorStateService,
  findNodeById,
  InsertNodeCommand,
} from '@mosaicoo/svg-engine/core';
import {
  AnchorOverlay,
  Marquee,
  provideSvgEngineEditorScope,
  RotationPivot,
  SelectionOverlay,
  SelectionService,
  SnapGuides,
} from '@mosaicoo/svg-engine/edit';
import { SvgeEditor, SvgeToolsPalette } from '@mosaicoo/svg-engine/ui';
import { TutorialFrame } from '../tutorial-frame';

/** Leaf shape types that can be converted to an editable path. */
const CONVERTIBLE = new Set(['rect', 'ellipse', 'line', 'polygon', 'polyline']);

/**
 * **Tutorial — Edit a path's points** (Editing paths).
 *
 * Seeds a rectangle so the lesson has something to convert. A
 * **Convert to Path** action button (wired through the `CommandBus`)
 * turns the selected shape into an editable path; Direct Select (`A`)
 * then reveals the anchors via the projected `AnchorOverlay`.
 */
@Component({
  selector: 'pg-edit-path-points',
  imports: [
    TutorialFrame,
    SvgeEditor,
    SvgeToolsPalette,
    SelectionOverlay,
    RotationPivot,
    Marquee,
    SnapGuides,
    AnchorOverlay,
  ],
  providers: [provideSvgEngineEditorScope()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pg-tutorial-frame level="Editing paths" title="Edit a path's points" [steps]="steps">
      <div notes class="actions">
        <button type="button" (click)="convertToPath()" [disabled]="!canConvert()">
          Convert selection to Path
        </button>
      </div>
      <div class="canvas-row">
        <svge-tools-palette class="palette"></svge-tools-palette>
        <svge-editor class="editor" [showToolbar]="true" [showToolOptions]="true" [showStatusBar]="true">
          <svg:g svgeSelectionOverlay></svg:g>
          <svg:g svgeRotationPivot></svg:g>
          <svg:g svgeMarquee></svg:g>
          <svg:g svgeSnapGuides></svg:g>
          <!-- Anchor points + handles, shown by the Direct Select tool. -->
          <svg:g svgeAnchorOverlay></svg:g>
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
    }
    .actions button {
      width: 100%;
      padding: 0.5rem 0.75rem;
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
export class EditPathPoints {
  private readonly bus = inject(CommandBus);
  private readonly state = inject(EditorStateService);
  private readonly selection = inject(SelectionService);

  protected readonly steps: readonly string[] = [
    'Select the shape on the canvas (or draw your own), then <strong>Convert to Path</strong>.',
    'Press <kbd>A</kbd> for <strong>Direct Select</strong> — the anchor points appear.',
    '<strong>Drag an anchor</strong> to move it; <strong>double-click an anchor</strong> to cycle its type; <strong>double-click a segment</strong> to add a point.',
  ];

  /** True when at least one selected node is a convertible (non-path) leaf. */
  protected readonly canConvert = computed(() => {
    const root = this.state.document().root;
    for (const id of this.selection.selectedIds()) {
      const node = findNodeById(root, id);
      if (node && CONVERTIBLE.has(node.type)) return true;
    }
    return false;
  });

  constructor() {
    // Seed a rectangle so the lesson starts with something to convert.
    // Route-scoped editor state is fresh per visit, so no guard needed —
    // `nodeCount()` is already > 0 here because the editor shell creates a
    // page node, which is why we cannot gate on it.
    queueMicrotask(() => {
      this.bus.dispatch(
        new InsertNodeCommand(
          AUTO_PARENT,
          createRect(
            { x: 160, y: 120, width: 220, height: 140 },
            { style: { fill: '#90caf9', stroke: '#1565c0', strokeWidth: 2 } },
          ),
        ),
      );
    });
  }

  protected convertToPath(): void {
    const root = this.state.document().root;
    for (const id of this.selection.selectedIds()) {
      const node = findNodeById(root, id);
      if (node && CONVERTIBLE.has(node.type)) {
        this.bus.dispatch(new ConvertNodeToPathCommand(id));
      }
    }
  }
}
