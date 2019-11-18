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
import { labels } from "../../../../data/labels";

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
      {modeButton(GitCompare, "play", labels.playPage.controlBar.playButton)}
      {modeButton(
        Octoface,
        "manage-token",
        labels.playPage.controlBar.addTokensButton
      )}
      {modeButton(
        Note,
        "draw-notes",
        labels.playPage.controlBar.drawNotesButton
      )}
      {modeButton(
        FileMedia,
        "draw-background",
        labels.playPage.controlBar.drawBackgroundButton
      )}
      {modeButton(Search, "zoom", labels.playPage.controlBar.zoomButton)}
    </div>
  );
};
