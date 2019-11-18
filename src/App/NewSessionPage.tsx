import React, { FC, useEffect, useState } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import { SessionStorage } from "../services/SessionStorage";
import { GridMapStorage } from "../services/GridMapStorage";
import { GridMap } from "../model/GridMap";
import { Dict } from "../utils/types";
import { Repo } from "@primer/octicons-react";
import { StartSession } from "./SessionsPage/StartSession";
import { NoGridMapsFound } from "./SessionsPage/NoGridMapsFound";
import { ExplanationBox } from "../common/ExplanationBox";
import { arrayToDict } from "../utils/arrayToDict";
import { PageHeader } from "../common/PageHeader";
import { routing } from "../App";
import { useNavigation } from "../utils/useNavigation";
import { texts } from "../data/Texts";

interface Props {
  sessionStorage: SessionStorage;
  gridMapStorage: GridMapStorage;
}

export const NewSessionPage: FC<Props> = ({
  sessionStorage,
  gridMapStorage
}: Props) => {
  const [gridMapsForName, setGridMapForName] = useState<
    Readonly<Dict<GridMap>>
  >({});

  useEffect(() => {
    gridMapStorage.findAll().subscribe({
      next: gridMaps => {
        setGridMapForName(arrayToDict(gridMaps, gridMap => gridMap.name));
      }
    });
  }, [gridMapStorage, sessionStorage]);

  const [navigateToStart, navigateToPlay] = useNavigation(
    routing.start,
    routing.play
  );
  const noGridMaps = Object.keys(gridMapsForName).length === 0;

  return (
    <FullPageWithHeading
      heading={
        <PageHeader icon={Repo} headline={texts.newSessionPage.headline} />
      }
    >
      <ExplanationBox>{texts.newSessionPage.explanation}</ExplanationBox>
      {noGridMaps && <NoGridMapsFound />}

      {!noGridMaps && (
        <div className="row">
          <div className="col-md-12">
            <StartSession
              onSave={session => {
                sessionStorage.store(session);
                sessionStorage.storeCurrentSessionName(session.name);
                navigateToPlay();
              }}
              onCancel={() => {
                navigateToStart();
              }}
              gridMaps={Object.values(gridMapsForName)}
            />
          </div>
        </div>
      )}
    </FullPageWithHeading>
  );
};
