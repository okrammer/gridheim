import React, { FC, useCallback, useEffect, useState } from "react";
import { GridMapStorage } from "../services/GridMapStorage";
import { GridMap } from "../model/GridMap";
import { GridMapList } from "../common/GridMapList";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import Octicon, { FileMedia, Trashcan } from "@primer/octicons-react";
import { ExplanationBox } from "../common/ExplanationBox";
import { PageHeaderWithButtons } from "../common/PageHeaderWithButtons";

interface Props {
  gridMapStorage: GridMapStorage;
}

export const GridMapsPage: FC<Props> = ({ gridMapStorage }: Props) => {
  const [selected, setSelected] = useState<GridMap | null>(null);
  const [gridMaps, setGridMaps] = useState<ReadonlyArray<GridMap>>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reload = useCallback((): void => {
    gridMapStorage.findAll().subscribe({ next: setGridMaps });
  }, [gridMapStorage]);
  useEffect(() => {
    reload();
  }, [reload]);

  const heading = (
    <PageHeaderWithButtons icon={FileMedia} headline="Manage Maps">
      {selected && (
        <>
          <button
            type="button"
            className="btn btn-danger ml-2"
            onClick={() => {
              gridMapStorage.delete(selected.name);
              setSelected(null);
              reload();
            }}
          >
            <Octicon icon={Trashcan} />
            Delete Selected Map
          </button>
        </>
      )}
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
            <GridMapList
              gridMaps={gridMaps}
              selected={selected}
              onSelect={setSelected}
            />
          </div>
        </div>
      </FullPageWithHeading>
    </>
  );
};
