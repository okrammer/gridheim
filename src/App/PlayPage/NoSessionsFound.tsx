import React, { FC } from "react";
import { FullPageWithHeading } from "../../common/FullPageWithHeading";
import { Link } from "react-router-dom";
import { routing } from "../../App";

interface Props {}

export const NoSessionsFound: FC<Props> = ({}: Props) => {
  return (
    <FullPageWithHeading heading={<h1>Welcome to Gridheim, Stranger!</h1>}>
      <h3>No Session found</h3>
      <span>
        It seems that you don&apos;t have a session (yet) or that the session is
        invalid :(
      </span>
      <br />
      <br />
      <span>
        Please go <Link to={routing.sessions}>here</Link> to create a session so
        we can play :D
      </span>
    </FullPageWithHeading>
  );
};
