import { Vector } from "./Vector";

export const toSvgPoint = (
  clientVector: Vector,
  element: SVGGraphicsElement
): SVGPoint => {
  const svgPoint = element.ownerSVGElement!.createSVGPoint();
  svgPoint.x = clientVector.x;
  svgPoint.y = clientVector.y;
  const pointInSvg = svgPoint.matrixTransform(
    element.getScreenCTM()!.inverse()
  );
  return pointInSvg;
};
