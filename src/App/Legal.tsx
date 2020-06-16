import React, { FC } from "react";
import { links } from "../data/links";
import Octicon, { Key, Law } from "@primer/octicons-react";

interface Props {}

export const Legal: FC<Props> = ({}: Props) => {
  return (
    <div className="main-menu_legal-stuff">
      <small>
        <a href={links.impressum} className="ml-2 mr-2">
          <Octicon icon={Law} /> Impressum
        </a>
      </small>
      <small>
        <a href={links.dataProtection}>
          <Octicon icon={Key} /> Data Protection
        </a>
      </small>
    </div>
  );
};
