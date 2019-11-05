import { Immerable } from "../utils/Immerable";
import { Transformation } from "./Transformation";
import { BackgroundImage } from "./BackgroundImage";
import { PropsOf } from "../utils/types";

@Immerable()
export class GridMap {
  static readonly STORAGE_KEY_PREFIX = "map-";

  static storageKey(gridMapName: string): string {
    return `${this.STORAGE_KEY_PREFIX}${gridMapName}`;
  }

  static isStorageKey(key: string): boolean {
    return key.startsWith(this.STORAGE_KEY_PREFIX);
  }

  public static of(props: PropsOf<GridMap>): GridMap {
    return Object.freeze(
      new GridMap(props.name, props.image, props.transformation)
    );
  }

  private constructor(
    readonly name: string,
    readonly image: BackgroundImage,
    readonly transformation: Transformation
  ) {}

  with(props: { [T in keyof GridMap]?: GridMap[T] }): GridMap {
    const copy = new GridMap(this.name, this.image, this.transformation);
    return Object.freeze(Object.assign(copy, props));
  }

  getWidthInSquares(): number {
    return Math.ceil(this.image.width * this.transformation.scale);
  }

  getHeightInSquares(): number {
    return Math.ceil(this.image.height * this.transformation.scale);
  }
}
