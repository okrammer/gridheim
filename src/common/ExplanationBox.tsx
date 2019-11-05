import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ExplanationBox: FC<Props> = ({ children }: Props) => {
  return <div className="alert alert-primary">{children}</div>;
};
