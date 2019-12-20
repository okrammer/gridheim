import React, { FC, useEffect, useState } from "react";
import { Transformation } from "../../model/Transformation";
import { BackgroundImage } from "../../model/BackgroundImage";
import { SelectionRect } from "./SelectionRect";
import { ViewControls } from "./common/ViewControls";
import { Rect } from "../../utils/Rect";
import { Row } from "../../common/Row";

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
      <Row>
        <ViewControls
          transformation={transformation}
          onTransformationChange={setTransformation}
        />
      </Row>
      <Row>
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
              height={image.height}
              onChange={updateRect}
            />
          </g>
        </svg>
      </Row>
    </>
  );
};
