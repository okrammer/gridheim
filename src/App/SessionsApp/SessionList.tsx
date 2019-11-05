import React, { FC } from "react";
import { ListGroupItemAction } from "../../common/listgroup/ListGroupItemAction";
import { MediaContainer } from "../../common/media/MediaContainer";
import { MediaBody } from "../../common/media/MediaBody";
import { ListGroup } from "../../common/listgroup/ListGroup";
import { Session } from "../../model/Session";
import { GridMap } from "../../model/GridMap";
import { Dict } from "../../utils/types";

interface Props {
  sessions: ReadonlyArray<Session>;
  gridMapsForName: Readonly<Dict<GridMap>>;
  selectedSessionName?: string | null;
  onSelectSession: (sessionName: string) => void;
}

export const SessionList: FC<Props> = ({
  sessions,
  gridMapsForName,
  selectedSessionName,
  onSelectSession
}: Props) => {
  return (
    <ListGroup>
      {sessions.map(session => {
        const gridMap = gridMapsForName[session.gridMapName];

        return (
          <ListGroupItemAction
            key={session.name}
            active={session.name === selectedSessionName}
            onClick={() => {
              onSelectSession(session.name);
            }}
          >
            <MediaContainer>
              <MediaBody>
                <h4>{session.name}</h4>
                <dl className="row">
                  {gridMap && (
                    <>
                      <dt className="col-sm-3">Map</dt>
                      <dd className="col-sm-9">
                        {gridMap.name} ({gridMap.getWidthInSquares()}x
                        {gridMap.getHeightInSquares()})
                      </dd>
                    </>
                  )}

                  <dt className="col-sm-3">Date</dt>
                  <dd className="col-sm-9">{session.date}</dd>
                </dl>
                {!gridMap && (
                  <span className="badge badge-pill badge-danger">
                    Invalid: Background is missing
                  </span>
                )}
              </MediaBody>
              {gridMap && (
                <img
                  src={gridMap.image.url}
                  className="img-thumbnail image-200"
                />
              )}
            </MediaContainer>
          </ListGroupItemAction>
        );
      })}
    </ListGroup>
  );
};
