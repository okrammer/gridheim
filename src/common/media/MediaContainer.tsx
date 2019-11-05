import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const MediaContainer: FC<Props> = ({ children }: Props) => {
  return <div className="media">{children}</div>;
};
