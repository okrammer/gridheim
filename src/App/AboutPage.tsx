import React, { FC } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import Octicon, { Info, Play } from "@primer/octicons-react";
import { routing } from "../App";
import { Link } from "react-router-dom";
import { PageHeader } from "../common/PageHeader";
import { IntroSection } from "./AboutPage/IntroSection";
import { HelloSection } from "./AboutPage/HelloSection";
import { texts } from "../data/Texts";

interface Props {}

export const AboutPage: FC<Props> = ({  }: Props) => {
  return (
    <FullPageWithHeading
      heading={
        <PageHeader icon={Info} headline={texts.aboutPage.headline}>
          <Link to={routing.start}>
            <Octicon icon={Play} /> {texts.aboutPage.startLink}
          </Link>
        </PageHeader>
      }
    >
      <IntroSection />
      <HelloSection />
    </FullPageWithHeading>
  );
};
