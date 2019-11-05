import React, { FC, PointerEvent, useState } from "react";
import { DrawingService } from "../../services/modebased/DrawingService";
import { Subject } from "rxjs";
import { useObservable } from "../../../../utils/useObservable";
import { pointInSvgFromEvent } from "../../../../utils/pointInSvgFromEvent";

interface Props {
  drawingService: DrawingService;
}

export const DrawingCapturePane: FC<Props> = ({ drawingService }: Props) => {
  const [pointSubject, setPointSubject] = useState<Subject<
    [number, number]
  > | null>(null);
  const active = useObservable(drawingService.active$, false);
  const drawingMode = useObservable(drawingService.drawingMode$, "draw");

  const completeDrawing = (e: PointerEvent<SVGRectElement>): void => {
    if (!pointSubject) {
      return;
    }

    pointSubject.complete();
    setPointSubject(null);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onMouseMove = (e: PointerEvent<SVGRectElement>): void => {
    if (!pointSubject) {
      return;
    }
    const pointInSvg = pointInSvgFromEvent(e);
    pointSubject.next([pointInSvg.x, pointInSvg.y]);
  };

  const onMouseDown = (e: PointerEvent<SVGRectElement>): void => {
    if (!drawingService.active) {
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);

    const subject = new Subject<[number, number]>();
    setPointSubject(subject);
    drawingService.currentlyDrawing(subject);
  };

  const onMouseUp = (e: PointerEvent<SVGRectElement>): void => {
    completeDrawing(e);
  };

  return (
    <>
      {drawingMode === "draw" && active && (
        <rect
          x={-500}
          y={-500}
          width={1000}
          height={1000}
          className="drawing-capture-pane"
          onPointerDown={onMouseDown}
          onPointerUp={onMouseUp}
          onPointerCancel={e => console.log("canceled", { ...e })}
          onPointerMove={onMouseMove}
        />
      )}
    </>
  );
};
