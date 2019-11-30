import { Vector } from "./Vector";
import { toSvgPoint } from "./toSvgPoint";

export function toVectorInSvg(
  clientVector: Vector,
  target: SVGGraphicsElement
): Vector {
  const element = target!;
  const svgPoint = toSvgPoint(clientVector, element);
  return Vector.fromCoords(svgPoint);
}
