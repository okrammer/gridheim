import React, { FC, useCallback, useEffect, useState } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import { Session } from "../model/Session";
import { SessionStorage } from "../services/SessionStorage";
import { GridMapStorage } from "../services/GridMapStorage";
import { GridMap } from "../model/GridMap";
import { Dict } from "../utils/types";
import Octicon, { Play, Repo, Trashcan } from "@primer/octicons-react";
import { SessionList } from "./SessionsPage/SessionList";
import { ExplanationBox } from "../common/ExplanationBox";
import { combineLatest } from "rxjs";
import { arrayToDict } from "../utils/arrayToDict";
import { PageHeader } from "../common/PageHeader";
import { useNavigation } from "../utils/useNavigation";
import { routing } from "../App";

interface Props {
  gridMapStorage: GridMapStorage;
  sessionStorage: SessionStorage;
}

export const SessionsPage: FC<Props> = ({
  gridMapStorage,
  sessionStorage
}: Props) => {
  const [sessions, setSessions] = useState<ReadonlyArray<Session>>([]);
  const [gridMapsForName, setGridMapForName] = useState<
    Readonly<Dict<GridMap>>
  >({});

  const reload = useCallback((): void => {
    combineLatest([
      sessionStorage.findAll(),
      gridMapStorage.findAll(),
      sessionStorage.findCurrentSessionName()
    ]).subscribe({
      next: ([sessions, gridMaps, sessionName]) => {
        setSessions(sessions);
        setGridMapForName(arrayToDict(gridMaps, gridMap => gridMap.name));
      }
    });
  }, [sessionStorage, gridMapStorage]);

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
                  Start Session
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
                  Delete Session
                </button>
              </>
            )}
          </SessionList>
        </div>
      </div>
    </FullPageWithHeading>
  );
};
