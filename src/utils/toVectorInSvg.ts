import { Vector } from "./Vector";

export function toVectorInSvg(
  clientVector: Vector,
  target: SVGGraphicsElement
): Vector {
  const element = target!;
  const svgPoint = element.ownerSVGElement!.createSVGPoint();
  svgPoint.x = clientVector.x;
  svgPoint.y = clientVector.y;
  const pointInSvg = svgPoint.matrixTransform(
    element.getScreenCTM()!.inverse()
  );
  return Vector.fromCoords(pointInSvg);
}
