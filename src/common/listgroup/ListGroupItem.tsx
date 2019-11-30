import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ListGroupItem: FC<Props> = ({ children }: Props) => {
  return <div className="list-group-item">{children}</div>;
};
