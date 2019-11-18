import React, { FC } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import { Octoface } from "@primer/octicons-react";
import { PageHeader } from "../common/PageHeader";
import { OpenSourceSection } from "./OpenSourcePage/OpenSourceSection";

interface Props {}

export const OpenSourcePage: FC<Props> = ({  }: Props) => {
  return (
    <FullPageWithHeading
      heading={<PageHeader icon={Octoface} headline="Open Source"></PageHeader>}
    >
      <OpenSourceSection />
    </FullPageWithHeading>
  );
};
