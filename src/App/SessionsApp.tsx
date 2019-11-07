import React, { FC, useCallback, useEffect, useState } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import { Session } from "../model/Session";
import { SessionStorage } from "../services/SessionStorage";
import { GridMapStorage } from "../services/GridMapStorage";
import { GridMap } from "../model/GridMap";
import { Dict } from "../utils/types";
import Octicon, { Plus, Repo, Trashcan } from "@primer/octicons-react";
import { StartSession } from "./SessionsApp/StartSession";
import { NoGridMapsFound } from "./SessionsApp/NoGridMapsFound";
import { SessionList } from "./SessionsApp/SessionList";
import { ExplanationBox } from "../common/ExplanationBox";
import { PageHeaderWithButtons } from "../common/PageHeaderWithButtons";
import { StorageProvider } from "../services/StorageProvider";
import { combineLatest } from "rxjs";
import { arrayToDict } from "../utils/arrayToDict";

interface Props {
  storageProvider: StorageProvider;
}

export const SessionsApp: FC<Props> = ({ storageProvider }: Props) => {
  const [selectedSessionName, setSelectedSessionName] = useState<string | null>(
    null
  );
  const [create, setCreate] = useState(false);
  const [sessionStorage] = useState(() => new SessionStorage(storageProvider));
  const [gridMapStorage] = useState(() => new GridMapStorage(storageProvider));
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
        setSelectedSessionName(sessionName);
      }
    });
  }, [sessionStorage, gridMapStorage]);

  useEffect(() => {
    reload();
  }, [reload]);

  const noBackgrounds = Object.keys(gridMapsForName).length === 0;

  const heading = (
    <PageHeaderWithButtons icon={Repo} headline="Sessions">
      {!noBackgrounds && !create && (
        <button className="btn btn-primary" onClick={() => setCreate(true)}>
          <Octicon icon={Plus} />
          <span className="ml-2">Start Session</span>
        </button>
      )}
      {!create && selectedSessionName && (
        <>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              sessionStorage.delete(selectedSessionName);
              setSelectedSessionName(null);
              reload();
            }}
          >
            <Octicon icon={Trashcan} />
            Delete Selected
          </button>
        </>
      )}
    </PageHeaderWithButtons>
  );

  return (
    <FullPageWithHeading heading={heading}>
      <ExplanationBox>
        <strong>Sessions</strong> are the place where all token positions on the
        map and all drawings are stored.
        <br />
        You can switch between sessions on this screen so you can come back to a
        game later ...
      </ExplanationBox>
      {noBackgrounds && <NoGridMapsFound />}
      {!noBackgrounds && !create && (
        <div className="row">
          <div className="col-md-12">
            <SessionList
              sessions={sessions}
              gridMapsForName={gridMapsForName}
              onSelectSession={sessionName => {
                setSelectedSessionName(sessionName);
                sessionStorage.storeCurrentSessionName(sessionName);
              }}
              selectedSessionName={selectedSessionName}
            />
          </div>
        </div>
      )}
      {!noBackgrounds && create && (
        <div className="row">
          <div className="col-md-12">
            <StartSession
              onSave={session => {
                sessionStorage.store(session);
                reload();
                setCreate(false);
              }}
              onCancel={() => {
                setCreate(false);
              }}
              gridMaps={Object.values(gridMapsForName)}
            />
          </div>
        </div>
      )}
    </FullPageWithHeading>
  );
};
