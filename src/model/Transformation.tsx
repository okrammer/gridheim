import { PropsOf, SomePropsOf } from "../utils/types";

export class Transformation {
  public static default(): Transformation {
    return Object.freeze(new Transformation(0, 0, 1));
  }

  public static of(props: PropsOf<Transformation>): Transformation {
    return Object.freeze(new Transformation(props.dx, props.dy, props.scale));
  }

  private constructor(
    readonly dx: number,
    readonly dy: number,
    readonly scale: number
  ) {}

  with(props: SomePropsOf<Transformation>): Transformation {
    const copy = new Transformation(this.dx, this.dy, this.scale);
    return Object.freeze(Object.assign(copy, props));
  }

  asTransformString(): string {
    return `scale(${this.scale} ${this.scale}) translate(${this.dx} ${this.dy})`;
  }
}
