import React, { FC, ReactNode } from "react";
import {
  Icon,
  Paintcan,
  Pencil,
  Pulse,
  Trashcan
} from "@primer/octicons-react";
import { useObservable } from "../../../../utils/useObservable";
import {
  DrawingMode,
  DrawingService
} from "../../services/modebased/DrawingService";
import { ControlBarButton } from "../../common/ControlBarButton";
import { DrawingColor } from "../../../../model/DrawingColor";
import { DrawingWidth } from "../../../../model/DrawingWidth";

interface Props {
  drawingService: DrawingService;
}

const iconSizeByWidth = {
  [DrawingWidth.s]: 8,
  [DrawingWidth.m]: 12,
  [DrawingWidth.l]: 16
};

export const DrawingControlBar: FC<Props> = ({ drawingService }: Props) => {
  const drawingColor = useObservable(
    drawingService.drawingColor$,
    drawingService.drawingColor
  );
  const drawingWidth = useObservable(
    drawingService.drawingWidth$,
    drawingService.drawingWidth
  );
  const active = useObservable(drawingService.active$, false);
  const drawingMode = useObservable(drawingService.drawingMode$, "draw");
  const widthButton = (width: DrawingWidth): ReactNode => (
    <ControlBarButton
      key={width}
      icon={Pulse}
      iconSize={iconSizeByWidth[width]}
      onClick={() => drawingService.switchDrawingWidth(width)}
      classes={{
        [`btn-secondary`]: drawingWidth === width,
        [`btn-outline-secondary`]: drawingWidth !== width,
        "drawing-pane-button": true
      }}
    />
  );
  const colorButton = (color: DrawingColor): ReactNode => (
    <ControlBarButton
      key={color}
      icon={Paintcan}
      onClick={() => drawingService.switchDrawingColor(color)}
      classes={{
        [`drawing-button-${color}`]: drawingColor !== color,
        [`drawing-button-${color}-selected`]: drawingColor === color
      }}
    />
  );

  const drawingModeButton = (mode: DrawingMode, icon: Icon): ReactNode => (
    <ControlBarButton
      key={mode}
      icon={icon}
      onClick={() => drawingService.switchDrawingMode(mode)}
      classes={{
        [`btn-warning`]: drawingMode === mode,
        [`btn-outline-warning`]: drawingMode !== mode
      }}
    />
  );

  return (
    <>
      {active && (
        <div className="mt-md-5">
          {drawingModeButton("draw", Pencil)}
          {drawingModeButton("erase", Trashcan)}
          <div className="mt-md-4" />
          {Object.values(DrawingWidth).map(width => widthButton(width))}
          <div className="mt-md-4" />
          {Object.values(DrawingColor).map(color => colorButton(color))}
        </div>
      )}
    </>
  );
};
