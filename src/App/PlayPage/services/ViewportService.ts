import { Vector } from "../../../utils/Vector";
import { BehaviorSubject, combineLatest, of } from "rxjs";
import { Transform } from "../../../utils/Transform";
import { ModeService } from "./ModeService";
import { SaveSessionService } from "./SaveSessionService";
import { ViewBox } from "../../../model/ViewBox";
import { windowAspectRatio } from "../../../utils/windowAspectRatio";
import { map, shareReplay } from "rxjs/operators";

export class ViewportService {
  static readonly VIEW_BOX_SIZE = 10;
  constructor(
    private readonly modeService: ModeService,
    private readonly saveSessionService: SaveSessionService
  ) {}

  private readonly transform$S = new BehaviorSubject(
    new Transform(Vector.zero, 1)
  );

  readonly transform$ = this.transform$S.asObservable();

  readonly touchEnabled$ = this.modeService.oneOf(
    "play",
    "manage-token",
    "zoom"
  );

  readonly viewBox$ = of(
    new ViewBox(
      0,
      0,
      ViewportService.VIEW_BOX_SIZE,
      ViewportService.VIEW_BOX_SIZE / windowAspectRatio()
    )
  ).pipe(shareReplay(1));

  readonly initialScale$ = combineLatest([
    this.saveSessionService.gridMap$,
    this.viewBox$
  ]).pipe(
    map(([gridMap, viewBox]) =>
      gridMap
        ? Math.min(
            viewBox.width / gridMap.widthInSquares,
            viewBox.height / gridMap.heightInSquares
          )
        : 1
    )
  );

  readonly mouseDragEnabled$ = this.modeService.oneOf("zoom");

  set transform(transform: Transform) {
    this.transform$S.next(transform);
  }

  get transform(): Transform {
    return this.transform$S.value;
  }

  updateTransform(fn: (t: Transform) => Transform): void {
    this.transform = fn(this.transform);
  }

  zoomIn(): void {
    this.updateTransform(t => {
      const newScale = t.scale + t.scale * 0.1;
      return t
        .withScale(newScale)
        .withTranslate(
          t.translate
            .add(t.translate.scale(t.scale))
            .subtract(t.translate.scale(newScale))
        );
    });
  }

  zoomOut(): void {
    this.updateTransform(t => {
      const newScale = t.scale - t.scale * 0.1;
      return t
        .withScale(newScale)
        .withTranslate(
          t.translate
            .add(t.translate.add(Vector.fromNumber(5)).scale(t.scale))
            .subtract(t.translate.add(Vector.fromNumber(5)).scale(newScale))
        );
    });
  }
}
