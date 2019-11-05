import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const MediaBody: FC<Props> = ({ children }: Props) => {
  return <div className="media-body">{children}</div>;
};
