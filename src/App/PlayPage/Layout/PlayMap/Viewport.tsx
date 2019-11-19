import React, { FC, ReactNode, useEffect, useRef } from "react";
import { useStateRef } from "../../../../utils/useStateRef";
import { pointInSvgFromEvent } from "../../../../utils/pointInSvgFromEvent";
import { useDragSvg } from "../../../../utils/useDragSvg";
import { classesMap } from "../../../../utils/classesMap";

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

  const [getTransformation, setTransformation] = useStateRef({
    translate: { x: 0, y: 0 },
    scale: initialScale
  });
  useEffect(() => {
    const onWheel = (e: WheelEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      const mousePosition = pointInSvgFromEvent(e as any, groupRef.current!);

      const t = getTransformation();
      const newScale = t.scale - t.scale * e.deltaY * 0.01;

      setTransformation({
        scale: newScale,
        translate: {
          x:
            t.translate.x -
            mousePosition.x * newScale +
            mousePosition.x * t.scale,
          y:
            t.translate.y -
            mousePosition.y * newScale +
            mousePosition.y * t.scale
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
      const dx = e.current.x - e.last.x;
      const dy = e.current.y - e.last.y;
      const t = getTransformation();
      setTransformation({
        scale: t.scale,
        translate: { x: t.translate.x + dx, y: t.translate.y + dy }
      });
    }
  });

  const t = getTransformation();

  return (
    <>
      <g
        {...(draggingEnabled ? drag.eventHandler : {})}
        className={classesMap({
          viewport: draggingEnabled,
          viewport_dragging: drag.dragging
        })}
      >
        <g
          transform={`translate(${t.translate.x} ${t.translate.y}) scale(${t.scale}, ${t.scale})`}
        >
          <g ref={groupRef}>{children}</g>
        </g>
      </g>
    </>
  );
};
