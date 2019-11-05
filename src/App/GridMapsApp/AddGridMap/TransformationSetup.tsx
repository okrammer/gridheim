import React, { FC, useState } from "react";
import { Transformation } from "../../../model/Transformation";
import { PlaceSquare } from "./TransformationSetup/PlaceSquare";
import { AdjustGrid } from "./TransformationSetup/AdjustGrid";
import { BackgroundImage } from "../../../model/BackgroundImage";

interface Props {
  image: BackgroundImage;
  onApply: (t: Transformation) => void;
  onAdjustGrid: () => void;
}

export const TransformationSetup: FC<Props> = ({
  image,
  onApply,
  onAdjustGrid
}: Props) => {
  const [previewT, setPreviewT] = useState<Transformation | null>(null);

  return (
    <>
      {image && !previewT && (
        <PlaceSquare
          image={image}
          onApply={t => {
            setPreviewT(t);
            onAdjustGrid();
          }}
        />
      )}
      {image && previewT && (
        <AdjustGrid
          image={image}
          transformation={previewT}
          onApply={t => {
            onApply(t);
          }}
        />
      )}
    </>
  );
};
