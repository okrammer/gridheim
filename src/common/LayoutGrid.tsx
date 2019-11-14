import React, { FC } from "react";
import { ReactElementLike } from "prop-types";

interface Props {
  component: (item: any) => ReactElementLike;
  items: ReadonlyArray<any>;
  columns: number;
}

export const LayoutGrid: FC<Props> = ({ items, columns, component }: Props) => {
  return (
    <div className="row p-2">
      {items.map((item, idx) => (
        <div key={idx} className={`col-${12 / columns}`}>
          {component(item)}
        </div>
      ))}
    </div>
  );
};
