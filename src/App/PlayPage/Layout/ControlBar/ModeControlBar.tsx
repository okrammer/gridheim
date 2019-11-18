import React, { FC, ReactNode } from "react";
import {
  FileMedia,
  GitCompare,
  Icon,
  Note,
  Octoface,
  Search
} from "@primer/octicons-react";
import { Mode, ModeService } from "../../services/ModeService";
import { useObservable } from "../../../../utils/useObservable";
import { ControlBarButton } from "../../common/ControlBarButton";
import { texts } from "../../../../data/Texts";

interface Props {
  modeService: ModeService;
}

export const ModeControlBar: FC<Props> = ({ modeService }: Props) => {
  const mode = useObservable(modeService.mode$, "play");

  const modeButton = (
    icon: Icon,
    activeInMode: Mode,
    tooltip: string
  ): ReactNode => (
    <ControlBarButton
      icon={icon}
      onClick={() => modeService.switchMode(activeInMode)}
      classes={{
        "btn-outline-primary": activeInMode !== mode,
        "btn-primary": activeInMode === mode
      }}
      tooltip={tooltip}
    />
  );

  return (
    <div className="">
      {modeButton(GitCompare, "play", texts.playPage.controlBar.playButton)}
      {modeButton(
        Octoface,
        "manage-token",
        texts.playPage.controlBar.addTokensButton
      )}
      {modeButton(
        Note,
        "draw-notes",
        texts.playPage.controlBar.drawNotesButton
      )}
      {modeButton(
        FileMedia,
        "draw-background",
        texts.playPage.controlBar.drawBackgroundButton
      )}
      {modeButton(Search, "zoom", texts.playPage.controlBar.zoomButton)}
    </div>
  );
};
