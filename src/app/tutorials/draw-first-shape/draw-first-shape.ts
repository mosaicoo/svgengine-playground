import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Marquee,
  provideSvgEngineEditorScope,
  RotationPivot,
  SelectionOverlay,
  ShapeOverlay,
  SnapGuides,
} from '@mosaicoo/svg-engine/edit';
import { SvgeEditor, SvgeInspector, SvgeToolsPalette } from '@mosaicoo/svg-engine/ui';
import { TutorialFrame } from '../tutorial-frame';

/**
 * **Tutorial — Draw your first shape** (Basics).
 *
 * Minimal surface: the `<svge-editor>` shell with just the toolbar +
 * status bar, the Shape/Selection overlays (so the Rectangle draw preview
 * and selection box render), and a sibling `<svge-inspector>` for the
 * final "set a fill" step. No tool-options / libraries / effects / pages
 * panels — they aren't part of this lesson.
 */
@Component({
  selector: 'pg-draw-first-shape',
  imports: [
    TutorialFrame,
    SvgeEditor,
    SvgeInspector,
    SvgeToolsPalette,
    SelectionOverlay,
    RotationPivot,
    Marquee,
    SnapGuides,
    ShapeOverlay,
  ],
  providers: [provideSvgEngineEditorScope()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pg-tutorial-frame level="Basics" title="Draw your first shape" [steps]="steps">
      <div class="canvas-row">
        <svge-tools-palette class="palette"></svge-tools-palette>
        <svge-editor class="editor" [showToolbar]="true" [showStatusBar]="true">
          <svg:g svgeSelectionOverlay></svg:g>
          <svg:g svgeRotationPivot></svg:g>
          <svg:g svgeMarquee></svg:g>
          <svg:g svgeSnapGuides></svg:g>
          <!-- Rectangle/Ellipse/Polygon draw preview (dashed bbox during drag). -->
          <svg:g svgeShapeOverlay></svg:g>
        </svge-editor>
        <svge-inspector class="inspector"></svge-inspector>
      </div>
    </pg-tutorial-frame>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
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
    .inspector {
      flex: 0 0 16rem;
      overflow-y: auto;
      border-left: 1px solid var(--mat-sys-outline-variant, rgba(0, 0, 0, 0.12));
    }
  `,
})
export class DrawFirstShape {
  protected readonly steps: readonly string[] = [
    'Press <kbd>R</kbd> (or click <strong>Rectangle</strong> in the tools palette).',
    '<strong>Drag</strong> on the canvas to draw a rectangle. Hold <strong>Shift</strong> for a square, or <strong>Alt</strong> to draw from the center.',
    'Press <kbd>V</kbd> to switch to <strong>Select</strong>, then click your shape.',
    'In the <strong>Inspector</strong>, set a <strong>fill</strong> color. Done — your first object.',
  ];
}
