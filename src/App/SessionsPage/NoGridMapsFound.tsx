import React, { FC } from "react";
import { Link } from "react-router-dom";
import { routing } from "../../App";

interface Props {}

export const NoGridMapsFound: FC<Props> = ({}: Props) => {
  return (
    <>
      <h3>No Maps found</h3>
      <span>
        Oh no! It seems that you want create a sessions but we can&apos;t find
        any map :(
      </span>
      <br />
      <br />
      <span>
        Please go <Link to={routing.gridMaps}>here</Link> to create a map.
        <br />
        Afterwards come back via the menu in the top left corner (Sessions) to
        start a session.
      </span>
    </>
  );
};
