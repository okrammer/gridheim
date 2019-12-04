import React, { FC, ReactElement, ReactNode } from "react";
import { RedirectToAboutOnFirstVisit } from "./RedirectToAboutOnFirstVisit";
import { HomeButton } from "./HomeButton";
import backgroundImage from "../images/john-westrock-UHFQPFt5-WA-unsplash.jpg";
import { Legal } from "./Legal";

interface Props {
  noBackground?: boolean;
  noHomeButton?: boolean;
  hideLegal?: boolean;
  noRedirectToAboutOnFirstVisit?: boolean;
  children: ReactNode;
}

export const AppPage: FC<Props> = ({
  noBackground,
  noHomeButton,
  hideLegal,
  noRedirectToAboutOnFirstVisit,
  children
}: Props) => {
  const wrapWithRedirect = (content: ReactElement): ReactElement => {
    if (noRedirectToAboutOnFirstVisit) {
      return (
        <RedirectToAboutOnFirstVisit>{content}</RedirectToAboutOnFirstVisit>
      );
    } else {
      return content;
    }
  };

  return (
    <>
      {wrapWithRedirect(
        <>
          {!hideLegal && <Legal />}
          {!noHomeButton && <HomeButton />}
          {!noBackground && (
            <img src={backgroundImage} className="background" />
          )}
          {children}
        </>
      )}
    </>
  );
};
