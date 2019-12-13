import React, { FC, useEffect, useState, useRef } from "react";
import { Transformation } from "../../model/Transformation";
import Octicon, { ArrowDown, ArrowUp } from "@primer/octicons-react";
import { BackgroundImage } from "../../model/BackgroundImage";
import { range } from "../../utils/range";
import { ViewControls } from "./common/ViewControls";
import { TransformParams } from "./common/TransformParams";
import { Rect } from "../../utils/Rect";
import { Transform } from "../../utils/Transform";
import { Vector } from "../../utils/Vector";
import { Row } from "../../common/Row";
import { ButtonBar } from "../../common/ButtonBar";

const calculateTransformation = (
  params: TransformParams,
  rect1: Rect,
  rect2: Rect
): Transform => {
  const calculatedA = params.distance / params.squareCount;

  const dx1 = -rect1.topLeft.x % calculatedA;
  const dx2 = -rect2.topLeft.x % calculatedA;

  // investigate way this leads sometimes to an offset of a half square
  // const dx = (dx1 + dx2) / 2;

  const dx = dx1;

  const dy1 = -rect1.topLeft.y % calculatedA;
  const dy2 = -rect2.topLeft.y % calculatedA;

  // investigate way this leads sometimes to an offset of a half square
  // const dy = (dy1 + dy2) / 2;

  const dy = dy1;

  return new Transform(new Vector(dx, dy), 1 / calculatedA);
};

const calculateParams = (rect1: Rect, rect2: Rect): TransformParams => {
  const distanceByAxis = {
    x: Math.abs(rect2.topLeft.x - rect1.topLeft.x),
    y: Math.abs(rect2.topLeft.y - rect1.topLeft.y)
  };

  const axis: "x" | "y" = distanceByAxis.x > distanceByAxis.y ? "x" : "y";

  const averageA = (rect1.sideLength + rect2.sideLength) / 2;

  const distance = distanceByAxis[axis];
  const squareCount = Math.round(distance / averageA);
  return {
    axis,
    squareCount,
    distance
  };
};

interface Props {
  image: BackgroundImage;
  rect1: Rect;
  rect2: Rect;
  transformParams: TransformParams | null;
  onChange: (transform: Transform, transformParams: TransformParams) => void;
}

export const PreviewGrid: FC<Props> = ({
  image,
  rect1,
  rect2,
  transformParams,
  onChange
}: Props) => {
  const [viewTransformation, setViewTransformation] = useState(
    Transformation.default()
  );
  const [params, setParams] = useState(
    transformParams || calculateParams(rect1, rect2)
  );

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const imageTransformation = calculateTransformation(params, rect1, rect2);

  const xSquareCount = Math.ceil(image.width * imageTransformation.scale + 1);
  const ySquareCount = Math.ceil(image.height * imageTransformation.scale + 1);

  // the main reason for this is to call the onChange callback after the component is rendered for the first time
  // so if the user will press next without changing anything the value gets promoted.
  // we should be careful that we call onChange only if there is a diff in the parameter, otherwise we will stuck in
  // a render loop, especial care must be taken for imageTransformation because this object is recalculated on every renders
  useEffect(() => {
    onChangeRef.current(imageTransformation, params);
  }, [params, onChangeRef, ...imageTransformation.components]);

  return (
    <>
      <Row>
        <ViewControls
          transformation={viewTransformation}
          onTransformationChange={setViewTransformation}
        />
      </Row>
      <Row>
        <svg
          style={{ width: 600, height: 600 }}
          viewBox={`0 0 ${xSquareCount} ${ySquareCount}`}
          className="img-thumbnail"
        >
          <g transform={viewTransformation.asTransformString()}>
            <g {...imageTransformation.scaleTranslateAttribute}>
              <image
                width={image.width}
                height={image.height}
                xlinkHref={image.url}
              />
              <rect
                x={rect1.topLeft.x}
                y={rect1.topLeft.y}
                width={rect1.sideLength}
                height={rect1.sideLength}
                stroke="#0f86ff"
                strokeWidth={0.03}
                fillOpacity={0}
              />
              <rect
                x={rect2.topLeft.x}
                y={rect2.topLeft.y}
                width={rect2.sideLength}
                height={rect2.sideLength}
                stroke="#0f86ff"
                strokeWidth={0.03}
                fillOpacity={0}
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
          </g>
        </svg>
      </Row>
      <Row>
        <ButtonBar>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => {
              setParams({
                ...params,
                squareCount: params.squareCount + 1
              });
            }}
            type="button"
          >
            <Octicon icon={ArrowUp} />
            Too few Squares
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => {
              setParams({
                ...params,
                squareCount: params.squareCount - 1
              });
            }}
            type="button"
          >
            <Octicon icon={ArrowDown} />
            Too much Squares
          </button>
        </ButtonBar>
      </Row>
    </>
  );
};
