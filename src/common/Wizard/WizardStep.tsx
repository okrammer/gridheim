import React, { FC, ReactElement, ReactNode, useContext } from "react";
import { WizardContext } from "../Wizard";

export interface Props<T> {
  id: string;
  enabled: boolean;
  title: string;
  children: (props: {
    onValueChange: (value: T | null) => void;
    value: T | null;
  }) => ReactNode;
}

export function WizardStep<T extends undefined>({
  enabled,
  title,
  children,
  id
}: Props<T>): ReactElement | null {
  const context = useContext(WizardContext);
  const childArgs = {
    onValueChange: (value: any) => context.onValueChange(id, value),
    value: context.value(id)
  };
  return <>{children(childArgs)}</>;
}
