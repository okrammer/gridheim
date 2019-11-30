import React, { FC, useCallback, useEffect, useState } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import { Session } from "../model/Session";
import { SessionRepository } from "../services/SessionRepository";
import { Dict } from "../utils/types";
import Octicon, { Play, Repo, Trashcan } from "@primer/octicons-react";
import { SessionList } from "./SessionsPage/SessionList";
import { ExplanationBox } from "../common/ExplanationBox";
import { combineLatest } from "rxjs";
import { arrayToDict } from "../utils/arrayToDict";
import { PageHeader } from "../common/PageHeader";
import { useNavigation } from "../utils/useNavigation";
import { routing } from "../App";
import { GridMapService } from "../services/GridMapService";
import { GridMap } from "../model/GridMap";

interface Props {
  gridMapService: GridMapService;
  sessionRepository: SessionRepository;
}

export const SessionsPage: FC<Props> = ({
  gridMapService,
  sessionRepository
}: Props) => {
  const [sessions, setSessions] = useState<ReadonlyArray<Session>>([]);
  const [gridMapsForName, setGridMapForName] = useState<
    Readonly<Dict<GridMap>>
  >({});

  const reload = useCallback((): void => {
    combineLatest([
      sessionRepository.findAll(),
      gridMapService.getGridMaps()
    ]).subscribe({
      next: ([sessions, gridMaps]) => {
        setSessions(sessions);
        setGridMapForName(arrayToDict(gridMaps, gridMap => gridMap.name));
      }
    });
  }, [sessionStorage, gridMapService]);

  useEffect(() => {
    reload();
  }, [reload]);

  const [navigateToPlay] = useNavigation(routing.play);

  const heading = <PageHeader icon={Repo} headline="Sessions" />;

  return (
    <FullPageWithHeading heading={heading}>
      <ExplanationBox>
        <strong>Sessions</strong> are the place where all token positions on the
        map and all drawings are stored.
        <br />
        You can switch between sessions on this screen so you can come back to a
        game later ...
      </ExplanationBox>
      <div className="row">
        <div className="col-md-12">
          <SessionList sessions={sessions} gridMapsForName={gridMapsForName}>
            {session => (
              <>
                <button
                  type="button"
                  className="btn btn-primary mr-2"
                  onClick={() => {
                    sessionStorage.storeCurrentSessionName(session.name);
                    navigateToPlay();
                  }}
                >
                  <Octicon icon={Play} />
                  &nbsp; Start Session
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    sessionStorage.delete(session.name);
                    reload();
                  }}
                >
                  <Octicon icon={Trashcan} />
                  &nbsp; Delete Session
                </button>
              </>
            )}
          </SessionList>
        </div>
      </div>
    </FullPageWithHeading>
  );
};
