import { Rect } from "../../../../../utils/Rect";

export interface TransformParams {
  rect1: Rect;
  rect2: Rect;
  axis: "x" | "y";
  distance: number;
  squareCount: number;
}
