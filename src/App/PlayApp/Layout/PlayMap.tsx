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
import { ZoomPane } from "./PlayMap/ZoomPane";
import { is } from "../../../utils/is";
import { combineLatest } from "rxjs";
import { BackgroundGrid } from "./PlayMap/BackgroundGrid";
import { SelectionGrid } from "./PlayMap/SelectionGrid";
import { ViewBox } from "../../../model/ViewBox";

interface Props {
  battleMapService: BattleMapService;
  backgroundDrawingService: DrawingService;
  notesDrawingService: DrawingService;
  modeService: ModeService;
}

export const PlayMap: FC<Props> = ({
  battleMapService,
  backgroundDrawingService,
  notesDrawingService,
  modeService
}: Props) => {
  const viewBox = useObservable(
    battleMapService.viewBox$,
    new ViewBox(0, 0, 0, 0)
  );
  const tokens = useObservable(battleMapService.tokens$, []);
  const notesDrawing = useObservable(notesDrawingService.active$, false);
  const squareSelectable = useObservable(
    combineLatest([
      battleMapService.squareSelectable$,
      modeService.mode$.pipe(map(is("play", "manage-token")))
    ]).pipe(map(([a, b]) => a && b)),
    false
  );
  const zoomActive = useObservable(
    modeService.mode$.pipe(map(is("zoom"))),
    false
  );
  const gridMap = useObservable(battleMapService.gridMap$, null);
  const scale = useObservable(battleMapService.scale$, battleMapService.scale);
  const position = useObservable(
    battleMapService.position$,
    battleMapService.position
  );
  const highlightedSquares = useObservable(
    battleMapService.highlightedSquares$,
    []
  );
  return (
    <>
      {gridMap && (
        <svg className="h-100 w-100" viewBox={viewBox.toViewBoxString()}>
          <g
            transform={`translate(${position.x} ${position.y}) scale(${scale}, ${scale})`}
          >
            <DisplayBackgroundImage gridMap={gridMap} />
            <BackgroundGrid
              width={gridMap.getWidthInSquares()}
              height={gridMap.getHeightInSquares()}
            />
            <DrawingPane
              name="background"
              drawingService={backgroundDrawingService}
            />
            {squareSelectable && (
              <SelectionGrid
                width={gridMap.getWidthInSquares()}
                height={gridMap.getHeightInSquares()}
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
          </g>
          {zoomActive && <ZoomPane battleMapService={battleMapService} />}
        </svg>
      )}
    </>
  );
};
