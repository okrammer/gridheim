import { Immerable } from "../utils/Immerable";

@Immerable()
export class TokenType {
  constructor(
    readonly size: number,
    readonly color: string,
    readonly border: string,
    readonly name: string
  ) {}
}
