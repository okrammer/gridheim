import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useStateRef } from "../../../../utils/useStateRef";
import { pointInSvgFromEvent } from "../../../../utils/pointInSvgFromEvent";
import { useDragSvg } from "../../../../utils/useDragSvg";
import { classesMap } from "../../../../utils/classesMap";
import { Vector } from "../../../../utils/Vector";
import { useTouch } from "../../../../utils/useTouch";
import { newSessionAction } from "../../../StartPage/actions/NewSessionAction";

interface Props {
  draggingEnabled: boolean;
  initialScale: number;
  children: ReactNode;
}

export const Viewport: FC<Props> = ({
  initialScale,
  children,
  draggingEnabled
}: Props) => {
  const groupRef = useRef<SVGGraphicsElement | null>(null);
  const outerGroupRef = useRef<SVGGraphicsElement | null>(null);

  const [getTransformation, setTransformation, transformation] = useStateRef({
    translate: Vector.zero,
    scale: initialScale
  });
  useEffect(() => {
    const onWheel = (e: WheelEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      const mousePosition = pointInSvgFromEvent(e as any, groupRef.current!);

      const t = getTransformation();
      if (e.ctrlKey) {
        const newScale = t.scale - t.scale * e.deltaY * 0.01;

        setTransformation({
          scale: newScale,
          translate: t.translate
            .subtract(mousePosition.scale(newScale))
            .add(mousePosition.scale(t.scale))
        });
      } else {
        const delta = Vector.fromDeltaCoords(e);
        setTransformation({
          scale: t.scale,
          translate: t.translate.subtract(delta.scale(0.01))
        });
      }
    };
    document.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", onWheel);
    };
  }, []);

  const drag = useDragSvg({
    onMove: e => {
      const t = getTransformation();
      setTransformation({
        scale: t.scale,
        translate: t.translate.add(e.delta)
      });
    }
  });

  const multiTouch = useTouch({
    onMove: e => {
      const t = getTransformation();
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

      const newT = {
        scale: t.scale * scaleFactor,
        translate: t.translate
          .add(
            newPointOnMap.subtract(oldPointOnMap).scale(t.scale * scaleFactor)
          )
          .add(e.current.position.subtract(e.last.position))
      };
      setTransformation(newT);
    },
    svgTargetRef: outerGroupRef
  });

  return (
    <>
      <g
        {...(draggingEnabled ? drag.eventHandler : {})}
        {...multiTouch.eventHandlers}
        className={classesMap({
          viewport: draggingEnabled,
          viewport_dragging: drag.dragging
        })}
        ref={outerGroupRef}
      >
        <g
          transform={
            `translate(${transformation.translate.x} ${transformation.translate.y})` +
            `scale(${transformation.scale}, ${transformation.scale})`
          }
        >
          <g ref={groupRef}>{children}</g>
        </g>
      </g>
    </>
  );
};
