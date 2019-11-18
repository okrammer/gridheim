import React, { FC } from "react";
import { Square } from "../../../../model/Square";
import { BattleGrid } from "../../common/BattleGrid";
import { classesMap } from "../../../../utils/classesMap";
import { Dict } from "../../../../utils/types";

interface Props {
  width: number;
  height: number;
  highlightedSquares: ReadonlyArray<Square>;
  onClick: (square: Square) => void;
  onHover: (square: Square) => void;
}

export const SelectionGrid: FC<Props> = ({
  onClick,
  width,
  height,
  highlightedSquares,
  onHover
}: Props) => {
  const highlightedMap = highlightedSquares.reduce(
    (map, square) => {
      map[square.toCoordinateString()] = true;
      return map;
    },
    {} as Dict<boolean>
  );

  return (
    <BattleGrid width={width} height={height}>
      {(x, y) => {
        const square = new Square(x, y);
        return (
          <rect
            key={square.toCoordinateString()}
            className={classesMap({
              "selection-grid": true,
              highlighted: highlightedMap[square.toCoordinateString()]
            })}
            x={x}
            y={y}
            height={1}
            width={1}
            onClick={() => onClick && onClick(square)}
            onMouseOver={() => onHover(square)}
          />
        );
      }}
    </BattleGrid>
  );
};
