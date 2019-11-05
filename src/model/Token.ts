import { TokenType } from "./TokenType";
import { Immerable } from "../utils/Immerable";
import { Square } from "./Square";

@Immerable()
export class Token {
  constructor(
    readonly id: string,
    readonly tokenType: TokenType,
    readonly label: string,
    readonly square: Square,
    readonly size: number = tokenType.size
  ) {}
}
