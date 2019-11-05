import React, { FC } from "react";
import { BattleGrid } from "../../common/BattleGrid";

interface Props {
  width: number;
  height: number;
}

export const BackgroundGrid: FC<Props> = ({ width, height }: Props) => {
  return (
    <BattleGrid width={width} height={height}>
      {(x, y) => (
        <rect
          key={`${x}/${y}`}
          className="background-grid"
          x={x}
          y={y}
          height={1}
          width={1}
        />
      )}
    </BattleGrid>
  );
};
