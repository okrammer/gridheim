import { Immerable } from "../utils/Immerable";
import { BackgroundImage } from "./BackgroundImage";
import { GridMap } from "./GridMap";
import { Transform } from "../utils/Transform";
import { Vector } from "../utils/Vector";

@Immerable()
export class ImageGridMap implements GridMap {
  static readonly STORAGE_KEY_PREFIX = "map-";

  static storageKey(gridMapName: string): string {
    return `${this.STORAGE_KEY_PREFIX}${gridMapName}`;
  }

  static isStorageKey(key: string): boolean {
    return key.startsWith(this.STORAGE_KEY_PREFIX);
  }

  constructor(
    readonly name: string,
    readonly image: BackgroundImage,
    readonly transform: Transform
  ) {
    Object.freeze(this);
  }

  get squares(): Vector {
    return new Vector(this.image.width, this.image.height).scale(
      this.transform.scale
    ).ceil;
  }

  get isAsset(): boolean {
    return false;
  }
}
