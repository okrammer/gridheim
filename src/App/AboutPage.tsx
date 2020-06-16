import React, { FC } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import Octicon, { Info, Play } from "@primer/octicons-react";
import { routing } from "../App";
import { Link } from "react-router-dom";
import { PageHeader } from "../common/PageHeader";
import { IntroSection } from "./AboutPage/IntroSection";
import { HelloSection } from "./AboutPage/HelloSection";
import { labels } from "../data/labels";
import { GithubSecton } from "./AboutPage/GithubSection";

interface Props {}

export const AboutPage: FC<Props> = ({}: Props) => {
  return (
    <FullPageWithHeading
      heading={
        <PageHeader icon={Info} headline={labels.aboutPage.headline}>
          <Link to={routing.start}>
            <Octicon icon={Play} /> {labels.aboutPage.startLink}
          </Link>
        </PageHeader>
      }
    >
      <IntroSection />
      <HelloSection />
      <GithubSecton />
    </FullPageWithHeading>
  );
};
