import React, { ChangeEvent, FC } from "react";
import { ExplanationBox } from "../../../common/ExplanationBox";

interface Props {
  url: string | undefined;
  onUrlChange: (url: string) => void;
}

export const ImageUpload: FC<Props> = ({ url, onUrlChange }: Props) => {
  const onFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event!.target!.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        onUrlChange(url);
      };

      reader.readAsDataURL(file);
    }
  };
  const onResetImage = (): void => {
    onUrlChange("");
  };

  return (
    <>
      {!!url || (
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
      {!!url && (
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
              src={url}
            />
          </div>
        </div>
      )}
    </>
  );
};
