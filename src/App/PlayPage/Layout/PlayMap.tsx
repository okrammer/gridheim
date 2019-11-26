import React, { FC, useEffect, useRef, useState } from "react";
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
import { ViewBox } from "../../../model/ViewBox";
import { windowAspectRatio } from "../../../utils/windowAspectRatio";
import { SaveSessionService } from "../services/SaveSessionService";

interface Props {
  battleMapService: BattleMapService;
  backgroundDrawingService: DrawingService;
  notesDrawingService: DrawingService;
  modeService: ModeService;
  saveSessionService: SaveSessionService;
}

const VIEW_BOX_SIZE = 10;

export const PlayMap: FC<Props> = ({
  saveSessionService,
  battleMapService,
  backgroundDrawingService,
  notesDrawingService,
  modeService
}: Props) => {
  const tokens = useObservable(battleMapService.tokens$, []);
  const notesDrawing = useObservable(notesDrawingService.active$, false);
  const draggingEnabled = useObservable(
    modeService.mode$.pipe(map(is("zoom"))),
    false
  );

  // disable touch when drawing
  const touchEnabled = useObservable(
    modeService.mode$.pipe(map(is("play", "manage-token", "zoom"))),
    false
  );

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
  const [viewBox] = useState(
    () => new ViewBox(0, 0, VIEW_BOX_SIZE, VIEW_BOX_SIZE / windowAspectRatio())
  );

  const initialScale =
    gridMap && viewBox
      ? Math.min(
          viewBox.width / gridMap.getWidthInSquares(),
          viewBox.height / gridMap.getHeightInSquares()
        )
      : 1;

  return (
    <>
      {gridMap && (
        <svg className="h-100 w-100" viewBox={viewBox.toViewBoxString()}>
          <Viewport
            initialScale={initialScale}
            draggingEnabled={draggingEnabled}
            touchEnabled={touchEnabled}
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
          </Viewport>
        </svg>
      )}
    </>
  );
};
