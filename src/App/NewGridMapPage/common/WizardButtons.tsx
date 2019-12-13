import React, { FC } from "react";
import Octicon, {
  Check,
  ChevronLeft,
  ChevronRight
} from "@primer/octicons-react";
import { ButtonBar } from "../../../common/ButtonBar";

interface Props {
  onNext: () => void;
  nextDisabled?: boolean;
  onBack?: () => void;
  lastStep?: boolean;
}

export const WizardButtons: FC<Props> = ({
  onBack,
  onNext,
  nextDisabled,
  lastStep
}: Props) => {
  return (
    <>
      <div>
        <ButtonBar>
          {onBack && (
            <button
              className="btn btn-sm btn-warning"
              onClick={() => {
                onBack();
              }}
              type="button"
            >
              <Octicon icon={ChevronLeft} />
              &nbsp; Back
            </button>
          )}
          <button
            className="btn btn-sm btn-success"
            onClick={onNext}
            type="button"
            disabled={nextDisabled}
          >
            {!lastStep && (
              <>
                <Octicon icon={ChevronRight} />
                &nbsp; Next
              </>
            )}
            {lastStep && (
              <>
                <Octicon icon={Check} />
                &nbsp; Finish
              </>
            )}
          </button>
        </ButtonBar>
      </div>
    </>
  );
};
