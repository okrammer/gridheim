import React, { FC } from "react";
import Octicon, { Icon } from "@primer/octicons-react";

interface Props {
  icon: Icon;
}

export const AboutIcon: FC<Props> = ({ icon }: Props) => {
  return (
    <>
      <span className="mr-3">
        <Octicon icon={icon} size={23} />
      </span>
    </>
  );
};
