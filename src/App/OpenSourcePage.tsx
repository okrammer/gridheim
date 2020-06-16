import React, { FC } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import Octicon, {
  FileMedia,
  MarkGithub,
  Octoface
} from "@primer/octicons-react";
import { PageHeader } from "../common/PageHeader";
import { opensource } from "../data/opensource";
import { labels } from "../data/labels";

interface Props {}

export const OpenSourcePage: FC<Props> = ({}: Props) => {
  return (
    <FullPageWithHeading
      heading={
        <PageHeader
          icon={Octoface}
          headline={labels.openSourcePage.headline}
        ></PageHeader>
      }
    >
      <div className="card">
        <div className="card-body">
          <blockquote className="blockquote">
            <p className="mb-0">
              <em>
                &quot;If I have seen further it is by standing on the shoulders
                of giants.&quot;
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
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
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
        </div>
      </div>
    </FullPageWithHeading>
  );
};
