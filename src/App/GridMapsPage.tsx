import React, { FC, useCallback, useEffect, useState } from "react";
import { ImageGridMap } from "../model/ImageGridMap";
import { GridMapList } from "../common/GridMapList";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import Octicon, { FileMedia, Trashcan } from "@primer/octicons-react";
import { ExplanationBox } from "../common/ExplanationBox";
import { PageHeaderWithButtons } from "../common/PageHeaderWithButtons";
import { ImageGridMapRepository } from "../services/ImageGridMapRepository";

interface Props {
  imageGridMapRepository: ImageGridMapRepository;
}

export const GridMapsPage: FC<Props> = ({ imageGridMapRepository }: Props) => {
  const [selected, setSelected] = useState<ImageGridMap | null>(null);
  const [gridMaps, setGridMaps] = useState<ReadonlyArray<ImageGridMap>>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reload = useCallback((): void => {
    imageGridMapRepository.findAll().subscribe({ next: setGridMaps });
  }, [imageGridMapRepository]);
  useEffect(() => {
    reload();
  }, [reload]);

  const heading = (
    <PageHeaderWithButtons icon={FileMedia} headline="Manage Maps">
      {selected && <></>}
    </PageHeaderWithButtons>
  );

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
        <div>
          <div className="col-md-12">
            <GridMapList gridMaps={gridMaps}>
              {gridMap => (
                <button
                  type="button"
                  className="btn btn-danger ml-2"
                  onClick={() => {
                    imageGridMapRepository.delete(gridMap.name);
                    setSelected(null);
                    reload();
                  }}
                >
                  <Octicon icon={Trashcan} />
                  &nbsp; Delete Map
                </button>
              )}
            </GridMapList>
          </div>
        </div>
      </FullPageWithHeading>
    </>
  );
};
