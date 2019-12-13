import React, { FC, ReactNodeArray } from "react";

interface Props {
  children: ReactNodeArray;
}

export const ButtonBar: FC<Props> = ({ children }: Props) => {
  const childCount = React.Children.count(children);
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <>
          {child}
          {child && index !== childCount - 1 && <span className="mr-2" />}
        </>
      ))}
    </>
  );
};
