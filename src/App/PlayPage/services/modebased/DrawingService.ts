import { BehaviorSubject, Observable } from "rxjs";
import { Drawing } from "../../../../model/Drawing";
import { DrawingPane } from "../../../../model/DrawingPane";
import { uuid } from "../../../../utils/uuid";
import { DrawingColor } from "../../../../model/DrawingColor";
import { DrawingWidth } from "../../../../model/DrawingWidth";
import { AbstractModeBasedService } from "../../../../services/AbstractModeBasedService";

export type DrawingMode = "draw" | "erase";

export class DrawingService extends AbstractModeBasedService {
  private readonly paneS$ = new BehaviorSubject(new DrawingPane([]));
  readonly pane$ = this.paneS$.asObservable();

  private readonly drawingColorS$ = new BehaviorSubject<DrawingColor>(
    DrawingColor.red
  );
  readonly drawingColor$ = this.drawingColorS$.asObservable();

  private readonly drawingWidthS$ = new BehaviorSubject<DrawingWidth>(
    DrawingWidth.m
  );
  readonly drawingWidth$ = this.drawingWidthS$.asObservable();

  private readonly drawingModeS$ = new BehaviorSubject<DrawingMode>("draw");
  readonly drawingMode$ = this.drawingModeS$.asObservable();

  currentlyDrawing(points$: Observable<[number, number]>): void {
    if (!this.active) {
      return;
    }
    const pane: DrawingPane = this.paneS$.value;
    let currentDrawing = Drawing.current(this.drawingColor, this.drawingWidth);
    points$.subscribe({
      next: point => {
        currentDrawing = currentDrawing.withPointAdded(...point);
        const panePreview = pane.withDrawingAdded(currentDrawing);
        this.paneS$.next(panePreview);
      },
      error: () => {
        // on error reset the pane...
        this.paneS$.next(pane);
      },
      complete: () => {
        this.paneS$.next(pane.withDrawingAdded(currentDrawing.withId(uuid())));
      }
    });
  }

  removeDrawing(drawingId: string): void {
    const pane: DrawingPane = this.paneS$.value;
    this.paneS$.next(pane.withDrawingRemoved(drawingId));
  }

  switchDrawingColor(drawingColor: DrawingColor): void {
    this.drawingColorS$.next(drawingColor);
  }

  get drawingColor(): DrawingColor {
    return this.drawingColorS$.value;
  }

  switchDrawingWidth(drawingWidth: DrawingWidth): void {
    this.drawingWidthS$.next(drawingWidth);
  }

  switchDrawingMode(drawingMode: DrawingMode): void {
    this.drawingModeS$.next(drawingMode);
  }

  get drawingMode(): DrawingMode {
    return this.drawingModeS$.value;
  }

  get drawingWidth(): DrawingWidth {
    return this.drawingWidthS$.value;
  }

  setPane(pane: DrawingPane): void {
    this.paneS$.next(pane);
  }

  onActivate(): void {}
}
