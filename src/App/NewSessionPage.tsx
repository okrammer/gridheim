import React, { FC, useEffect, useState } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import { SessionRepository } from "../services/SessionRepository";
import { Dict } from "../utils/types";
import { Repo } from "@primer/octicons-react";
import { StartSession } from "./SessionsPage/StartSession";
import { NoGridMapsFound } from "./SessionsPage/NoGridMapsFound";
import { ExplanationBox } from "../common/ExplanationBox";
import { arrayToDict } from "../utils/arrayToDict";
import { PageHeader } from "../common/PageHeader";
import { routing } from "../App";
import { useNavigation } from "../utils/useNavigation";
import { labels } from "../data/labels";
import { GridMapService } from "../services/GridMapService";
import { GridMap } from "../model/GridMap";

interface Props {
  sessionRepository: SessionRepository;
  gridMapService: GridMapService;
}

export const NewSessionPage: FC<Props> = ({
  sessionRepository,

  gridMapService
}: Props) => {
  const [gridMapsForName, setGridMapForName] = useState<
    Readonly<Dict<GridMap>>
  >({});

  useEffect(() => {
    gridMapService.getGridMaps().subscribe({
      next: gridMaps => {
        setGridMapForName(arrayToDict(gridMaps, gridMap => gridMap.name));
      }
    });
  }, [gridMapService, sessionRepository]);

  const [navigateToStart, navigateToPlay] = useNavigation(
    routing.start,
    routing.play
  );
  const noGridMaps = Object.keys(gridMapsForName).length === 0;

  return (
    <FullPageWithHeading
      heading={
        <PageHeader icon={Repo} headline={labels.newSessionPage.headline} />
      }
    >
      <ExplanationBox>{labels.newSessionPage.explanation}</ExplanationBox>
      {noGridMaps && <NoGridMapsFound />}

      {!noGridMaps && (
        <div className="row">
          <div className="col-md-12">
            <StartSession
              onSave={session => {
                sessionRepository.store(session);
                sessionRepository.storeCurrentSessionName(session.name);
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
