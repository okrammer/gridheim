import React, { FC } from "react";
import { ImageGridMap } from "../../../../model/ImageGridMap";

interface Props {
  gridMap: ImageGridMap;
}

export const DisplayBackgroundImage: FC<Props> = ({ gridMap }: Props) => {
  return (
    <g {...gridMap.transform.scaleTranslateAttribute}>
      <image
        width={gridMap.image.width}
        height={gridMap.image.height}
        xlinkHref={gridMap.image.url}
      />
    </g>
  );
};
