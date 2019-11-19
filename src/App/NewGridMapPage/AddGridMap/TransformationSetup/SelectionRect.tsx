import React, { FC, useState } from "react";
import { range } from "../../../../utils/range";
import { Point } from "../../../../utils/types";
import { SvgDrag, useDragSvg } from "../../../../utils/useDragSvg";

export interface Rect {
  x: number;
  y: number;
  a: number;
}

interface Props {
  width: number;
  height: number;
  onChange: (rect: Rect | null) => void;
}

export const SelectionRect: FC<Props> = ({
  width,
  height,
  onChange
}: Props) => {
  const [selectionRect, setSelectionRect] = useState<Rect | null>(null);
  const updateRect = (rect: Rect | null): void => {
    setSelectionRect(rect);
    onChange(
      rect
        ? { x: rect.x + rect.a / 3, y: rect.y + rect.a / 3, a: rect.a / 3 }
        : null
    );
  };

  const strokeSize = width / 600;

  const dragRect = useDragSvg({
    onStart: ({ x, y }) => {
      setSelectionRect({ x, y, a: 0 });
    },
    onMove: ({ current: { x, y } }) => {
      if (selectionRect) {
        const dx = x - selectionRect.x;
        const dy = y - selectionRect.y;
        const a = Math.max(0, Math.max(dx, dy));
        updateRect({ ...selectionRect, a });
      }
    },
    onFinished: "useOnMove",
    onCancel: () => {
      updateRect(null);
    }
  });

  const useDragCorner = (
    changeRect: (point: Point, rect: Rect) => Rect
  ): SvgDrag => {
    const cornerDragging = useDragSvg({
      onMove: ({ current }) => {
        if (selectionRect) {
          updateRect(changeRect(current, selectionRect));
        }
      },
      onFinished: "useOnMove",
      onCancel: () => {
        setSelectionRect(null);
      }
    });
    return cornerDragging;
  };

  const dragCornerMatrix = [
    [
      useDragCorner(({ x, y }, rect) => {
        const d = Math.max(rect.x - x, rect.y - y);
        return {
          x: rect.x - d,
          y: rect.y - d,
          a: rect.a + d
        };
      }),
      useDragCorner(({ x, y }, rect) => {
        const d = Math.max(rect.x - x, y - rect.y - rect.a);
        return {
          ...rect,
          x: rect.x - d,
          a: rect.a + d
        };
      })
    ],
    [
      useDragCorner(({ x, y }, rect) => {
        const d = Math.max(x - rect.x - rect.a, rect.y - y);
        return {
          ...rect,
          y: rect.y - d,
          a: rect.a + d
        };
      }),
      useDragCorner(({ x, y }, rect) => {
        return {
          ...rect,
          a: Math.max(x - rect.x, y - rect.y)
        };
      })
    ]
  ];

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
      {selectionRect && (
        <g>
          {range(3).flatMap(x =>
            range(3).map(y => (
              <rect
                key={`${x}/${y}`}
                x={selectionRect.x + (x * selectionRect.a) / 3}
                y={selectionRect.y + (y * selectionRect.a) / 3}
                width={selectionRect.a / 3}
                height={selectionRect.a / 3}
                stroke={dragRect.dragging ? "#0f86ff" : "red"}
                fillOpacity={0}
                strokeDasharray={`${strokeSize} ${strokeSize}`}
                strokeWidth={strokeSize}
              />
            ))
          )}
          {!dragRect.dragging &&
            range(2).flatMap(x =>
              range(2).map(y => {
                const drag = dragCornerMatrix[x][y];
                return (
                  <rect
                    key={`${x}/${y}`}
                    x={selectionRect.x + x * selectionRect.a - strokeSize * 2}
                    y={selectionRect.y + y * selectionRect.a - strokeSize * 2}
                    width={strokeSize * 4}
                    height={strokeSize * 4}
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
