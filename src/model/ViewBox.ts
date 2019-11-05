import { Immerable } from "../utils/Immerable";

@Immerable()
export class ViewBox {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly width: number,
    readonly height: number
  ) {}

  toViewBoxString(): string {
    return `${this.x} ${this.y} ${this.width} ${this.height}`;
  }
}
