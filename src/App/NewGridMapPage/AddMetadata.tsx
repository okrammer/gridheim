import React, { FC } from "react";
import Octicon, { Tag } from "@primer/octicons-react";
import { useStateWithCallback } from "../../utils/useStateWithCallback";
import { Row } from "../../common/Row";

interface Props {
  onChange: (name: string | null) => void;
}

export const AddMetadata: FC<Props> = ({ onChange }: Props) => {
  const [name, setName] = useStateWithCallback<string | null>(null, onChange);
  return (
    <>
      <Row>
        <div className="input-group">
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
      </Row>
    </>
  );
};
