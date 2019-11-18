import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { ExplanationBox } from "../../../common/ExplanationBox";
import Octicon, { Check } from "@primer/octicons-react";

interface Props {
  initialUrl: string | null;
  onApply: (url: string) => void;
}

export const ImageUpload: FC<Props> = ({ initialUrl, onApply }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    setImageUrl(initialUrl);
  }, [initialUrl]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event!.target!.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setImageUrl(url);
      };

      reader.readAsDataURL(file);
    }
  };
  const onResetImage = (): void => {
    setImageUrl(null);
  };

  const onNext = (): void => {
    onApply(imageUrl!);
  };

  return (
    <>
      {!!imageUrl || (
        <div className="row mt-3">
          <div className="col-md-12">
            <ExplanationBox>
              Select a image from your computer, that should be used as map.
              <br />
              This file is <em>not</em> uploaded in the internet but stored in
              your browser ...
            </ExplanationBox>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                onChange={onFileChange}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose file
              </label>
            </div>
          </div>
        </div>
      )}
      {!!imageUrl && (
        <div className="row mt-3">
          <div className="col-md-12">
            <div>
              <button
                className="btn btn-secondary btn-sm"
                type="button"
                onClick={onResetImage}
              >
                Change
              </button>
            </div>
            <img
              className="img-thumbnail gridMap-form_image-preview"
              src={imageUrl}
            />
          </div>
        </div>
      )}
      <div className="row mt-3">
        <div className="col-md-12">
          <button
            className="btn btn-sm btn-success mt-2"
            disabled={!imageUrl}
            onClick={onNext}
            type="button"
          >
            <Octicon icon={Check} />
            Next
          </button>
        </div>
      </div>
    </>
  );
};
