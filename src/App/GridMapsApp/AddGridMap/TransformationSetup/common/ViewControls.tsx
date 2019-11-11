import React, { FC, ReactNode, useEffect, useState } from "react";
import Octicon, {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  DiffAdded,
  DiffRemoved,
  Icon
} from "@primer/octicons-react";
import { Transformation } from "../../../../../model/Transformation";

interface Props {
  transformation: Transformation;
  onTransformationChange: (t: Transformation) => void;
}

export const ViewControls: FC<Props> = ({
  transformation: transformationFromProps,
  onTransformationChange
}: Props) => {
  const [transformation, setTransformation] = useState(transformationFromProps);

  useEffect(() => {
    setTransformation(transformationFromProps);
  }, [transformationFromProps]);

  const updateTransformation = (t: Transformation): void => {
    setTransformation(t);
    onTransformationChange(t);
  };

  const translateFactor = 100;

  const offsetXPlus = (): void => {
    updateTransformation(
      transformation.with({
        dx: transformation.dx - transformation.scale * translateFactor
      })
    );
  };

  const offsetXMinus = (): void => {
    updateTransformation(
      transformation.with({
        dx: transformation.dx + transformation.scale * translateFactor
      })
    );
  };

  const offsetYPlus = (): void => {
    updateTransformation(
      transformation.with({
        dy: transformation.dy - transformation.scale * translateFactor
      })
    );
  };

  const offsetYMinus = (): void => {
    updateTransformation(
      transformation.with({
        dy: transformation.dy + transformation.scale * translateFactor
      })
    );
  };

  const zoomIn = (): void => {
    updateTransformation(
      transformation.with({ scale: transformation.scale + 0.1 })
    );
  };

  const zoomOut = (): void => {
    updateTransformation(
      transformation.with({ scale: transformation.scale - 0.1 })
    );
  };

  const button = (icon: Icon, fn: () => void): ReactNode => {
    return (
      <button
        className="btn btn-sm btn-secondary ml-2"
        onClick={fn}
        type="button"
      >
        <Octicon icon={icon} />
      </button>
    );
  };

  return (
    <>
      {button(DiffAdded, zoomIn)}
      {button(DiffRemoved, zoomOut)}
      {button(ArrowUp, offsetYMinus)}
      {button(ArrowDown, offsetYPlus)}
      {button(ArrowLeft, offsetXMinus)}
      {button(ArrowRight, offsetXPlus)}
    </>
  );
};
