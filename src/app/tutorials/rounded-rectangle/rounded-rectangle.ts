import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Marquee,
  provideSvgEngineEditorScope,
  RotationPivot,
  SelectionOverlay,
  ShapeOverlay,
  SnapGuides,
} from '@mosaicoo/svg-engine/edit';
import { SvgeEditor, SvgeToolsPalette } from '@mosaicoo/svg-engine/ui';
import { TutorialFrame } from '../tutorial-frame';

/**
 * **Tutorial — Make it a rounded rectangle** (Basics).
 *
 * Adds the **Tool Options** bar (`[showToolOptions]`) to the minimal
 * editor so the learner can raise the Rectangle tool's *corner radius*
 * before drawing. No inspector — this lesson is purely about tool options.
 */
@Component({
  selector: 'pg-rounded-rectangle',
  imports: [
    TutorialFrame,
    SvgeEditor,
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
    <pg-tutorial-frame level="Basics" title="Make it a rounded rectangle" [steps]="steps">
      <div class="canvas-row">
        <svge-tools-palette class="palette"></svge-tools-palette>
        <svge-editor class="editor" [showToolbar]="true" [showToolOptions]="true" [showStatusBar]="true">
          <svg:g svgeSelectionOverlay></svg:g>
          <svg:g svgeRotationPivot></svg:g>
          <svg:g svgeMarquee></svg:g>
          <svg:g svgeSnapGuides></svg:g>
          <svg:g svgeShapeOverlay></svg:g>
        </svge-editor>
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
  `,
})
export class RoundedRectangle {
  protected readonly steps: readonly string[] = [
    'Press <kbd>R</kbd> again (or click <strong>Rectangle</strong> in the tools palette).',
    'In the <strong>Tool Options</strong> bar, raise <strong>Corner radius</strong>.',
    '<strong>Drag</strong> a new rectangle — the corners are rounded.',
  ];
}
