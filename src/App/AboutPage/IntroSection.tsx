import React, { FC } from "react";
import Octicon, { Milestone } from "@primer/octicons-react";
import { AboutIcon } from "./AboutIcon";

interface Props {}

export const IntroSection: FC<Props> = ({}: Props) => {
  return (
    <div className="card">
      <div className="card-body">
        <p>
          <AboutIcon icon={Milestone} />
          <strong>Gridheim</strong> is here to provide a great experiance in
          modern rpg environments.
        </p>

        <p>
          Currently <strong>Gridheim</strong> features a digital grid map that
          can be used on tablets and other devices.
        </p>
        <p>
          Grid maps are used for pen&pencil roll playing games (like D&D,
          pathfinder, etc.) to show the position of characters and monsters on a
          map of the surrounding environment.
        </p>

        <p>
          Key goals of <strong>Gridheim</strong> are:
          <ul>
            <li>A UI that don't get in the way of human interaction</li>
            <li>
              A paper like usage by supporting tablets and pens as first class
              citizen
            </li>
            <li>
              Support as much modern devices as possible through deployment as
              web application
            </li>
            <li>
              Privacy of all your data by storing all assets in your local
              browser
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
};
