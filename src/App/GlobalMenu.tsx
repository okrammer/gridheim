import React, { FC } from "react";
import Octicon, {
  FileMedia,
  Info,
  Law,
  Play,
  Repo,
  ThreeBars
} from "@primer/octicons-react";
import { DropDown } from "../common/dropdown/DropDown";
import { LinkDropdownItem } from "../common/dropdown/LinkDropdownItem";
import { routing } from "../App";
import { DividerDropdownItem } from "../common/dropdown/DividerDropdownItem";

interface Props {}

export const GlobalMenu: FC<Props> = ({  }: Props) => {
  return (
    <>
      <div className="navbar navbar-dark bg-dark logo-menu">
        <DropDown
          buttonContent={
            <div>
              <div className="position-absolute">
                <Octicon icon={ThreeBars} width={30} height={50} />
              </div>
            </div>
          }
          buttonClasses="mb-md-2 btn-outline-primary logo-button"
        >
          <LinkDropdownItem to={routing.play}>
            <Octicon icon={Play} /> Play
          </LinkDropdownItem>
          <LinkDropdownItem to={routing.sessions}>
            <Octicon icon={Repo} /> Sessions
          </LinkDropdownItem>
          <DividerDropdownItem />
          <LinkDropdownItem to={routing.manageGridMaps}>
            <Octicon icon={FileMedia} /> Manage Maps
          </LinkDropdownItem>
          {/*<LinkDropdownItem to={routing.manageTokenTypes}>Manage Token Types (Placeholder)</LinkDropdownItem>*/}
          <DividerDropdownItem />
          <LinkDropdownItem to={routing.about}>
            <Octicon icon={Info} /> About
          </LinkDropdownItem>
          <a
            className="dropdown-item"
            href="https://legal.comsysto.com/comsysto.github.io/de/impressum/"
          >
            <Octicon icon={Law} /> Impressum
          </a>
        </DropDown>
      </div>
    </>
  );
};
