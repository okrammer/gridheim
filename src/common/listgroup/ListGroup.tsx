import React, { FC, ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const ListGroup: FC<Props> = ({ className, children }: Props) => {
  return <div className={`list-group ${className || ""}`}>{children}</div>;
};
