import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AnchorOverlay,
  Marquee,
  PencilOverlay,
  provideSvgEngineEditorScope,
  RotationPivot,
  SelectionOverlay,
  SnapGuides,
} from '@mosaicoo/svg-engine/edit';
import { SvgeEditor, SvgeToolsPalette } from '@mosaicoo/svg-engine/ui';
import { TutorialFrame } from '../tutorial-frame';

/**
 * **Tutorial — Draw a freehand stroke and clean it up** (Editing paths).
 *
 * Pencil tool (freehand draw, `PencilOverlay` for the live stroke) +
 * Smooth tool to simplify, then Direct Select (`AnchorOverlay`) for final
 * tweaks. Tool Options bar is shown so the Pencil/Smooth parameters are
 * adjustable.
 */
@Component({
  selector: 'pg-freehand-smooth',
  imports: [
    TutorialFrame,
    SvgeEditor,
    SvgeToolsPalette,
    SelectionOverlay,
    RotationPivot,
    Marquee,
    SnapGuides,
    PencilOverlay,
    AnchorOverlay,
  ],
  providers: [provideSvgEngineEditorScope()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pg-tutorial-frame
      level="Editing paths"
      title="Draw a freehand stroke and clean it up"
      [steps]="steps"
    >
      <div class="canvas-row">
        <svge-tools-palette class="palette"></svge-tools-palette>
        <svge-editor class="editor" [showToolbar]="true" [showToolOptions]="true" [showStatusBar]="true">
          <svg:g svgeSelectionOverlay></svg:g>
          <svg:g svgeRotationPivot></svg:g>
          <svg:g svgeMarquee></svg:g>
          <svg:g svgeSnapGuides></svg:g>
          <svg:g svgeAnchorOverlay></svg:g>
          <!-- Live freehand stroke while drawing with the Pencil. -->
          <svg:g svgePencilOverlay></svg:g>
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
export class FreehandSmooth {
  protected readonly steps: readonly string[] = [
    'Press <kbd>P</kbd> for the <strong>Pencil</strong> and draw a freehand line.',
    'Press <kbd>S</kbd> for <strong>Smooth</strong> and apply it to simplify the line.',
    'Switch to <strong>Direct Select</strong> (<kbd>A</kbd>) for any final tweaks.',
  ];
}
