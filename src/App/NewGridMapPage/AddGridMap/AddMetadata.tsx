import React, { FC, useState } from "react";
import Octicon, { Tag } from "@primer/octicons-react";

interface Props {
  onSave: (name: string) => void;
}

export const AddMetadata: FC<Props> = ({ onSave }: Props) => {
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
          <button
            className="btn btn-success"
            type="button"
            onClick={(): void => {
              name && onSave(name);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
