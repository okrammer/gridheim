import React, { FC } from "react";
import { classesMap } from "../../utils/classesMap";
import { Link } from "react-router-dom";

interface Props {
  description: string;
  hero?: boolean;
  actionText: string;
  to: string;
}

export const StartSectionItem: FC<Props> = ({
  description,
  hero,
  actionText,
  to
}: Props) => {
  return (
    <>
      <p className="card-text">{description}</p>
      <Link
        className={classesMap({
          btn: true,
          "btn-secondary": !hero,
          "btn-primary": !!hero,
          "btn-lg": !!hero
        })}
        to={to}
      >
        {actionText}
      </Link>
    </>
  );
};
