import React, { FC } from "react";
import { classesMap } from "../../../../utils/classesMap";
import { useObservable } from "../../../../utils/useObservable";
import { DrawingService } from "../../services/modebased/DrawingService";

interface Props {
  drawingService: DrawingService;
  name: string;
}

export const DrawingPane: FC<Props> = ({ drawingService, name }: Props) => {
  const drawingPane = useObservable(drawingService.pane$, null);
  const drawingMode = useObservable(drawingService.drawingMode$, "draw");
  const onClick = (drawingId: string) => {
    return (): void => {
      if (drawingService.drawingMode !== "erase") {
        return;
      }

      drawingService.removeDrawing(drawingId);
    };
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
            />
            {drawingPane.drawings.map(drawing => (
              <polyline
                key={drawing.id}
                className={classesMap({
                  drawing: true,
                  current: drawing.id === "current",
                  [`drawing-${drawing.color}`]: true,
                  [`drawing-${drawing.width}`]: true
                })}
                points={drawing.svgPath}
                onClick={onClick(drawing.id)}
              />
            ))}
          </g>
        }
      </>
    )
  );
};
