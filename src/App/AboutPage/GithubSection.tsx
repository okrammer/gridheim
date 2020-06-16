import React, { FC } from "react";
import { MediaBody } from "../../common/media/MediaBody";
import Octicon, { GistSecret, Octoface } from "@primer/octicons-react";
import { MediaContainer } from "../../common/media/MediaContainer";
import { links } from "../../data/links";
import { AboutIcon } from "./AboutIcon";

interface Props {}

export const GithubSecton: FC<Props> = ({}: Props) => {
  return (
    <div className="card mt-5">
      <div className="card-body">
        <AboutIcon icon={Octoface} />
        <strong>Gridheim</strong> is open source (
        <a href={links.licence}>GPLv3</a>) and provided free to use. You can
        fork it yourself on <a href={links.github}>Github</a>
      </div>
    </div>
  );
};
