import React, { FC, useContext, useState } from "react";
import { ImageGridMap } from "../../model/ImageGridMap";
import { ImageUpload } from "./AddGridMap/ImageUpload";
import { BackgroundImage as ImageModel } from "../../model/BackgroundImage";
import { Transformation } from "../../model/Transformation";
import { TransformationSetup } from "./AddGridMap/TransformationSetup";
import { AddMetadata } from "./AddGridMap/AddMetadata";
import { StepIndicator } from "../../common/StepIndicator";
import Octicon, { X } from "@primer/octicons-react";
import { ResetScrolling } from "../../common/FullPageWithHeading";

interface Props {
  onSave: (gridMapImage: ImageGridMap) => void;
  onCancel: () => void;
}

const steps = {
  upload: "Upload Image",
  selectSquare1: "Select Example Square 1",
  selectSquare2: "Select Example Square 2",
  previewGrid: "Preview Grid",
  metadata: "Add Metadata"
};
export const NewGridMap: FC<Props> = ({ onSave, onCancel }: Props) => {
  const [image, setImage] = useState<ImageModel | null>(null);
  const [step, setStep] = useState<string>(steps.upload);
  const [transformation, setTransformation] = useState<Transformation | null>(
    null
  );

  const saveGridMap = (name: string): void => {
    if (!name || !image || !transformation) {
      return;
    }
    onSave(new ImageGridMap(name, image, transformation));
  };

  const setImageFromUrl = (url: string): void => {
    if (url) {
      const img = new Image();

      img.onload = function() {
        setImage(new ImageModel(url, img.width, img.height));
      };

      img.src = url;
    } else {
      setImage(null);
    }
  };

  const resetScrolling = useContext(ResetScrolling);

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
        <h5>Add Map</h5>
      </div>

      <div className="card-body">
        <StepIndicator steps={Object.values(steps)} active={step} />
        {!image && (
          <ImageUpload
            initialUrl={null}
            onApply={url => {
              setImageFromUrl(url);
              setStep(steps.selectSquare1);
              resetScrolling();
            }}
          />
        )}
        {image && !transformation && (
          <TransformationSetup
            image={image}
            onApply={transformation => {
              setTransformation(transformation);
              setStep(steps.metadata);
              resetScrolling();
            }}
            onStep={step => {
              setStep(
                step === "exampleRect1"
                  ? steps.selectSquare1
                  : step === "exampleRect2"
                  ? steps.selectSquare2
                  : steps.previewGrid
              );
              resetScrolling();
            }}
            onBack={() => {
              setImage(null);
              setStep(steps.upload);
            }}
          />
        )}
        {image && transformation && (
          <AddMetadata
            onBack={() => {
              setTransformation(null);
              setStep(steps.selectSquare1);
            }}
            onSave={name => {
              saveGridMap(name);
            }}
          />
        )}
      </div>
    </div>
  );
};
