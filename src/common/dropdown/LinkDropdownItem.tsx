import React, { FC, ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { DropDownContext } from "./DropDown";

interface Props {
  to: string;
  children: ReactNode;
}

export const LinkDropdownItem: FC<Props> = ({ to, children }: Props) => {
  const closeDropDown = useContext(DropDownContext);
  return (
    <Link className="dropdown-item" to={to} onClick={() => closeDropDown()}>
      {children}
    </Link>
  );
};
