import React, { FC, ReactNode } from "react";
import { ListGroup } from "./listgroup/ListGroup";
import { ImageGridMap } from "../model/ImageGridMap";
import { MediaContainer } from "./media/MediaContainer";
import { MediaBody } from "./media/MediaBody";
import { GridMap } from "../model/GridMap";
import { ListGroupItem } from "./listgroup/ListGroupItem";

interface Props {
  gridMaps: ReadonlyArray<GridMap>;
  children?: (gridMap: GridMap) => ReactNode;
}

export const GridMapList: FC<Props> = ({ gridMaps, children }: Props) => {
  return (
    <ListGroup>
      {Object.values(gridMaps).map((gridMap: GridMap) => {
        return (
          <ListGroupItem key={gridMap.name}>
            <MediaContainer>
              <MediaBody>
                <h4>{gridMap.name}</h4>
                <dl className="row">
                  <dt className="col-sm-3">Size in Squares</dt>
                  <dd className="col-sm-9">
                    {gridMap.widthInSquares}x{gridMap.heightInSquares}
                  </dd>

                  {gridMap instanceof ImageGridMap && (
                    <>
                      <dt className="col-sm-3">Scale</dt>
                      <dd className="col-sm-9">
                        {gridMap.transformation.scale}
                      </dd>

                      <dt className="col-sm-3">X Offset</dt>
                      <dd className="col-sm-9">{gridMap.transformation.dx}</dd>

                      <dt className="col-sm-3">Y Offset</dt>
                      <dd className="col-sm-9">{gridMap.transformation.dy}</dd>
                    </>
                  )}
                </dl>
                <div>{children && children(gridMap)}</div>
              </MediaBody>
              {gridMap instanceof ImageGridMap && (
                <img
                  className="ml-3 img-thumbnail image-300"
                  src={gridMap.image.url}
                />
              )}
            </MediaContainer>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};
