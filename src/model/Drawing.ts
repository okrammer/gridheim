import { DrawingColor } from "./DrawingColor";
import { DrawingWidth } from "./DrawingWidth";

export class Drawing {
  static current(color: DrawingColor, width: DrawingWidth): Drawing {
    return new Drawing(Drawing.CURRENT_ID, [], color, width);
  }

  static readonly CURRENT_ID = "current";

  readonly current = this.id === Drawing.CURRENT_ID;

  constructor(
    readonly id: string,
    readonly path: ReadonlyArray<[number, number]>,
    readonly color: DrawingColor,
    readonly width: DrawingWidth
  ) {}

  get svgPath(): string {
    return this.path.map(p => `${p[0]},${p[1]}`).join(" ");
  }

  withPointAdded(x: number, y: number): Drawing {
    return new Drawing(this.id, [...this.path, [x, y]], this.color, this.width);
  }

  withId(id: string): Drawing {
    return new Drawing(id, this.path, this.color, this.width);
  }
}
