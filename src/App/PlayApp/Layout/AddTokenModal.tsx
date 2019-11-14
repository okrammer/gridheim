import React, { FC, useCallback } from "react";
import { LayoutGrid } from "../../../common/LayoutGrid";
import { TokenTypeSelection } from "./AddTokenModal/TokenTypeSelection";
import { Modal } from "../../../common/Modal";
import { ManageTokenService } from "../services/modebased/ManageTokenService";
import { useObservable } from "../../../utils/useObservable";
import { AssetService } from "../services/AssetService";
import { range } from "../../../utils/range";

interface Props {
  assetService: AssetService;
  manageTokenService: ManageTokenService;
}

export const AddTokenModal: FC<Props> = ({
  assetService,
  manageTokenService
}: Props) => {
  const showModal = useObservable(manageTokenService.isSwitchTokenType$, false);
  const selectedTokenType = useObservable(
    manageTokenService.tokenType$,
    manageTokenService.tokenType
  );
  const selectedTokenLabel = useObservable(
    manageTokenService.tokenLabel$,
    manageTokenService.tokenLabel
  );
  const selectedTokenSize = useObservable(
    manageTokenService.tokenSize$,
    manageTokenService.tokenSize
  );

  const onCancel = useCallback(
    () => manageTokenService.switchMode("add-token"),
    [manageTokenService]
  );

  return (
    <Modal
      onCancel={onCancel}
      buttonText={"place it"}
      header={"Add Token"}
      open={showModal}
    >
      {!!selectedTokenLabel && !!selectedTokenType && !!selectedTokenSize && (
        <div>
          <LayoutGrid
            items={assetService.tokenTypes}
            columns={6}
            component={tokenType => (
              <TokenTypeSelection
                tokenLabel={selectedTokenLabel}
                tokenType={tokenType}
                tokenSize={1} // to preserve the layout
                onClick={() => manageTokenService.setTokenType(tokenType)}
                selected={tokenType === selectedTokenType}
                svgSize={40}
                maxTokenSize={1}
              />
            )}
          />
          <LayoutGrid
            items={assetService.tokenLabels}
            columns={6}
            component={label => (
              <TokenTypeSelection
                tokenLabel={label}
                tokenType={selectedTokenType}
                tokenSize={1} // to preserve the layout
                onClick={() => manageTokenService.setTokenLabel(label)}
                selected={selectedTokenLabel === label}
                svgSize={40}
                maxTokenSize={1}
              />
            )}
          />

          <LayoutGrid
            items={range(3)}
            columns={3}
            component={i => {
              const size = i + 1;

              return (
                <TokenTypeSelection
                  tokenLabel={selectedTokenLabel}
                  tokenType={selectedTokenType}
                  tokenSize={size}
                  onClick={() => manageTokenService.setTokenSize(size)}
                  selected={selectedTokenSize === size}
                  svgSize={90}
                  maxTokenSize={3}
                />
              );
            }}
          />
        </div>
      )}
    </Modal>
  );
};
