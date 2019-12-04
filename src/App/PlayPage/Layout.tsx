import React, { FC } from "react";
import { PlayMap } from "./Layout/PlayMap";
import { ControlBar } from "./Layout/ControlBar";
import { AddTokenModal } from "./Layout/AddTokenModal";
import { Services } from "./services/Services";
import { useObservable } from "../../utils/useObservable";
import { Legal } from "../Legal";

interface Props extends Services {}

export const Layout: FC<Props> = (props: Props) => {
  const showLegal = useObservable(props.modeService.oneOf("play"), false);
  return (
    <>
      {showLegal && <Legal />}
      <div className="App h-100">
        <PlayMap {...props!} />
        <ControlBar {...props!} />
      </div>
      <div className="App h-100">
        <AddTokenModal {...props} />
      </div>
    </>
  );
};
