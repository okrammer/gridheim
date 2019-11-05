import React, { FC } from "react";
import Octicon, { Milestone } from "@primer/octicons-react";
import { FullPageWithHeading } from "../../common/FullPageWithHeading";

interface Props {}

export const IntroSection: FC<Props> = ({  }: Props) => {
  return (
    <>
      <p>
        <strong>Gridheim</strong> is a digital grid map. Grid maps are used for
        pen&pencil roll playing games (like D&D, pathfinder, etc.) to show the
        position of characters and monsters on a map of the environment.
      </p>

      <h5 className="mt-5">
        <Octicon icon={Milestone} size={25} />
        <span className="ml-3">
          The goals of <strong>Gridheim</strong> are ...{" "}
        </span>
      </h5>
      <ul>
        <li>A good user experience</li>
        <li>Cross platform and cross device compatibility</li>
        <li>Pen support</li>
        <li>Offline support via service worker</li>
        <li>Data privacy - All data is only stored locally in your browser</li>
      </ul>
    </>
  );
};
