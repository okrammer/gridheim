import React, { FC, useState } from "react";
import { Transformation } from "../../../model/Transformation";
import { PlaceSquare } from "./TransformationSetup/PlaceSquare";
import { PreviewGrid } from "./TransformationSetup/PreviewGrid";
import { BackgroundImage } from "../../../model/BackgroundImage";
import { Rect } from "../../../utils/types";

interface Props {
  image: BackgroundImage;
  onApply: (t: Transformation) => void;
  onStep: (stage: "exampleRect1" | "exampleRect2" | "preview") => void;
}

export const TransformationSetup: FC<Props> = ({
  image,
  onApply,
  onStep
}: Props) => {
  const [rect1, setRect1] = useState<Rect | null>(null);
  const [transformation, setTransformation] = useState<Transformation | null>(
    null
  );

  const calculateTransformation = (r1: Rect, r2: Rect): Transformation => {
    const averageA = (r1.a + r2.a) / 2;

    const distanceX = Math.abs(r2.x - r1.x);
    const squareCountX = Math.round(distanceX / averageA);
    const calculatedAX = distanceX / squareCountX;

    const distanceY = Math.abs(r2.y - r1.y);
    const squareCountY = Math.round(distanceY / averageA);
    const calculatedAY = distanceY / squareCountY;

    const calculatedA = (calculatedAX + calculatedAY) / 2;

    const dx1 = -r1.x % calculatedA;
    const dx2 = -r2.x % calculatedA;
    const dx = (dx1 + dx2) / 2;

    const dy1 = -r1.y % calculatedA;
    const dy2 = -r2.y % calculatedA;
    const dy = (dy1 + dy2) / 2;

    return Transformation.of({ scale: 1 / calculatedA, dx, dy });
  };

  if (!rect1) {
    onStep("exampleRect1");
  }

  return (
    <>
      {image && !rect1 && (
        <PlaceSquare
          viewPosition="left-top"
          image={image}
          onApply={r => {
            setRect1(r);
            onStep("exampleRect2");
          }}
        />
      )}
      {image && rect1 && !transformation && (
        <PlaceSquare
          viewPosition="center"
          image={image}
          onApply={r => {
            onStep("preview");
            setTransformation(calculateTransformation(rect1!, r));
          }}
        />
      )}
      {image && rect1 && transformation && (
        <PreviewGrid
          image={image}
          imageTransformation={transformation}
          onApply={r => {
            onApply(transformation);
          }}
        />
      )}
    </>
  );
};
