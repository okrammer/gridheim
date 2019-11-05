import React, { FC, useState } from "react";
import { GridMap } from "../../model/GridMap";
import { ImageUpload } from "./AddGridMap/ImageUpload";
import { BackgroundImage as ImageModel } from "../../model/BackgroundImage";
import { Transformation } from "../../model/Transformation";
import { TransformationSetup } from "./AddGridMap/TransformationSetup";
import { AddMetadata } from "./AddGridMap/AddMetadata";
import { StepIndicator } from "../../common/StepIndicator";
import Octicon, { X } from "@primer/octicons-react";

interface Props {
  onSave: (gridMapImage: GridMap) => void;
  onCancel: () => void;
}

const steps = {
  upload: "Upload Image",
  selectSquare: "Select a Square",
  adjustGrid: "Adjust Grid Size",
  metadata: "Add Metadata"
};
export const AddGridMap: FC<Props> = ({ onSave, onCancel }: Props) => {
  const [image, setImage] = useState<ImageModel | undefined>(undefined);
  const [step, setStep] = useState<string>(steps.upload);
  const [transformation, setTransformation] = useState<
    Transformation | undefined
  >(undefined);

  const saveGridMap = (name: string): void => {
    if (!name || !image || !transformation) {
      return;
    }
    onSave(GridMap.of({ name, image, transformation }));
  };

  const setImageFromUrl = (url: string): void => {
    if (url) {
      const img = new Image();

      img.onload = function() {
        setImage(new ImageModel(url, img.width, img.height));
      };

      img.src = url;
    } else {
      setImage(undefined);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <a
          href="#"
          className="btn btn-secondary float-right"
          onClick={onCancel}
        >
          <Octicon icon={X} />
        </a>
        <h5>Add Map</h5>
      </div>

      <div className="card-body">
        <StepIndicator steps={Object.values(steps)} active={step} />
        {!image && (
          <ImageUpload
            url={undefined}
            onUrlChange={url => {
              setImageFromUrl(url);
              setStep(steps.selectSquare);
            }}
          />
        )}
        {image && !transformation && (
          <TransformationSetup
            image={image}
            onApply={transformation => {
              setTransformation(transformation);
              setStep(steps.metadata);
            }}
            onAdjustGrid={() => setStep(steps.adjustGrid)}
          />
        )}
        {image && transformation && (
          <AddMetadata
            onSave={name => {
              saveGridMap(name);
            }}
          />
        )}
      </div>
    </div>
  );
};
