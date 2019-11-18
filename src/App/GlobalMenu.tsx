import React, { FC } from "react";
import Octicon, { ThreeBars } from "@primer/octicons-react";
import { routing } from "../App";
import { Link } from "react-router-dom";

interface Props {}

export const GlobalMenu: FC<Props> = ({  }: Props) => {
  return (
    <>
      <div className="navbar navbar-dark bg-dark logo-menu">
        <Link
          className="btn mb-md-2 btn-outline-primary logo-button"
          to={routing.start}
        >
          <div>
            <div className="position-absolute">
              <Octicon icon={ThreeBars} width={30} height={50} />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
