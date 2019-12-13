import React, { ReactElement, useState } from "react";
import { Props as WizardStepProps, WizardStep } from "./Wizard/WizardStep";
import { Dict } from "../utils/types";
import { WizardButtons } from "../App/NewGridMapPage/common/WizardButtons";
import Octicon, { X } from "@primer/octicons-react";
import { StepIndicator } from "./StepIndicator";
import { Row } from "./Row";

export interface WizardContext {
  onValueChange: (id: string, value: any) => void;
  value: (id: string) => any;
  input: (id: string) => any;
}

export const WizardContext = React.createContext<WizardContext>({
  onValueChange: () => undefined,
  value: () => undefined,
  input: () => undefined
});

interface Props<T> {
  children: ReactElement<WizardStepProps<any, any>, typeof WizardStep>[];
  onDone: (context: T) => void;
  onCancel: () => void;
  title: string;
}

export function Wizard<T>({
  children,
  onDone,
  onCancel,
  title
}: Props<T>): ReactElement | null {
  const [state, setState] = useState<Dict<any>>({});
  const [current, setCurrent] = useState(0);

  const stepConfigs = React.Children.map(children, c => c.props);

  const context = {
    onValueChange: (id: string, value: any): void => {
      setState({ ...state, [id]: value });
    },
    value: (id: string) => state[id],
    input: (id: string) => {
      const index = stepConfigs.findIndex(c => c.id === id);
      return index === 0 ? undefined : state[stepConfigs[index - 1].id];
    }
  };

  const onNext = (): void => {
    if (current >= stepConfigs.length - 1) {
      onDone(state[stepConfigs[current].id]);
    } else {
      setCurrent(current + 1);
    }
  };
  const onBack = (): void => {
    setCurrent(current - 1);
    // resetting current wizard step
    state[stepConfigs[current].id] = null;
  };
  const currentStepConfig = stepConfigs[current];
  const nextDisabled = !state[currentStepConfig.id];
  const steps = stepConfigs.map(c => c.title);

  return (
    <>
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
          <h5>{title}</h5>

          <StepIndicator steps={steps} active={steps[current]} />
        </div>

        <div className="card-body">
          {currentStepConfig.description && (
            <Row>
              <div className="alert alert-primary">
                {currentStepConfig.description}
              </div>
            </Row>
          )}
          <WizardContext.Provider value={context}>
            {React.Children.toArray(children)[current]}
          </WizardContext.Provider>
          <Row>
            <WizardButtons
              onNext={onNext}
              onBack={current !== 0 ? onBack : undefined}
              nextDisabled={nextDisabled}
            />
          </Row>
        </div>
      </div>
    </>
  );
}
