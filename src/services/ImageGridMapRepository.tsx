import { ImageGridMap } from "../model/ImageGridMap";
import { Transformation } from "../model/Transformation";
import { BackgroundImage } from "../model/BackgroundImage";
import { AbstractStorage } from "./AbstractStorage";

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
      Transformation.of(json.transformation)
    );
  };

  protected readonly toStorageKey = (gridMap: ImageGridMap): string =>
    ImageGridMap.storageKey(gridMap.name);
  protected readonly keyToStorageKey = (name: string): string =>
    ImageGridMap.storageKey(name);
}
