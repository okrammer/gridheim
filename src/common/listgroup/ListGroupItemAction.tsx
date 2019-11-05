import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

export const ListGroupItemAction: FC<Props> = ({
  children,
  className,
  active,
  onClick
}: Props) => {
  return (
    <a
      href="#"
      onClick={() => onClick && onClick()}
      className={`list-group-item list-group-item-action ${className} ${
        active ? "active" : ""
      }`}
    >
      {children}
    </a>
  );
};
