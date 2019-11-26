import { Vector } from "./Vector";
import { toVectorInSvg } from "./toVectorInSvg";

export type MouseEventOnSvg = {
  currentTarget: SVGGraphicsElement;
  clientX: number;
  clientY: number;
};

export function pointInSvgFromEvent(
  e: MouseEventOnSvg,
  target: SVGGraphicsElement = e.currentTarget
): Vector {
  return toVectorInSvg(Vector.fromClientCoords(e), target!);
}
