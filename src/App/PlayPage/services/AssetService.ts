import { TokenType } from "../../../model/TokenType";
import { AbstractService } from "../../../services/AbstractService";

export class AssetService extends AbstractService {
  readonly defaultStrokeColor = "#555555";
  readonly tokenTypes = [
    new TokenType(1, "#ff28fb", "#ffaaf3", "Mora"),
    new TokenType(1, "#ff8902", "#ffd069", "Elsa"),

    new TokenType(1, "#78cc85", this.defaultStrokeColor, "LightGreen"),
    new TokenType(1, "#077919", this.defaultStrokeColor, "Green"),
    new TokenType(1, "#98c6ff", this.defaultStrokeColor, "LightBlue"),
    new TokenType(1, "#0282ff", this.defaultStrokeColor, "Blue"),
    new TokenType(1, "#9f6a00", this.defaultStrokeColor, "LightBrown"),
    new TokenType(1, "#513200", this.defaultStrokeColor, "Brown"),
    new TokenType(1, "#ff5354", this.defaultStrokeColor, "LightRed"),
    new TokenType(1, "#c70200", this.defaultStrokeColor, "Red"),
    new TokenType(1, "#ffff8e", this.defaultStrokeColor, "LightYellow"),
    new TokenType(1, "#ffef00", this.defaultStrokeColor, "Yellow"),
    new TokenType(1, "#d67eff", this.defaultStrokeColor, "LightPurple"),
    new TokenType(1, "#9f00d3", this.defaultStrokeColor, "Purple"),
    new TokenType(1, "#f4e4ee", this.defaultStrokeColor, "LightGrey"),
    new TokenType(1, "#645e5d", this.defaultStrokeColor, "DarkGrey")
  ];

  tokenTypeForName(name: string): TokenType | null {
    return this.tokenTypes.find(type => type.name === name) || null;
  }

  readonly tokenLabels = [
    " ",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Boss",
    "L1",
    "L2",
    "L3",
    "M1",
    "M2",
    "M3",
    "P1",
    "P2",
    "P3"
  ];
}
