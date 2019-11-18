import React, { FC, ReactNode, useRef } from "react";

interface Props {
  heading: ReactNode;
  children?: ReactNode;
}

export const ResetScrolling = React.createContext<() => void>(() => {});

export const FullPageWithHeading: FC<Props> = ({
  heading,
  children
}: Props) => {
  const onResetScrolling = (): void => {
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    }
  };
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div
        ref={ref}
        className="container h-100 scrollable-y full-page-with-heading_content-container"
      >
        <div className="container text-center full-page-with-heading_heading-container">
          {heading}
        </div>
        <ResetScrolling.Provider value={onResetScrolling}>
          {children}
        </ResetScrolling.Provider>
      </div>
    </>
  );
};
