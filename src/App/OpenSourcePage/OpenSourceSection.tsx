import React, { FC } from "react";
import Octicon, { MarkGithub } from "@primer/octicons-react";
import { opensource } from "../../data/opensource";

interface Props {}

export const OpenSourceSection: FC<Props> = ({}: Props) => {
  return (
    <>
      <h5 className="mt-5">
        <Octicon icon={MarkGithub} size={25} />
        <span className="ml-3">Open Source Software is used here ...</span>
      </h5>
      <blockquote className="blockquote">
        <p className="mb-0">
          <em>
            &quot;If I have seen further it is by standing on the shoulders of
            giants.&quot;
          </em>
        </p>
        <footer className="blockquote-footer">
          <cite title="Source Title">
            <a href="https://en.wikipedia.org/wiki/Bernard_of_Chartres">
              Bernard of Chartres
            </a>
          </cite>
        </footer>
      </blockquote>
      <table className="table">
        <thead>
          <th>Project</th>
          <th>Website</th>
          <th>Licence</th>
        </thead>
        <tbody>
          {Object.entries(opensource).map(([name, info]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>
                <a href={info.page}>{info.page}</a>
              </td>
              <td>
                <a href={info.licenceUrl}>{info.licence}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
