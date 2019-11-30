import React, { FC } from "react";
import { BattleMapService } from "../services/BattleMapService";
import { DisplayBackgroundImage } from "./PlayMap/DisplayBackgroundImage";
import { DisplayTokens } from "./PlayMap/DisplayTokens";
import { useObservable } from "../../../utils/useObservable";
import { DrawingCapturePane } from "./PlayMap/DrawingCapturePane";
import { DrawingService } from "../services/modebased/DrawingService";
import { DrawingPane } from "./PlayMap/DrawingPane";
import { ModeService } from "../services/ModeService";
import { map } from "rxjs/operators";
import { Viewport } from "./PlayMap/Viewport";
import { is } from "../../../utils/is";
import { combineLatest } from "rxjs";
import { BackgroundGrid } from "./PlayMap/BackgroundGrid";
import { SelectionGrid } from "./PlayMap/SelectionGrid";
import { SaveSessionService } from "../services/SaveSessionService";
import { ViewportService } from "../services/ViewportService";
import { ImageGridMap } from "../../../model/ImageGridMap";

interface Props {
  battleMapService: BattleMapService;
  backgroundDrawingService: DrawingService;
  notesDrawingService: DrawingService;
  modeService: ModeService;
  saveSessionService: SaveSessionService;
  viewportService: ViewportService;
}

export const PlayMap: FC<Props> = ({
  saveSessionService,
  battleMapService,
  backgroundDrawingService,
  notesDrawingService,
  modeService,
  viewportService
}: Props) => {
  const tokens = useObservable(battleMapService.tokens$, []);
  const notesDrawing = useObservable(notesDrawingService.active$, false);
  const viewBox = useObservable(viewportService.viewBox$, null);

  const squareSelectable = useObservable(
    combineLatest([
      battleMapService.squareSelectable$,
      modeService.mode$.pipe(map(is("play", "manage-token")))
    ]).pipe(map(([a, b]) => a && b)),
    false
  );

  const gridMap = useObservable(saveSessionService.gridMap$, null);
  const highlightedSquares = useObservable(
    battleMapService.highlightedSquares$,
    []
  );

  return (
    <>
      {gridMap && viewBox && (
        <svg className="h-100 w-100" viewBox={viewBox.toViewBoxString()}>
          <Viewport viewportService={viewportService}>
            {gridMap instanceof ImageGridMap && (
              <DisplayBackgroundImage gridMap={gridMap} />
            )}
            <BackgroundGrid
              width={gridMap.widthInSquares}
              height={gridMap.heightInSquares}
            />
            <DrawingPane
              name="background"
              drawingService={backgroundDrawingService}
            />
            {squareSelectable && (
              <SelectionGrid
                width={gridMap.widthInSquares}
                height={gridMap.heightInSquares}
                highlightedSquares={highlightedSquares}
                onClick={s => battleMapService.selectSquare(s)}
                onHover={s => battleMapService.hoverOverSquare(s)}
              />
            )}
            <DisplayTokens
              tokens={tokens}
              selectedToken$={battleMapService.selectedToken$}
              onClick={token => battleMapService.selectToken(token)}
            />
            {// disable this component here, so the background DrawingPane is always shown...
            notesDrawing && (
              <DrawingPane name="notes" drawingService={notesDrawingService} />
            )}

            <DrawingCapturePane drawingService={notesDrawingService} />
            <DrawingCapturePane drawingService={backgroundDrawingService} />
          </Viewport>
        </svg>
      )}
    </>
  );
};
