import React, { FC, ReactNode, useState } from "react";
import { Transformation } from "../../../../model/Transformation";
import Octicon, {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  DiffAdded,
  DiffRemoved,
  Icon,
  ScreenFull,
  ScreenNormal
} from "@primer/octicons-react";
import { BackgroundImage } from "../../../../model/BackgroundImage";
import { range } from "../../../../utils/range";
import { ExplanationBox } from "../../../../common/ExplanationBox";
import { ViewControls } from "./common/ViewControls";

interface Props {
  image: BackgroundImage;
  imageTransformation: Transformation;
  onApply: (t: Transformation) => void;
}

interface Rect {
  x: number;
  y: number;
  a: number;
}

export const PreviewGrid: FC<Props> = ({
  image,
  onApply,
  imageTransformation
}: Props) => {
  const [viewTransformation, setViewTransformation] = useState(
    Transformation.default()
  );

  const apply = (): void => {
    onApply(imageTransformation);
  };

  const xSquareCount = Math.ceil(image.width * imageTransformation.scale + 1);
  const ySquareCount = Math.ceil(image.height * imageTransformation.scale + 1);

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-12">
          <ExplanationBox>
            As I promised! Here you can make last adjustments to the grid ...
          </ExplanationBox>
          <div className="mb-2">
            <ViewControls
              transformation={viewTransformation}
              onTransformationChange={setViewTransformation}
            />
          </div>
          <svg
            style={{ width: 600, height: 600 }}
            viewBox={`0 0 ${xSquareCount} ${ySquareCount}`}
            className="img-thumbnail"
          >
            <g transform={viewTransformation.asTransformString()}>
              <g transform={imageTransformation.asTransformString()}>
                <image
                  width={image.width}
                  height={image.height}
                  xlinkHref={image.url}
                />
              </g>
              {range(xSquareCount).map(x => {
                return range(ySquareCount).map(y => {
                  return (
                    <rect
                      key={`${x}/${y}`}
                      x={x}
                      y={y}
                      width="1"
                      height="1"
                      stroke="red"
                      strokeWidth={0.03}
                      fillOpacity={0}
                    />
                  );
                });
              })}
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
