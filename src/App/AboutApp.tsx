import React, { FC } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import Octicon, { Info, Play } from "@primer/octicons-react";
import { routing } from "../App";
import { Link } from "react-router-dom";
import { PageHeader } from "../common/PageHeader";
import { OpenSourceSection } from "./AboutApp/OpenSourceSection";
import { IntroSection } from "./AboutApp/IntroSection";
import { HelloSection } from "./AboutApp/HelloSection";

interface Props {}

export const AboutApp: FC<Props> = ({  }: Props) => {
  return (
    <FullPageWithHeading
      heading={
        <PageHeader icon={Info} headline="Welcome to Gridheim, Friend!">
          <Link to={routing.play}>
            <Octicon icon={Play} /> Enough talk just start playing ...
          </Link>
        </PageHeader>
      }
    >
      <IntroSection />
      <HelloSection />
      <OpenSourceSection />
    </FullPageWithHeading>
  );
};
