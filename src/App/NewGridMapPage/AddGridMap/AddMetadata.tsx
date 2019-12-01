import React, { FC, useState } from "react";
import Octicon, { Tag } from "@primer/octicons-react";
import { WizardButtons } from "./TransformationSetup/common/WizardButtons";

interface Props {
  onSave: (name: string) => void;
  onBack: () => void;
}

export const AddMetadata: FC<Props> = ({ onSave, onBack }: Props) => {
  const [name, setName] = useState<undefined | string>("");
  return (
    <>
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="alert alert-primary">
            Last step provide a good name for the map ... and your done :D
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <Octicon icon={Tag} />
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Background Name"
              onChange={(e): void => {
                setName(e.target.value);
              }}
              value={name}
            />
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <WizardButtons
            onNext={() => name && onSave(name)}
            onBack={() => onBack()}
            nextDisabled={!name}
            lastStep={true}
          />
        </div>
      </div>
    </>
  );
};
