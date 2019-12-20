import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { BackgroundImage as ImageModel } from "../../model/BackgroundImage";
import { WizardStepComponentProps } from "../../common/Wizard/WizardStep";
import { Row } from "../../common/Row";

interface Props extends WizardStepComponentProps<unknown, ImageModel> {}

export const ImageUpload: FC<Props> = ({ value, onValueChange }: Props) => {
  const [image, setImage] = useState<ImageModel | null>(null);

  useEffect(() => {
    setImage(value);
  }, [value]);

  const updateImage = (image: ImageModel | null): void => {
    setImage(image);
    onValueChange(image);
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event!.target!.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setImageFromUrl(url);
      };

      reader.readAsDataURL(file);
    }
  };

  const setImageFromUrl = (url: string): void => {
    if (url) {
      const img = new Image();

      img.onload = function() {
        updateImage(new ImageModel(url, img.width, img.height));
      };

      img.src = url;
    } else {
      updateImage(null);
    }
  };

  return (
    <>
      {!image && (
        <Row>
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
        </Row>
      )}
      {image && (
        <Row>
          <img
            className="img-thumbnail gridMap-form_image-preview"
            src={image.url}
          />
          )
        </Row>
      )}
      {image && (
        <Row>
          <button
            className="btn btn-secondary btn-sm"
            type="button"
            onClick={() => updateImage(null)}
          >
            Change
          </button>
        </Row>
      )}
    </>
  );
};
