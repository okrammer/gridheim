export type MouseEventOnSvg = {
  currentTarget: SVGGraphicsElement;
  clientX: number;
  clientY: number;
};
type PointLike = { x: number; y: number };

export function pointInSvgFromEvent(
  e: MouseEventOnSvg,
  target: SVGGraphicsElement = e.currentTarget
): PointLike {
  const element = target!;
  const svgPoint = element.ownerSVGElement!.createSVGPoint();
  svgPoint.x = e.clientX;
  svgPoint.y = e.clientY;
  const pointInSvg = svgPoint.matrixTransform(
    element.getScreenCTM()!.inverse()
  );
  return pointInSvg;
}
