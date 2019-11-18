import React, { FC, ReactChild, ReactChildren } from "react";
import { range } from "../../../utils/range";

interface Props {
  width: number;
  height: number;
  children: (x: number, y: number) => ReactChildren | ReactChild;
}

export const BattleGrid: FC<Props> = ({ children, width, height }: Props) => {
  return <>{range(width).map(x => range(height).map(y => children(x, y)))}</>;
};
