import { Immerable } from "../utils/Immerable";
import { Transformation } from "./Transformation";
import { BackgroundImage } from "./BackgroundImage";
import { PropsOf } from "../utils/types";
import { GridMap } from "./GridMap";

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
    readonly transformation: Transformation
  ) {
    Object.freeze(this);
  }

  get widthInSquares(): number {
    return Math.ceil(this.image.width * this.transformation.scale);
  }

  get heightInSquares(): number {
    return Math.ceil(this.image.height * this.transformation.scale);
  }

  get isAsset(): boolean {
    return false;
  }
}
