import React, { FC, ReactNode } from "react";

interface Props {
  heading: ReactNode;
  children: ReactNode;
}

export const FullPageWithHeading: FC<Props> = ({
  heading,
  children
}: Props) => {
  return (
    <>
      <div className="container fixed-top text-center full-page-with-heading_heading-container bg-white">
        {heading}
      </div>
      <div className="container h-100 scrollable-y full-page-with-heading_content-container">
        {children}
      </div>
    </>
  );
};
