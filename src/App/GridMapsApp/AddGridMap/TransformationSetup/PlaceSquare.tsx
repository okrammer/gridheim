import React, { FC, useEffect, useState } from "react";
import { Transformation } from "../../../../model/Transformation";
import Octicon, { Check, DiffAdded, DiffRemoved } from "@primer/octicons-react";
import { BackgroundImage } from "../../../../model/BackgroundImage";
import { ExplanationBox } from "../../../../common/ExplanationBox";
import { SelectionRect } from "./SelectionRect";

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

  const [square, setSquare] = useState<null | Rect>(null);

  useEffect(() => {
    setTransformation(
      Transformation.default().with({
        scale: (600 / image.width) * 2,
        dx: 0,
        dy: 0
      })
    );
  }, [image]);

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

  const apply = (): void => {
    if (!square) {
      return;
    }

    const scale = 1 / square.a;
    const dx = -square.x % square.a;
    const dy = -square.y % square.a;
    onApply(Transformation.of({ dx, dy, scale }));
  };

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
            <g transform={transformation.asTransformString()}>
              <image
                width={image.width}
                height={image.height}
                xlinkHref={image.url}
              />
              <SelectionRect
                width={image.width}
                height={image.width}
                onChange={setSquare}
              />
            </g>
          </svg>
          <div>
            <button
              className="btn btn-sm btn-success mt-2"
              onClick={apply}
              type="button"
              disabled={!square}
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
