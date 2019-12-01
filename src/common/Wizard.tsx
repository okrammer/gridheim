import React, { FC, ReactElement, useState } from "react";
import { Props as WizardStepProps, WizardStep } from "./Wizard/WizardStep";
import { Dict } from "../utils/types";
import { WizardButtons } from "../App/NewGridMapPage/AddGridMap/TransformationSetup/common/WizardButtons";

export interface WizardContext {
  onValueChange: (id: string, value: any) => void;
  value: (id: string) => any;
}

export const WizardContext = React.createContext<WizardContext>({
  onValueChange: () => undefined,
  value: () => undefined
});

interface Props {
  children: ReactElement<WizardStepProps<any>, typeof WizardStep>;
}

export const Wizard: FC<Props> = ({ children }: Props) => {
  const [state, setState] = useState<Dict<any>>({});
  const [current, setCurrent] = useState(0);

  const stepConfigs = React.Children.map(children, c => c.props);

  const context = {
    onValueChange: (id: string, value: any): void => {
      setState({ ...state, [id]: value });
    },
    value: (id: string) => state[id]
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <WizardContext.Provider value={context}>
            {React.Children.toArray(children)[current]}
          </WizardContext.Provider>
        </div>
        <div className="col-md-12">
          <WizardButtons
            onNext={() => setCurrent(current + 1)}
            onBack={() => setCurrent(current - 1)}
            nextDisabled={state[stepConfigs[current].id]}
          />
        </div>
      </div>
    </>
  );
};
