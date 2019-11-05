import React, { FC } from "react";
import { ListGroup } from "./listgroup/ListGroup";
import { ListGroupItemAction } from "./listgroup/ListGroupItemAction";
import { GridMap } from "../model/GridMap";
import { MediaContainer } from "./media/MediaContainer";
import { MediaBody } from "./media/MediaBody";

interface Props {
  gridMaps: ReadonlyArray<GridMap>;
  selected: GridMap | null;
  onSelect: (selected: GridMap) => void;
}

export const GridMapList: FC<Props> = ({
  gridMaps,
  selected,
  onSelect
}: Props) => {
  return (
    <ListGroup>
      {Object.values(gridMaps).map(gridMap => (
        <ListGroupItemAction
          // className="gridMap-list_item"
          active={gridMap === selected}
          key={gridMap.name}
          onClick={() => onSelect(gridMap)}
        >
          <MediaContainer>
            <MediaBody>
              <h4>{gridMap.name}</h4>
              <dl className="row">
                <dt className="col-sm-3">Size in Squares</dt>
                <dd className="col-sm-9">
                  {gridMap.getWidthInSquares()}x{gridMap.getHeightInSquares()}
                </dd>

                <dt className="col-sm-3">Scale</dt>
                <dd className="col-sm-9">{gridMap.transformation.scale}</dd>

                <dt className="col-sm-3">X Offset</dt>
                <dd className="col-sm-9">{gridMap.transformation.dx}</dd>

                <dt className="col-sm-3">Y Offset</dt>
                <dd className="col-sm-9">{gridMap.transformation.dy}</dd>
              </dl>
            </MediaBody>
            <img
              className="ml-3 img-thumbnail image-300"
              src={gridMap.image.url}
            />
          </MediaContainer>
        </ListGroupItemAction>
      ))}
    </ListGroup>
  );
};
