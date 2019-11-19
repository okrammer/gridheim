import { Point } from "./types";
import { PointerEvent as ReactPointerEvent, useRef, useState } from "react";
import { pointInSvgFromEvent } from "./pointInSvgFromEvent";
import { pointDistance } from "./pointDistance";
export interface DraggingEvent {
  current: Point;
  last: Point;
  start: Point;
}
export interface SvgDraggingConfig {
  onStart?: (this: SvgDraggingConfig, start: Point) => void;
  onMove: (this: SvgDraggingConfig, e: DraggingEvent) => void;
  onFinished?:
    | ((this: SvgDraggingConfig, e: DraggingEvent) => void)
    | "useOnMove";
  onCancel?: () => void;
}

export interface SvgDrag {
  dragging: boolean;
  eventHandler: {
    onPointerDown: (e: ReactPointerEvent<SVGGraphicsElement>) => void;
  };
}

export const useDragSvg = (config: SvgDraggingConfig): SvgDrag => {
  const draggingRef = useRef(false);
  const [returnedDragging, setReturnedDragging] = useState(false);
  const startPoint = useRef<Point | null>(null);
  const lastPoint = useRef<Point | null>(null);
  const configRef = useRef(config);
  configRef.current = config;

  const setDragging = (dragging: boolean): void => {
    draggingRef.current = dragging;
    setReturnedDragging(dragging);
  };

  const onPointerDown = (e: ReactPointerEvent<SVGGraphicsElement>): void => {
    const svgTarget = e.currentTarget;
    const point = pointInSvgFromEvent(e);
    if (!draggingRef.current) {
      setDragging(true);
      startPoint.current = point;
      if (configRef.current.onStart) {
        configRef.current.onStart(point);
      }

      const onPointerMove = (e: PointerEvent): void => {
        const point = pointInSvgFromEvent({
          clientX: e.clientX,
          clientY: e.clientY,
          currentTarget: svgTarget
        });
        configRef.current.onMove({
          current: point,
          start: startPoint.current!,
          last: lastPoint.current || startPoint.current!
        });
        lastPoint.current = point;
      };

      const onPointerUp = (e: PointerEvent): void => {
        const point = pointInSvgFromEvent({
          clientX: e.clientX,
          clientY: e.clientY,
          currentTarget: svgTarget
        });

        const d = startPoint.current
          ? pointDistance(startPoint.current, point)
          : -1;

        if (d > 0.5) {
          if (configRef.current.onFinished) {
            const fn =
              configRef.current.onFinished === "useOnMove"
                ? configRef.current.onMove
                : configRef.current.onFinished;

            fn.bind(configRef.current)({
              current: point,
              start: startPoint.current!,
              last: lastPoint.current || startPoint.current!
            });
          }

          setDragging(false);
          lastPoint.current = null;
          document.removeEventListener("pointermove", onPointerMove);
          document.removeEventListener("pointerup", onPointerUp);
        }
      };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    }
  };

  return {
    dragging: returnedDragging,
    eventHandler: {
      onPointerDown
    }
  };
};
