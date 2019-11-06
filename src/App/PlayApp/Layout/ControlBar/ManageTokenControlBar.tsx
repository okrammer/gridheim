import React, { FC, ReactNode } from "react";
import { Icon, Plus, Trashcan } from "@primer/octicons-react";
import { useObservable } from "../../../../utils/useObservable";
import { ControlBarButton } from "../../common/ControlBarButton";
import {
  ManageTokenService,
  Mode
} from "../../services/modebased/ManageTokenService";
import { DisplayToken } from "../../../../common/DisplayToken";
import { classesMap } from "../../../../utils/classesMap";

interface Props {
  manageTokenService: ManageTokenService;
}

export const ManageTokenControlBar: FC<Props> = ({
  manageTokenService
}: Props) => {
  const active = useObservable(manageTokenService.active$, false);
  const tokenType = useObservable(manageTokenService.tokenType$, null);
  const tokenLabel = useObservable(manageTokenService.tokenLabel$, null);
  const currentMode = useObservable(manageTokenService.mode$, "add-token");

  const modeButton = (icon: Icon, mode: Mode): ReactNode => (
    <ControlBarButton
      icon={icon}
      onClick={() => manageTokenService.switchMode(mode)}
      classes={{
        "btn-warning": mode === currentMode,
        "btn-outline-warning": mode !== currentMode
      }}
    />
  );

  return (
    <>
      {active && (
        <div className="mt-md-5">
          {modeButton(Plus, "add-token")}
          {modeButton(Trashcan, "remove-token")}
          <div>
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                manageTokenService.switchMode("switch-token-type");
              }}
              className={classesMap({
                btn: true,
                "btn-sm": true,
                "btn-warning": "switch-token-type" === currentMode,
                "btn-outline-warning": "switch-token-type" !== currentMode
              })}
            >
              {tokenType && tokenLabel && (
                <svg viewBox="-0.1 -0.1 1.15 1.15" width={16} height={16}>
                  <DisplayToken
                    tokenLabel={tokenLabel}
                    tokenType={tokenType}
                    tokenSize={1}
                  />
                </svg>
              )}
            </a>
          </div>
        </div>
      )}
    </>
  );
};
