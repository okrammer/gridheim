import React, { FC, ReactNode } from "react";
import { Link, useRouteMatch } from "react-router-dom";

interface Props {
  children: ReactNode;
  className?: string;
  to: string;
}

export const ListGroupItemLink: FC<Props> = ({
  children,
  className,
  to
}: Props) => {
  const match = useRouteMatch();
  const active = match && match.path === to;
  return (
    <Link
      href="#"
      to={to}
      className={`list-group-item list-group-item-action ${className} ${
        active ? "active" : ""
      }`}
    >
      {children}
    </Link>
  );
};
