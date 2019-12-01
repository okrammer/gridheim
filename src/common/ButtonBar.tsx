import React, { FC, ReactNodeArray } from "react";

interface Props {
  children: ReactNodeArray;
}

export const ButtonBar: FC<Props> = ({ children }: Props) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <>
          {!!index && <span className="mr-2" />}
          {child}
        </>
      ))}
    </>
  );
};
