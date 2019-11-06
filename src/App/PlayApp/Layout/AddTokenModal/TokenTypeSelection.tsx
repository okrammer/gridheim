import React, { FC } from "react";
import { DisplayToken } from "../../../../common/DisplayToken";
import { TokenType } from "../../../../model/TokenType";
import { classesMap } from "../../../../utils/classesMap";
import { ViewBox } from "../../../../model/ViewBox";
import { BackgroundGrid } from "../PlayMap/BackgroundGrid";

interface Props {
  tokenType: TokenType;
  tokenLabel: string;
  tokenSize: number;
  onClick: () => void;
  selected: boolean;
  svgSize: number;
  maxTokenSize: number;
}

export const TokenTypeSelection: FC<Props> = ({
  tokenType,
  tokenLabel,
  tokenSize,
  onClick,
  selected,
  svgSize,
  maxTokenSize
}: Props) => {
  const viewBox = new ViewBox(
    -0.25,
    -0.25,
    maxTokenSize + 0.5,
    maxTokenSize + 0.5
  );
  return (
    <a
      className={classesMap({
        btn: true,
        "btn-outline-secondary": !selected,
        "btn-secondary": selected
      })}
      onClick={event => {
        event.preventDefault();
        onClick();
      }}
    >
      <svg viewBox={viewBox.toViewBoxString()} width={svgSize} height={svgSize}>
        <BackgroundGrid width={maxTokenSize} height={maxTokenSize} />
        <DisplayToken
          tokenLabel={tokenLabel}
          tokenType={tokenType}
          tokenSize={tokenSize}
        />
      </svg>
    </a>
  );
};
