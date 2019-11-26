import { PointerEvent as ReactPointerEvent, useRef, useState } from "react";
import { pointInSvgFromEvent } from "./pointInSvgFromEvent";
import { Vector } from "./Vector";

const CLICK_TIMEOUT_MILLIS = 300;

export interface DraggingEvent {
  current: Vector;
  last: Vector;
  delta: Vector;
}

export interface SvgDraggingConfig {
  onStart?: (startPoint: Vector) => void;
  onMove: (e: DraggingEvent) => void;
  onEnd?: () => void;
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
  const lastPoint = useRef<Vector | null>(null);
  const configRef = useRef(config);
  configRef.current = config;

  const setDragging = (dragging: boolean): void => {
    draggingRef.current = dragging;
    setReturnedDragging(dragging);
  };

  const onPointerDown = (e: ReactPointerEvent<SVGGraphicsElement>): void => {
    const svgTarget = e.currentTarget;
    const point = pointInSvgFromEvent(e);
    const startTime = Date.now();
    if (!draggingRef.current) {
      setDragging(true);
      lastPoint.current = point;
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
          last: lastPoint.current!,
          delta: point.subtract(lastPoint.current!)
        });
        lastPoint.current = point;
      };

      const onPointerUp = (e: PointerEvent): void => {
        if (Date.now() - startTime > CLICK_TIMEOUT_MILLIS) {
          if (configRef.current.onEnd) {
            configRef.current.onEnd();
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
