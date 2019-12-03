import React, { FC, useEffect, useState } from "react";
import { Transformation } from "../../../../model/Transformation";
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
  onChange: (rect: Rect | null) => void;
  rect: Rect | null;
  viewPosition: "center" | "left-top" | "right-bottom";
}

export const PlaceSquare: FC<Props> = ({
  image,
  onChange,
  viewPosition,
  rect: initialRect
}: Props) => {
  const [transformation, setTransformation] = useState(
    Transformation.default()
  );

  const [rect, setRect] = useState<null | Rect>(initialRect);

  useEffect(() => setRect(initialRect), [initialRect]);

  useEffect(() => {
    const scale = (600 / image.width) * 2;

    const t = Transformation.default().with({
      scale: scale,
      dx: viewPosition === "left-top" ? 0 : -(image.width - 600 / scale),
      dy: viewPosition === "left-top" ? 0 : -(image.height - 600 / scale)
    });
    setTransformation(t);
  }, [image, viewPosition]);

  const updateRect = (rect: Rect | null): void => {
    setRect(rect);
    onChange(rect);
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
                rect={rect}
                width={image.width}
                height={image.width}
                onChange={updateRect}
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};
