import React, { FC } from "react";
import Octicon, { Home, Key, Law } from "@primer/octicons-react";
import { routing } from "../App";
import { Link } from "react-router-dom";
import { links } from "../data/links";
import { PageHeader } from "../common/PageHeader";

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
              <Octicon icon={Home} width={30} height={50} />
            </div>
          </div>
        </Link>
      </div>
      <div className="main-menu_legal-stuff">
        <small>
          <a href={links.impressum} className="ml-2 mr-2">
            <Octicon icon={Law} /> Impressum
          </a>
        </small>
        <small>
          <a href={links.dataProtection}>
            <Octicon icon={Key} /> Data Protection
          </a>
        </small>
      </div>
    </>
  );
};
