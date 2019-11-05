import { GridMap } from "../model/GridMap";
import { Transformation } from "../model/Transformation";
import { BackgroundImage } from "../model/BackgroundImage";
import { AbstractStorage } from "./AbstractStorage";

export class GridMapStorage extends AbstractStorage<GridMap, string> {
  protected readonly isStorageKey = (key: string): boolean =>
    GridMap.isStorageKey(key);
  protected readonly parseJson = (json: any): GridMap => {
    return GridMap.of({
      name: json.name,
      image: BackgroundImage.of(json.image),
      transformation: Transformation.of(json.transformation)
    });
  };

  protected readonly toStorageKey = (gridMap: GridMap): string =>
    GridMap.storageKey(gridMap.name);
  protected readonly keyToStorageKey = (name: string): string =>
    GridMap.storageKey(name);
}
