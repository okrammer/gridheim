import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Row: FC<Props> = ({ children }: Props) => {
  const childCount = React.Children.count(children);

  const colWidth = Math.floor(12 / childCount);

  const columns = React.Children.map(children, c => (
    <div className={`col-${colWidth}`}>{c}</div>
  ));

  return <div className="row mt-3">{columns}</div>;
};
