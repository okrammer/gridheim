import React, { FC, ReactNode, useEffect, useRef } from "react";
import { pointInSvgFromEvent } from "../../../../utils/pointInSvgFromEvent";
import { useDragSvg } from "../../../../utils/useDragSvg";
import { classesMap } from "../../../../utils/classesMap";
import { Vector } from "../../../../utils/Vector";
import { useTouch } from "../../../../utils/useTouch";
import { ViewportService } from "../../services/ViewportService";
import { useObservable } from "../../../../utils/useObservable";
import { Transform } from "../../../../utils/Transform";

interface Props {
  viewportService: ViewportService;
  children: ReactNode;
}

export const Viewport: FC<Props> = ({ viewportService, children }: Props) => {
  const groupRef = useRef<SVGGraphicsElement | null>(null);
  const outerGroupRef = useRef<SVGGraphicsElement | null>(null);
  const transform = useObservable(
    viewportService.transform$,
    Transform.identity
  );
  const draggingEnabled = useObservable(
    viewportService.mouseDragEnabled$,
    false
  );
  const touchEnabled = useObservable(viewportService.touchEnabled$, false);

  useEffect(() => {
    const onWheel = (e: WheelEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      const mousePosition = pointInSvgFromEvent(e as any, groupRef.current!);

      viewportService.updateTransform(t => {
        if (e.ctrlKey) {
          const newScale = t.scale - t.scale * e.deltaY * 0.01;
          return t
            .withTranslate(
              t.translate
                .subtract(mousePosition.scale(newScale))
                .add(mousePosition.scale(t.scale))
            )
            .withScale(newScale);
        } else {
          const delta = Vector.fromDeltaCoords(e);
          return t.withTranslate(t.translate.subtract(delta.scale(0.01)));
        }
      });
    };

    document.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", onWheel);
    };
  }, []);

  const drag = useDragSvg({
    onMove: e => {
      viewportService.updateTransform(t =>
        t.withTranslate(t.translate.add(e.delta))
      );
    }
  });

  const multiTouch = useTouch({
    onMove: e => {
      viewportService.updateTransform(t => {
        const scaleFactor =
          e.current.distance && e.last.distance
            ? e.current.distance / e.last.distance
            : 1;

        const oldPointOnMap = e.current.position
          .subtract(t.translate)
          .scale(1 / t.scale);

        const newPointOnMap = e.current.position
          .subtract(t.translate)
          .scale(1 / (t.scale * scaleFactor));

        return t
          .withScale(t.scale * scaleFactor)
          .withTranslate(
            t.translate
              .add(
                newPointOnMap
                  .subtract(oldPointOnMap)
                  .scale(t.scale * scaleFactor)
              )
              .add(e.current.position.subtract(e.last.position))
          );
      });
    },
    svgTargetRef: outerGroupRef
  });

  return (
    <>
      <g
        {...(draggingEnabled ? drag.eventHandler : {})}
        {...(touchEnabled ? multiTouch.eventHandlers : {})}
        className={classesMap({
          viewport: draggingEnabled,
          viewport_dragging: drag.dragging
        })}
        ref={outerGroupRef}
      >
        <g {...transform.translateScaleAttribute}>
          <g ref={groupRef}>{children}</g>
        </g>
      </g>
    </>
  );
};
