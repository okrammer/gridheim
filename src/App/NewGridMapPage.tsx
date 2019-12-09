import React, { FC } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import { FileMedia } from "@primer/octicons-react";
import { PageHeader } from "../common/PageHeader";
import { useRouter } from "../utils/useRouter";
import { routing } from "../App";
import { ImageGridMapRepository } from "../services/ImageGridMapRepository";
import { Wizard } from "../common/Wizard";
import { WizardStep } from "../common/Wizard/WizardStep";
import { ImageUpload } from "./NewGridMapPage/ImageUpload";
import { BackgroundImage } from "../model/BackgroundImage";
import { PlaceSquare } from "./NewGridMapPage/PlaceSquare";
import { PreviewGrid } from "./NewGridMapPage/PreviewGrid";
import { AddMetadata } from "./NewGridMapPage/AddMetadata";
import { ImageGridMap } from "../model/ImageGridMap";
import { Rect } from "../utils/Rect";
import { TransformParams } from "./NewGridMapPage/common/TransformParams";
import { Transform } from "../utils/Transform";

export interface AddMapContext {
  image: BackgroundImage | null;
  rect1: Rect | null;
  rect2: Rect | null;
  transformParams: TransformParams | null;
  transform: Transform;
  name: string | null;
}

interface Props {
  imageGridMapRepository: ImageGridMapRepository;
}

export const NewGridMapPage: FC<Props> = ({
  imageGridMapRepository
}: Props) => {
  const heading = <PageHeader icon={FileMedia} headline="Add Map" />;

  const router = useRouter();
  const navigateToStart = (): void => {
    router.history.push(routing.start);
  };

  const onDone = (context: AddMapContext): void => {
    imageGridMapRepository.store(
      new ImageGridMap(context.name!, context.image!, context.transform!)
    );
    navigateToStart();
  };

  const onCancel = (): void => {
    navigateToStart();
  };

  return (
    <>
      <FullPageWithHeading heading={heading}>
        <Wizard onDone={onDone} onCancel={onCancel} title="Add Map">
          <WizardStep<unknown, BackgroundImage>
            id="imageUpload"
            title="Open Image"
          >
            {props => <ImageUpload {...props} />}
          </WizardStep>
          <WizardStep<BackgroundImage, Pick<AddMapContext, "image" | "rect1">>
            id="rect1"
            title="Mark 1st Square"
          >
            {props => (
              <>
                <PlaceSquare
                  image={props.input}
                  rect={props.value && props.value.rect1}
                  onChange={rect =>
                    props.onValueChange({ image: props.input, rect1: rect })
                  }
                  viewPosition="left-top"
                />
              </>
            )}
          </WizardStep>
          <WizardStep<
            Pick<AddMapContext, "image" | "rect1">,
            Pick<AddMapContext, "image" | "rect1" | "rect2">
          >
            id="rect2"
            title="Mark 2st Square"
          >
            {props => (
              <>
                <PlaceSquare
                  image={props.input.image!}
                  rect={props.value && props.value.rect2}
                  onChange={rect =>
                    props.onValueChange({ ...props.input, rect2: rect })
                  }
                  viewPosition="right-bottom"
                />
              </>
            )}
          </WizardStep>
          <WizardStep<
            Pick<AddMapContext, "image" | "rect1" | "rect2">,
            Pick<
              AddMapContext,
              "image" | "rect1" | "rect2" | "transformParams" | "transform"
            >
          >
            id="preview"
            title="Preview"
          >
            {props => (
              <>
                <PreviewGrid
                  image={props.input.image!}
                  rect1={props.input!.rect1!}
                  rect2={props.input!.rect2!}
                  transformParams={props.value && props.value.transformParams}
                  onChange={(transform, transformParams) =>
                    props.onValueChange({
                      ...props.input,
                      transform,
                      transformParams
                    })
                  }
                />
              </>
            )}
          </WizardStep>
          <WizardStep<
            Pick<
              AddMapContext,
              "image" | "rect1" | "rect2" | "transformParams" | "transform"
            >,
            AddMapContext
          >
            id="Metadata"
            title="Naming"
          >
            {props => (
              <>
                <AddMetadata
                  onChange={name =>
                    props.onValueChange({ ...props.input, name })
                  }
                />
              </>
            )}
          </WizardStep>
        </Wizard>
      </FullPageWithHeading>
    </>
  );
};
