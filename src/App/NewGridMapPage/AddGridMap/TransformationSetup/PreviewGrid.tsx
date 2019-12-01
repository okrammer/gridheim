import React, { FC, useState } from "react";
import { Transformation } from "../../../../model/Transformation";
import Octicon, {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight
} from "@primer/octicons-react";
import { BackgroundImage } from "../../../../model/BackgroundImage";
import { range } from "../../../../utils/range";
import { ExplanationBox } from "../../../../common/ExplanationBox";
import { ViewControls } from "./common/ViewControls";
import { TransformParams } from "./common/TransformParams";
import { WizardButtons } from "./common/WizardButtons";

const calculateTransformation = (params: TransformParams): Transformation => {
  const calculatedA = params.distance / params.squareCount;

  const dx1 = -params.rect1.topLeft.x % calculatedA;
  const dx2 = -params.rect2.topLeft.x % calculatedA;
  const dx = (dx1 + dx2) / 2;

  const dy1 = -params.rect1.topLeft.y % calculatedA;
  const dy2 = -params.rect2.topLeft.y % calculatedA;
  const dy = (dy1 + dy2) / 2;

  return Transformation.of({ scale: 1 / calculatedA, dx, dy });
};

interface Props {
  image: BackgroundImage;
  params: TransformParams;
  onApply: (t: Transformation) => void;
  onBack: () => void;
}

export const PreviewGrid: FC<Props> = ({
  image,
  onApply,
  params: initialParams,
  onBack
}: Props) => {
  const [viewTransformation, setViewTransformation] = useState(
    Transformation.default()
  );
  const [params, setParams] = useState(initialParams);

  const imageTransformation = calculateTransformation(params);

  const xSquareCount = Math.ceil(image.width * imageTransformation.scale + 1);
  const ySquareCount = Math.ceil(image.height * imageTransformation.scale + 1);

  const apply = (): void => {
    onApply(imageTransformation);
  };

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
                      stroke="darkred"
                      strokeWidth={0.02}
                      strokeDasharray="0.02 0.01"
                      fillOpacity={0}
                    />
                  );
                });
              })}
              <rect
                x={params.rect1.topLeft.x}
                y={params.rect1.topLeft.y}
                width="1"
                height="1"
                stroke="red"
                strokeWidth={0.03}
                fillOpacity={0}
              />
              <rect
                x={params.rect2.topLeft.x}
                y={params.rect2.topLeft.y}
                width="1"
                height="1"
                stroke="red"
                strokeWidth={0.03}
                fillOpacity={0}
              />
            </g>
          </svg>

          <div className="mt-2">
            <button
              className="btn btn-sm btn-secondary mr-2"
              onClick={() => {
                setParams({ ...params, squareCount: params.squareCount + 1 });
              }}
              type="button"
            >
              <Octicon icon={ArrowUp} />
              Too few Squares
            </button>
            <button
              className="btn btn-sm btn-secondary mr-2"
              onClick={() => {
                setParams({ ...params, squareCount: params.squareCount - 1 });
              }}
              type="button"
            >
              <Octicon icon={ArrowDown} />
              Too much Squares
            </button>
          </div>
          <WizardButtons onNext={apply} onBack={onBack} />
        </div>
      </div>
    </>
  );
};
