import React, { FC, ReactElement, ReactNode, useContext } from "react";
import { WizardContext } from "../Wizard";

export interface Props<I, T> {
  id: string;
  title: string;
  description?: ReactNode;
  children: (props: WizardStepComponentProps<I, T>) => ReactNode;
}

export interface WizardStepComponentProps<I, T> {
  input: I;
  onValueChange: (value: T | null) => void;
  value: T | null;
}

export function WizardStep<I, T>({
  children,
  id
}: Props<I, T>): ReactElement | null {
  const context = useContext(WizardContext);
  const childArgs = {
    input: context.input(id),
    onValueChange: (value: any) => context.onValueChange(id, value),
    value: context.value(id)
  };
  console.log("wizard steps", { id, childArgs });
  return <>{children(childArgs)}</>;
}
