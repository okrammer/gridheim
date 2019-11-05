import React, { FC } from "react";
import { ModeService } from "../services/ModeService";
import { DrawingService } from "../services/modebased/DrawingService";
import { ManageTokenService } from "../services/modebased/ManageTokenService";
import { DrawingControlBar } from "./ControlBar/DrawingControlBar";
import { ModeControlBar } from "./ControlBar/ModeControlBar";
import { ManageTokenControlBar } from "./ControlBar/ManageTokenControlBar";

interface Props {
  modeService: ModeService;
  backgroundDrawingService: DrawingService;
  notesDrawingService: DrawingService;
  manageTokenService: ManageTokenService;
}

export const ControlBar: FC<Props> = ({
  modeService,
  notesDrawingService,
  backgroundDrawingService,
  manageTokenService
}: Props) => {
  return (
    <div className="navbar navbar-dark bg-dark control-pane">
      <ModeControlBar modeService={modeService} />
      <DrawingControlBar drawingService={notesDrawingService} />
      <DrawingControlBar drawingService={backgroundDrawingService} />
      <ManageTokenControlBar manageTokenService={manageTokenService} />
    </div>
  );
};
