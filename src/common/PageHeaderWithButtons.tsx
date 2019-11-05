import React, { FC, ReactNodeArray } from "react";
import { Icon } from "@primer/octicons-react";
import { PageHeader } from "./PageHeader";

interface Props {
  icon: Icon;
  headline: string;
  children: ReactNodeArray;
}

export const PageHeaderWithButtons: FC<Props> = ({
  icon,
  headline,
  children
}: Props) => {
  return (
    <PageHeader icon={icon} headline={headline}>
      <div className="ml-5 mt-3 mb-3 text-left">
        {React.Children.map(children, (child, i) => (
          <>
            {i !== 0 && <span className="ml-2" />}
            {child}
          </>
        ))}
      </div>
    </PageHeader>
  );
};
