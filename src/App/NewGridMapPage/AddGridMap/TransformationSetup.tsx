import React, { FC, useState } from "react";
import { Transformation } from "../../../model/Transformation";
import { PlaceSquare } from "./TransformationSetup/PlaceSquare";
import { PreviewGrid } from "./TransformationSetup/PreviewGrid";
import { BackgroundImage } from "../../../model/BackgroundImage";
import { Rect } from "../../../utils/Rect";
import { TransformParams } from "./TransformationSetup/common/TransformParams";

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
    rect1,
    rect2,
    axis,
    squareCount,
    distance
  };
};

interface Props {
  image: BackgroundImage;
  onApply: (t: Transformation) => void;
  onStep: (stage: "exampleRect1" | "exampleRect2" | "preview") => void;
  onBack: () => void;
}

export const TransformationSetup: FC<Props> = ({
  image,
  onApply,
  onStep,
  onBack
}: Props) => {
  const [rect1, setRect1] = useState<Rect | null>(null);

  const [params, setParams] = useState<TransformParams | null>(null);

  onStep("exampleRect1");
  if (rect1) {
    onStep("exampleRect2");
  }
  if (params) {
    onStep("preview");
  }

  return (
    <>
      {image && !rect1 && (
        <PlaceSquare
          viewPosition="left-top"
          image={image}
          onApply={r => {
            setRect1(r);
          }}
          onBack={onBack}
        />
      )}
      {image && rect1 && !params && (
        <PlaceSquare
          viewPosition="center"
          image={image}
          onApply={r => {
            setParams(calculateParams(rect1!, r));
          }}
          onBack={() => setRect1(null)}
        />
      )}
      {image && rect1 && params && (
        <PreviewGrid
          image={image}
          params={params}
          onApply={transformation => {
            onApply(transformation);
          }}
          onBack={() => setParams(null)}
        />
      )}
    </>
  );
};
