import React, { FC } from "react";
import { TokenType } from "../model/TokenType";
import { Square } from "../model/Square";
import { classesMap, ClassesMap } from "../utils/classesMap";

interface Props {
  tokenType: TokenType;
  tokenLabel: string;
  tokenSize: number;
  tokenClasses?: ClassesMap;
  square?: Square;
  onClick?: () => void;
}

export const DisplayToken: FC<Props> = ({
  tokenClasses,
  tokenType,
  tokenSize,
  tokenLabel,
  square,
  onClick
}: Props) => {
  square = square || new Square(0, 0);
  return (
    <g onClick={onClick}>
      <circle
        className={`token ${tokenClasses ? classesMap(tokenClasses) : ""}`}
        fill={tokenType.color}
        stroke={tokenType.border}
        r={tokenSize / 2}
        cx={square.x + tokenSize / 2}
        cy={square.y + tokenSize / 2}
      />
      {tokenLabel && (
        <text
          className="token-text"
          x={square.x + tokenSize / 2}
          y={square.y + 0.2 + tokenSize / 2}
        >
          {tokenLabel}
        </text>
      )}
    </g>
  );
};
