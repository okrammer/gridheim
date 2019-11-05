import React, { FC } from "react";
import { PlayMap } from "./Layout/PlayMap";
import { ControlBar } from "./Layout/ControlBar";
import { AddTokenModal } from "./Layout/AddTokenModal";
import { Services } from "./services/Services";

interface Props extends Services {}

export const Layout: FC<Props> = (props: Props) => {
  return (
    <>
      {
        <div className="App h-100">
          <PlayMap {...props!} />
          <ControlBar {...props!} />
        </div>
      }
      {
        <div className="App h-100">
          <AddTokenModal {...props} />
        </div>
      }
    </>
  );
};
