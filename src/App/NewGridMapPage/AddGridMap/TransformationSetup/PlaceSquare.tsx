import React, { FC, useEffect, useState } from "react";
import { Transformation } from "../../../../model/Transformation";
import Octicon, { Check } from "@primer/octicons-react";
import { BackgroundImage } from "../../../../model/BackgroundImage";
import { ExplanationBox } from "../../../../common/ExplanationBox";
import { SelectionRect } from "./SelectionRect";
import { ViewControls } from "./common/ViewControls";
import { Rect } from "../../../../utils/Rect";

const viewPositionToLabel = {
  center: "center",
  "left-top": "top left corner",
  "right-bottom": "bottom right corner"
};

interface Props {
  image: BackgroundImage;
  onApply: (rect: Rect) => void;
  viewPosition: "center" | "left-top" | "right-bottom";
}

export const PlaceSquare: FC<Props> = ({
  image,
  onApply,
  viewPosition
}: Props) => {
  const [transformation, setTransformation] = useState(
    Transformation.default()
  );

  const [rect, setRect] = useState<null | Rect>(null);

  useEffect(() => {
    const scale = (600 / image.width) * 2;

    const t = Transformation.default().with({
      scale: scale,
      dx: viewPosition === "left-top" ? 0 : -(image.width - 600 / scale),
      dy: viewPosition === "left-top" ? 0 : -(image.height - 600 / scale)
    });
    setTransformation(t);
  }, [image, viewPosition]);

  const apply = (): void => {
    if (!rect) {
      return;
    }

    onApply(rect);
  };

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-12">
          <ExplanationBox>
            For calculating the grid position, draw a rect over the image where
            9 squares of the battle grid should be displayed later. Try to
            select an area in the
            <em>{viewPositionToLabel[viewPosition]}</em> of the map.
            <br />
          </ExplanationBox>

          <div className="mb-2">
            <ViewControls
              transformation={transformation}
              onTransformationChange={setTransformation}
            />
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
                onChange={setRect}
              />
            </g>
          </svg>
          <div>
            <button
              className="btn btn-sm btn-success mt-2"
              onClick={apply}
              type="button"
              disabled={!rect}
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
