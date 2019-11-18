import React, { FC, ReactNode } from "react";
import Octicon, { Icon } from "@primer/octicons-react";

interface Props {
  icon: Icon;
  headline: string;
  children?: ReactNode;
}

export const PageHeader: FC<Props> = ({ icon, headline, children }: Props) => {
  return (
    <>
      <h1>
        {/*<Octicon icon={icon} size={40} />*/}
        <span className="ml-4">{headline}</span>
      </h1>
      {children}
    </>
  );
};
