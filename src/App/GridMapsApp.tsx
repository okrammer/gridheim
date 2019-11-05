import React, { FC, useEffect, useState } from "react";
import { GridMapStorage } from "../services/GridMapStorage";
import { GridMap } from "../model/GridMap";
import { GridMapList } from "../common/GridMapList";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import { AddGridMap } from "./GridMapsApp/AddGridMap";
import Octicon, { FileMedia, Plus, Trashcan } from "@primer/octicons-react";
import { ExplanationBox } from "../common/ExplanationBox";
import { PageHeaderWithButtons } from "../common/PageHeaderWithButtons";
import { StorageProvider } from "../services/StorageProvider";

interface Props {
  storageProvider: StorageProvider;
}

export const GridMapsApp: FC<Props> = ({ storageProvider }: Props) => {
  const [create, setCreate] = useState(false);
  const [selected, setSelected] = useState<GridMap | null>(null);
  const [gridMapStorage] = useState(() => new GridMapStorage(storageProvider));
  const [gridMaps, setGridMaps] = useState<ReadonlyArray<GridMap>>([]);
  const reload = (): void => {
    gridMapStorage.findAll().subscribe({ next: setGridMaps });
  };
  useEffect(() => {
    reload();
  }, []);

  const heading = (
    <PageHeaderWithButtons icon={FileMedia} headline="Manage Maps">
      {!create && (
        <button className="btn btn-primary" onClick={() => setCreate(true)}>
          <Octicon icon={Plus} />
          <span className="ml-2">New Map</span>
        </button>
      )}
      {!create && selected && (
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
        {!create && (
          <div>
            <div className="col-md-12">
              <GridMapList
                gridMaps={gridMaps}
                selected={selected}
                onSelect={setSelected}
              />
            </div>
          </div>
        )}
        {create && (
          <div className="row">
            <div className="col-md-12">
              <AddGridMap
                onSave={gridMapImage => {
                  gridMapStorage.store(gridMapImage);
                  reload();
                  setCreate(false);
                }}
                onCancel={() => setCreate(false)}
              />
            </div>
          </div>
        )}
      </FullPageWithHeading>
    </>
  );
};
