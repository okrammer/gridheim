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

interface Props {
  image: BackgroundImage;
  transformation: Transformation;
  onApply: (t: Transformation) => void;
}

interface Rect {
  x: number;
  y: number;
  a: number;
}

export const AdjustGrid: FC<Props> = ({
  image,
  onApply,
  transformation
}: Props) => {
  const [t, setT] = useState(transformation);
  const [viewSize, setViewSize] = useState(10);

  const zoomIn = (): void => {
    setViewSize(Math.max(2, viewSize - 1));
  };

  const minusScale = (): void => {
    setT(t.with({ scale: t.scale - t.scale * 0.002 }));
  };

  const plusScale = (): void => {
    setT(t.with({ scale: t.scale + t.scale * 0.002 }));
  };

  const offsetXPlus = (): void => {
    setT(t.with({ dx: t.dx - t.dx * t.scale }));
  };

  const offsetXMinus = (): void => {
    setT(t.with({ dx: t.dx + t.dx * t.scale }));
  };

  const offsetYPlus = (): void => {
    setT(t.with({ dy: t.dy - t.dy * t.scale }));
  };

  const offsetYMinus = (): void => {
    setT(t.with({ dy: t.dy + t.dy * t.scale }));
  };

  const zoomOut = (): void => {
    setViewSize(viewSize + 1);
  };

  const apply = (): void => {
    if (!t) {
      return;
    }

    onApply(t);
  };

  const xSquareCount = Math.ceil(image.width * transformation.scale + 1);
  const ySquareCount = Math.ceil(image.height * transformation.scale + 1);

  const button = (icon: Icon, fn: () => void): ReactNode => {
    return (
      <button className="btn btn-sm btn-secondary" onClick={fn} type="button">
        <Octicon icon={icon} />
      </button>
    );
  };

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-12">
          <ExplanationBox>
            As I promised! Here you can make last adjustments to the grid ...
          </ExplanationBox>
          <div className="mb-2">
            {button(DiffAdded, zoomIn)}
            {button(DiffRemoved, zoomOut)}
            {button(ScreenNormal, minusScale)}
            {button(ScreenFull, plusScale)}
            {button(ArrowUp, offsetYMinus)}
            {button(ArrowDown, offsetYPlus)}
            {button(ArrowLeft, offsetXMinus)}
            {button(ArrowRight, offsetXPlus)}
          </div>
          <svg
            style={{ width: 600, height: 600 }}
            viewBox={`${xSquareCount - viewSize} ${ySquareCount -
              viewSize} ${viewSize} ${viewSize}`}
            className="img-thumbnail"
          >
            <g transform={t.asTransformString()}>
              <image xlinkHref={image.url} />
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
