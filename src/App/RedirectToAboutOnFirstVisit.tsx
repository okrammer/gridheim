import React, { FC, ReactNode } from "react";
import { settingStorage } from "../services/SettingStorage";
import { Redirect } from "react-router";
import { routing } from "../App";

interface Props {
  children: ReactNode;
}

export const RedirectToAboutOnFirstVisit: FC<Props> = ({ children }: Props) => {
  const redirectToAbout = settingStorage.redirectToAbout.get();
  if (redirectToAbout) {
    settingStorage.redirectToAbout.set(false);
  }
  return (
    <>
      {redirectToAbout && <Redirect to={routing.about} />}
      {!redirectToAbout && children}
    </>
  );
};
