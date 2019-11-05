import React, { FC, ReactNode } from "react";
import { Token } from "../../../../model/Token";
import { Observable } from "rxjs";
import { useObservable } from "../../../../utils/useObservable";
import { DisplayToken } from "../../../../common/DisplayToken";

interface Props {
  tokens: ReadonlyArray<Token>;
  onClick: (token: Token | null) => void;
  selectedToken$: Observable<Token | null>;
}

export const DisplayTokens: FC<Props> = ({
  tokens,
  onClick,
  selectedToken$
}: Props) => {
  const selectedToken = useObservable(selectedToken$, null);

  const renderToken = (token: Token): ReactNode => {
    return (
      <g key={token.id}>
        <DisplayToken
          tokenType={token.tokenType}
          tokenLabel={token.label}
          tokenSize={token.size}
          square={token.square}
          onClick={() => onClick(token)}
        />
      </g>
    );
  };

  return (
    <g>
      {tokens.map(renderToken)}
      {selectedToken && (
        <DisplayToken
          tokenType={selectedToken.tokenType}
          tokenLabel={selectedToken.label}
          tokenSize={selectedToken.size}
          square={selectedToken.square}
          onClick={() => onClick(null)}
          tokenClasses={{ "selected-token": true }}
        />
      )}
    </g>
  );
};
