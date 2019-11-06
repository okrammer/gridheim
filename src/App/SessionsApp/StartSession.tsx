import React, { FC, useState } from "react";
import { StepIndicator } from "../../common/StepIndicator";
import { Session } from "../../model/Session";
import { GridMapList } from "../../common/GridMapList";
import { GridMap } from "../../model/GridMap";
import Octicon, { Tag, X } from "@primer/octicons-react";
import { ExplanationBox } from "../../common/ExplanationBox";

interface Props {
  onSave: (session: Session) => void;
  onCancel: () => void;
  gridMaps: ReadonlyArray<GridMap>;
}

const steps = {
  selectBackground: "Select Background",
  metadata: "Add Metadata"
};
export const StartSession: FC<Props> = ({
  onSave,
  onCancel,
  gridMaps
}: Props) => {
  const [step, setStep] = useState<string>(steps.selectBackground);
  const [gridMapName, setBackgroundName] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const save = (): void => {
    if (!name || !gridMapName) {
      return;
    }
    onSave(
      Session.of({
        name,
        date: new Date().toLocaleString(),
        gridMapName,
        content: {}
      })
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <a
          href="#"
          className="btn btn-secondary float-right"
          onClick={event => {
            event.preventDefault();
            onCancel();
          }}
        >
          <Octicon icon={X} />
        </a>
        <h5>Start Session</h5>
      </div>

      <div className="card-body">
        <StepIndicator steps={Object.values(steps)} active={step} />
        {!gridMapName && (
          <div className="row mt-3">
            <div className="col-md-12">
              <ExplanationBox>
                Select a map where you want to play from the list below ...
              </ExplanationBox>

              <GridMapList
                gridMaps={gridMaps}
                selected={null}
                onSelect={gridMap => {
                  setBackgroundName(gridMap.name);
                  setStep(steps.metadata);
                }}
              />
            </div>
          </div>
        )}
        {gridMapName && (
          <>
            <div className="row mt-3">
              <div className="col-md-12">
                <ExplanationBox>
                  Provide a memorable name and some other useful information ...
                  and your done :D
                </ExplanationBox>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <Octicon icon={Tag} />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Session Name"
                    onChange={e => setName(e.target.value)}
                    value={name}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => name && save()}
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
