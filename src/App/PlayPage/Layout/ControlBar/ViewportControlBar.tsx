import React, { FC, ReactNode } from "react";
import { Dash, Icon, Plus, Trashcan } from "@primer/octicons-react";
import { useObservable } from "../../../../utils/useObservable";
import { ControlBarButton } from "../../common/ControlBarButton";
import {
  ManageTokenService,
  Mode
} from "../../services/modebased/ManageTokenService";
import { DisplayToken } from "../../../../common/DisplayToken";
import { classesMap } from "../../../../utils/classesMap";
import { ViewportService } from "../../services/ViewportService";

interface Props {
  viewportService: ViewportService;
}

export const ViewportControlBar: FC<Props> = ({ viewportService }: Props) => {
  const active = useObservable(viewportService.mouseDragEnabled$, false);
  const modeButton = (icon: Icon, action: () => void): ReactNode => (
    <ControlBarButton
      icon={icon}
      onClick={action}
      classes={{
        "btn-warning": true,
        "mr-2": true
      }}
    />
  );

  return (
    <>
      {active && (
        <>
          {modeButton(Plus, () => viewportService.zoomIn())}
          {modeButton(Dash, () => viewportService.zoomOut())}
        </>
      )}
    </>
  );
};
