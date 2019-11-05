import { PropsOf } from "../utils/types";

export class BackgroundImage {
  public static of(props: PropsOf<BackgroundImage>): BackgroundImage {
    return Object.freeze(
      new BackgroundImage(props.url, props.width, props.height)
    );
  }

  constructor(
    readonly url: string,
    readonly width: number,
    readonly height: number
  ) {}

  with(
    props: { [T in keyof BackgroundImage]?: BackgroundImage[T] }
  ): BackgroundImage {
    const copy = new BackgroundImage(this.url, this.width, this.height);
    return Object.freeze(Object.assign(copy, props));
  }
}
