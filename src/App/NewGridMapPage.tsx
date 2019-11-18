import React, { FC } from "react";
import { GridMapStorage } from "../services/GridMapStorage";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import { NewGridMap } from "./NewGridMapPage/NewGridMap";
import { FileMedia } from "@primer/octicons-react";
import { ExplanationBox } from "../common/ExplanationBox";
import { PageHeader } from "../common/PageHeader";
import { useRouter } from "../utils/useRouter";
import { routing } from "../App";

interface Props {
  gridMapStorage: GridMapStorage;
}

export const NewGridMapPage: FC<Props> = ({ gridMapStorage }: Props) => {
  const heading = <PageHeader icon={FileMedia} headline="Add Map"></PageHeader>;

  const router = useRouter();
  const navigateToStart = (): void => {
    router.history.push(routing.start);
  };

  return (
    <>
      <FullPageWithHeading heading={heading}>
        <ExplanationBox>
          <strong>Maps</strong> are stored images with a grid drawn over them.
          <br />
          You create a map by selecting an image file on your computer and
          configure a grid for them. The images are stored locally in your
          browser local storage and are not sent to the internet.
        </ExplanationBox>
        <div className="row">
          <div className="col-md-12">
            <NewGridMap
              onSave={gridMapImage => {
                gridMapStorage.store(gridMapImage);
                navigateToStart();
              }}
              onCancel={() => navigateToStart()}
            />
          </div>
        </div>
      </FullPageWithHeading>
    </>
  );
};
