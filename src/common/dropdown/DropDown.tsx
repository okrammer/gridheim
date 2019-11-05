import React, { FC, ReactNode, useRef, useState } from "react";
import { classesMap } from "../../utils/classesMap";

interface Props {
  children: ReactNode;
  buttonContent: ReactNode;
  buttonClasses: string;
}

export const DropDownContext = React.createContext<() => void>(() => {});
export const DropDown: FC<Props> = ({
  buttonContent,
  children,
  buttonClasses
}: Props) => {
  const dropDownElementRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const onOpen = (): void => setShow(!show);
  const close = (): void => setShow(false);
  return (
    <>
      <div
        ref={dropDownElementRef}
        className={classesMap({
          dropright: true,
          show: show
        })}
      >
        <a href="#" onClick={onOpen} className={"btn " + buttonClasses}>
          {buttonContent}
        </a>
        <div
          className={classesMap({
            "dropdown-menu": true,
            show: show
          })}
        >
          <DropDownContext.Provider value={close}>
            {children}
          </DropDownContext.Provider>
        </div>
      </div>
    </>
  );
};
