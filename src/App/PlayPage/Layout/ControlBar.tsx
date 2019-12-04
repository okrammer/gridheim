import React, { FC } from "react";
import { ModeService } from "../services/ModeService";
import { DrawingService } from "../services/modebased/DrawingService";
import { ManageTokenService } from "../services/modebased/ManageTokenService";
import { DrawingControlBar } from "./ControlBar/DrawingControlBar";
import { ModeControlBar } from "./ControlBar/ModeControlBar";
import { ManageTokenControlBar } from "./ControlBar/ManageTokenControlBar";
import { ViewportControlBar } from "./ControlBar/ViewportControlBar";
import { ViewportService } from "../services/ViewportService";
import { useObservable } from "../../../utils/useObservable";

interface Props {
  modeService: ModeService;
  backgroundDrawingService: DrawingService;
  notesDrawingService: DrawingService;
  manageTokenService: ManageTokenService;
  viewportService: ViewportService;
}

export const ControlBar: FC<Props> = ({
  modeService,
  notesDrawingService,
  backgroundDrawingService,
  manageTokenService,
  viewportService
}: Props) => {
  const showSecondary = useObservable(
    modeService.oneOf("draw-background", "draw-notes", "manage-token", "zoom"),
    false
  );
  return (
    <>
      <div className="control-bar_primary navbar navbar-dark bg-dark">
        <ModeControlBar modeService={modeService} />
      </div>
      {showSecondary && (
        <div className="control-bar_secondary">
          <div className="navbar navbar-dark bg-dark">
            <DrawingControlBar drawingService={notesDrawingService} />
            <DrawingControlBar drawingService={backgroundDrawingService} />
            <ManageTokenControlBar manageTokenService={manageTokenService} />
            <ViewportControlBar viewportService={viewportService} />
          </div>
        </div>
      )}
    </>
  );
};
