import React, { FC } from "react";
import Octicon, { ChevronRight, Star, Verified } from "@primer/octicons-react";

// KISS :D
interface Props {
  steps: ReadonlyArray<string>;
  active: string;
}

export const StepIndicator: FC<Props> = ({ steps, active }: Props) => {
  const activeIndex = steps.indexOf(active);
  return (
    <>
      <div>
        {steps.map((step, i) => {
          const current = i === activeIndex;
          const future = i > activeIndex;
          return (
            <span key={step}>
              <span
                className={`badge badge-${
                  current ? "primary" : future ? "secondary" : "success"
                } ml-2 mr-2`}
              >
                {current && <Octicon icon={Star} />}
                {step}
              </span>
              <Octicon icon={ChevronRight} />
            </span>
          );
        })}
        <span className="badge badge-dark  ml-2 mr-2">
          <Octicon icon={Verified} /> Finished
        </span>
      </div>
    </>
  );
};
