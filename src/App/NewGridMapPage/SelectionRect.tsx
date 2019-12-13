import React, { FC, useState } from "react";
import { range } from "../../utils/range";
import { SvgDrag, useDragSvg } from "../../utils/useDragSvg";
import { Vector } from "../../utils/Vector";
import { Rect } from "../../utils/Rect";

interface Props {
  width: number;
  height: number;
  rect: Rect | null;
  onChange: (rect: Rect | null) => void;
}

export const SelectionRect: FC<Props> = ({
  rect,
  width,
  height,
  onChange
}: Props) => {
  const [selectionRect, setSelectionRect] = useState<Rect | null>(
    rect &&
      new Rect(
        rect.topLeft.subtract(Vector.fromNumber(rect.sideLength)),
        rect.sideLength * 3
      )
  );

  const updateRect = (rect: Rect | null): void => {
    setSelectionRect(rect);
    const r = rect && rect.normalized;
    onChange(
      r
        ? new Rect(
            r.topLeft.add(Vector.fromNumber(r.sideLength / 3)),
            r.sideLength / 3
          )
        : null
    );
  };

  const strokeSize = width / 600;

  const dragRect = useDragSvg({
    onStart: startPoint => {
      setSelectionRect(new Rect(startPoint, 0));
    },
    onMove: ({ current }) => {
      if (selectionRect) {
        const d = current.subtract(selectionRect.topLeft).maxComponent;
        updateRect(selectionRect.withSideLength(d));
      }
    },
    onCancel: () => {
      updateRect(null);
    }
  });

  const useDragCorner = (
    changeRect: (point: Vector, rect: Rect) => Rect
  ): SvgDrag => {
    const cornerDragging = useDragSvg({
      onMove: ({ current }) => {
        if (selectionRect) {
          updateRect(changeRect(current, selectionRect));
        }
      },
      onCancel: () => {
        setSelectionRect(null);
      }
    });
    return cornerDragging;
  };

  const dragCornerMatrix = [
    [
      useDragCorner((p, rect) => rect.moveTopLeftTo(p)),
      useDragCorner((p, rect) => rect.moveBottomLeftTo(p))
    ],
    [
      useDragCorner((p, rect) => rect.moveTopRightTo(p)),
      useDragCorner((p, rect) => rect.moveBottomRightTo(p))
    ]
  ];

  const r = selectionRect && selectionRect.normalized;

  return (
    <g>
      <rect
        fillOpacity={0.01}
        x={0}
        y={0}
        width={width}
        height={height}
        {...dragRect.eventHandler}
      />
      {r && (
        <g>
          {range(3).flatMap(x =>
            range(3).map(y => (
              <rect
                key={`${x}/${y}`}
                x={r.topLeft.x + (x * r.sideLength) / 3}
                y={r.topLeft.y + (y * r.sideLength) / 3}
                width={r.sideLength / 3}
                height={r.sideLength / 3}
                stroke={dragRect.dragging ? "#0f86ff" : "red"}
                fillOpacity={0}
                strokeDasharray={`${strokeSize} ${strokeSize}`}
                strokeWidth={strokeSize}
              />
            ))
          )}
          {!dragRect.dragging &&
            selectionRect &&
            range(2).flatMap(x =>
              range(2).map(y => {
                const drag = dragCornerMatrix[x][y];
                return (
                  <rect
                    key={`${x}/${y}`}
                    x={
                      selectionRect.topLeft.x +
                      x * selectionRect.sideLength -
                      strokeSize * 3
                    }
                    y={
                      selectionRect.topLeft.y +
                      y * selectionRect.sideLength -
                      strokeSize * 3
                    }
                    width={strokeSize * 6}
                    height={strokeSize * 6}
                    strokeOpacity={0}
                    fill={drag.dragging ? "#0f86ff" : "red"}
                    {...drag.eventHandler}
                  />
                );
              })
            )}
        </g>
      )}
    </g>
  );
};
