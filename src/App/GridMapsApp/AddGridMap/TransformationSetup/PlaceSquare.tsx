import React, { FC, PointerEvent, useEffect, useState } from "react";
import { Transformation } from "../../../../model/Transformation";
import Octicon, { Check, DiffAdded, DiffRemoved } from "@primer/octicons-react";
import { pointInSvgFromEvent } from "../../../../utils/pointInSvgFromEvent";
import { BackgroundImage } from "../../../../model/BackgroundImage";
import { ExplanationBox } from "../../../../common/ExplanationBox";

interface Props {
  image: BackgroundImage;
  onApply: (t: Transformation) => void;
}

interface Rect {
  x: number;
  y: number;
  a: number;
}

export const PlaceSquare: FC<Props> = ({ image, onApply }: Props) => {
  const [transformation, setTransformation] = useState(
    Transformation.default()
  );

  useEffect(() => {
    setTransformation(
      Transformation.default().with({
        scale: (600 / image.width) * 2,
        dx: 0,
        dy: 0
      })
    );
  }, [image]);

  const [selectionRect, setSelectionRect] = useState<Rect | null>(null);
  const [draw, setDraw] = useState(false);

  const zoomIn = (): void => {
    setTransformation(
      transformation.with({ scale: transformation.scale + 0.1 })
    );
  };

  const zoomOut = (): void => {
    setTransformation(
      transformation.with({ scale: transformation.scale - 0.1 })
    );
  };

  const onPointerDown = (e: PointerEvent<SVGGElement>): void => {
    const { x, y } = pointInSvgFromEvent(e);
    setSelectionRect({ x, y, a: 0 });
    setDraw(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<SVGGElement>): void => {
    if (draw && selectionRect) {
      const { x, y } = pointInSvgFromEvent(e);
      const dx = x - selectionRect.x;
      const dy = y - selectionRect.y;
      const a = Math.max(0, Math.max(dx, dy));
      setSelectionRect({ ...selectionRect, a });
    }
  };

  const onPointerUp = (e: PointerEvent<SVGGElement>): void => {
    if (draw && selectionRect) {
      const { x, y } = pointInSvgFromEvent(e);
      const dx = x - selectionRect.x;
      const dy = y - selectionRect.y;
      const a = Math.max(0, Math.max(dx, dy));
      setSelectionRect({ ...selectionRect, a });
      setDraw(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const apply = (): void => {
    if (!selectionRect) {
      return;
    }

    const scale = 1 / selectionRect.a;
    const dx = -selectionRect.x % selectionRect.a;
    const dy = -selectionRect.y % selectionRect.a;
    onApply(Transformation.of({ dx, dy, scale }));
  };

  const stroke = image.width / 300;

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-12">
          <ExplanationBox>
            For a rough size estimation, draw a rect over the image where a
            square of the battle grid should be displayed later.
            <br />
            In the next step this grid can be further adjusted ...
          </ExplanationBox>

          <div className="mb-2">
            <button
              className="btn btn-sm btn-secondary"
              onClick={zoomIn}
              type="button"
            >
              <Octicon icon={DiffAdded} />
            </button>
            <button
              className="btn btn-sm btn-secondary ml-2"
              onClick={zoomOut}
              type="button"
            >
              <Octicon icon={DiffRemoved} />
            </button>
          </div>
          <svg style={{ width: 600, height: 600 }} className="img-thumbnail">
            <g
              transform={transformation.asTransformString()}
              onPointerDown={onPointerDown}
              onPointerUpCapture={onPointerUp}
              onPointerMoveCapture={onPointerMove}
            >
              <image
                width={image.width}
                height={image.height}
                xlinkHref={image.url}
              />
              {selectionRect && (
                <rect
                  x={selectionRect.x}
                  y={selectionRect.y}
                  width={selectionRect.a}
                  height={selectionRect.a}
                  stroke="red"
                  fillOpacity={0}
                  strokeDasharray={`${stroke} ${stroke * 2}`}
                  strokeWidth={stroke}
                />
              )}
            </g>
          </svg>
          <div>
            <button
              className="btn btn-sm btn-success mt-2"
              onClick={apply}
              type="button"
            >
              <Octicon icon={Check} />
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
