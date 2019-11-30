import React, { FC, PointerEvent, useRef } from "react";
import { classesMap } from "../../../../utils/classesMap";
import { useObservable } from "../../../../utils/useObservable";
import { DrawingService } from "../../services/modebased/DrawingService";
import { pointInSvgFromEvent } from "../../../../utils/pointInSvgFromEvent";
import { toVectorInSvg } from "../../../../utils/toVectorInSvg";
import { Vector } from "../../../../utils/Vector";
import { toSvgPoint } from "../../../../utils/toSvgPoint";

interface Props {
  drawingService: DrawingService;
  name: string;
}

const ID_PREFIX = "drawing-";
const ID_PREFIX_LENGTH = ID_PREFIX.length;

export const DrawingPane: FC<Props> = ({ drawingService, name }: Props) => {
  const drawingPane = useObservable(drawingService.pane$, null);
  const drawingMode = useObservable(drawingService.drawingMode$, "draw");
  const drawingsGroupRef = useRef<SVGGElement | null>(null);

  const onPointerMove = (e: PointerEvent<SVGGraphicsElement>): void => {
    if (
      drawingService.drawingMode === "erase" &&
      e.buttons === 1 &&
      drawingsGroupRef.current
    ) {
      const groupElement = drawingsGroupRef.current;
      const svgPoint = toSvgPoint(Vector.fromClientCoords(e), groupElement);

      groupElement.childNodes.forEach(n => {
        if (n instanceof SVGPolylineElement) {
          if (n.isPointInStroke(svgPoint)) {
            const drawingId = n.id.substring(ID_PREFIX_LENGTH);
            drawingService.removeDrawing(drawingId);
          }
        }
      });
    }
  };

  return (
    drawingPane && (
      <>
        {
          <g id={name} className={`drawing-pane ${name} ${drawingMode} `}>
            <rect
              x={-500}
              y={-500}
              width={1000}
              height={1000}
              className={`drawing-pane-background ${name}`}
              onPointerMove={onPointerMove}
            />
            <g ref={drawingsGroupRef}>
              {drawingPane.drawings.map(drawing => (
                <polyline
                  id={`${ID_PREFIX}${drawing.id}`}
                  key={drawing.id}
                  className={classesMap({
                    drawing: true,
                    current: drawing.id === "current",
                    [`drawing-${drawing.color}`]: true,
                    [`drawing-${drawing.width}`]: true
                  })}
                  points={drawing.svgPath}
                />
              ))}
            </g>
          </g>
        }
      </>
    )
  );
};
