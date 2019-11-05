import { Immerable } from "../utils/Immerable";

@Immerable()
export class Board {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly width: number,
    readonly height: number,
    readonly image: string
  ) {}
}
