import React, { FC } from "react";
import Octicon, { Tag } from "@primer/octicons-react";
import { useStateWithCallback } from "../../../utils/useStateWithCallback";

interface Props {
  onChange: (name: string | null) => void;
}

export const AddMetadata: FC<Props> = ({ onChange }: Props) => {
  const [name, setName] = useStateWithCallback<string | null>(null, onChange);
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
                setName(e.target.value || null);
              }}
              value={name || ""}
            />
          </div>
        </div>
      </div>
    </>
  );
};
