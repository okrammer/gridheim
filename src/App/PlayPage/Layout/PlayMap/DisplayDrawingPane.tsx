import React, { FC, PointerEvent, useRef, useState } from "react";
import { classesMap } from "../../../../utils/classesMap";
import { useObservable } from "../../../../utils/useObservable";
import { DrawingService } from "../../services/modebased/DrawingService";
import { Vector } from "../../../../utils/Vector";
import { toSvgPoint } from "../../../../utils/toSvgPoint";

interface Props {
  drawingService: DrawingService;
  name: string;
}

const ID_PREFIX = "drawing-";
const ID_PREFIX_LENGTH = ID_PREFIX.length;

export const DisplayDrawingPane: FC<Props> = ({
  drawingService,
  name
}: Props) => {
  const drawingPane = useObservable(drawingService.pane$, null);
  const drawingMode = useObservable(drawingService.drawingMode$, "draw");
  const drawingsGroupRef = useRef<SVGGElement | null>(null);
  const [rect, setRect] = useState<SVGRect | null>(null);

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
          if (n.isPointInStroke(svgPoint) || n.isPointInFill(svgPoint)) {
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
          <g
            id={name}
            className={`drawing-pane ${name} ${drawingMode} `}
            // The event handler must be placed on the <g> otherwise, no events are emitted when touching a polyline
            onPointerMove={onPointerMove}
          >
            <rect
              x={-500}
              y={-500}
              width={1000}
              height={1000}
              className={`drawing-pane-background ${name}`}
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
            {rect && (
              <rect
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill="blue"
              />
            )}
          </g>
        }
      </>
    )
  );
};
