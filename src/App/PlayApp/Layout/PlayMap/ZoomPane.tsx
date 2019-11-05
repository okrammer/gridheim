import React, { FC, MouseEvent, PointerEvent, useRef, useState } from "react";
import { range } from "../../../../utils/range";
import { pointInSvgFromEvent } from "../../../../utils/pointInSvgFromEvent";
import { BattleMapService } from "../../services/BattleMapService";

interface Props {
  battleMapService: BattleMapService;
}

export const ZoomPane: FC<Props> = ({ battleMapService }: Props) => {
  const [factor, setFactor] = useState(0);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [startPosBead, setStartPosBead] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const paneRef = useRef<SVGRectElement>(null);
  const [moving, setMoving] = useState(false);

  const updateFactor = (e: React.PointerEvent<SVGCircleElement>): void => {
    if (!startPosBead) {
      return;
    }
    const currentPos = pointInSvgFromEvent(e);
    const diffX = currentPos.x - startPosBead.x;
    setFactor(diffX);
    battleMapService.switchScale(diffX);
  };

  const onBeadMouseMove = (e: PointerEvent<SVGCircleElement>): void => {
    updateFactor(e);
  };

  const onBeadMouseDown = (e: PointerEvent<SVGCircleElement>): void => {
    const { x, y } = pointInSvgFromEvent(e);
    setStartPosBead({ x: x - factor, y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onBeadMouseUp = (e: PointerEvent<SVGCircleElement>): void => {
    updateFactor(e);
    setStartPosBead(null);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onClickOnPane = (e: MouseEvent<SVGRectElement>): void => {
    setPos(pointInSvgFromEvent(e));
  };

  const updatePosition = (e: React.PointerEvent<SVGCircleElement>): void => {
    if (!pos || !moving) {
      return;
    }
    const currentPos = pointInSvgFromEvent(e, paneRef.current!);
    const diffX = currentPos.x - pos.x;
    const diffY = currentPos.y - pos.y;
    setPos(currentPos);
    battleMapService.movePosition(diffX, diffY);
  };

  const onControlMouseMove = (e: PointerEvent<SVGCircleElement>): void => {
    updatePosition(e);
  };

  const onControlMouseDown = (e: PointerEvent<SVGCircleElement>): void => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setMoving(true);
    updatePosition(e);
  };

  const onControlMouseUp = (e: PointerEvent<SVGCircleElement>): void => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setMoving(false);
    updatePosition(e);
  };

  return (
    <>
      <rect
        ref={paneRef}
        x={-500}
        y={-500}
        width={1000}
        height={1000}
        className="zoom-pane"
        onClick={onClickOnPane}
      />

      {pos && (
        <g className="zoom-control" transform={`translate(${pos.x} ${pos.y})`}>
          {range(50).map(i => (
            <circle
              className="zoom-control-bead"
              key={`${Math.ceil(i - factor - 1)}`}
              cx={1 + i + (factor % 1)}
              cy={0}
              r={0.2}
              onPointerDownCapture={onBeadMouseDown}
              onPointerMoveCapture={onBeadMouseMove}
              onPointerUpCapture={onBeadMouseUp}
            />
          ))}
          <circle
            className="zoom-control-center"
            cx={0}
            cy={0}
            r={0.5}
            onPointerDownCapture={onControlMouseDown}
            onPointerMoveCapture={onControlMouseMove}
            onPointerUpCapture={onControlMouseUp}
          />
        </g>
      )}
    </>
  );
};
