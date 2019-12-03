import { ImageGridMap } from "../model/ImageGridMap";
import { BackgroundImage } from "../model/BackgroundImage";
import { AbstractStorage } from "./AbstractStorage";
import { Transform } from "../utils/Transform";
import { Vector } from "../utils/Vector";

export class ImageGridMapRepository extends AbstractStorage<
  ImageGridMap,
  string
> {
  protected readonly isStorageKey = (key: string): boolean =>
    ImageGridMap.isStorageKey(key);

  protected readonly parseJson = (json: any): ImageGridMap => {
    return new ImageGridMap(
      json.name,
      BackgroundImage.of(json.image),
      new Transform(
        Vector.fromCoords(json.transform.translate),
        json.transform.scale
      )
    );
  };

  protected readonly toStorageKey = (gridMap: ImageGridMap): string =>
    ImageGridMap.storageKey(gridMap.name);

  protected readonly keyToStorageKey = (name: string): string =>
    ImageGridMap.storageKey(name);
}
