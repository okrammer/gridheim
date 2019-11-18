import React, { FC, ReactNode } from "react";
import Octicon, { Icon } from "@primer/octicons-react";

interface Props {
  headline: string;
  icon: Icon;
  children: ReactNode;
  hero?: boolean;
}

export const StartSection: FC<Props> = ({
  headline,
  icon,
  children,
  hero
}: Props) => {
  return (
    <>
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="card">
            <div className={`card-header${hero ? " bg-dark text-white" : ""}`}>
              <h4>
                <Octicon icon={icon} size={30} /> {headline}
              </h4>
            </div>
            <div className="card-body">
              {React.Children.map(children, (child, index) => {
                return (
                  <>
                    {index !== 0 && <hr />}
                    {child}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
