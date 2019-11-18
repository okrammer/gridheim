import React, { FC } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import { FileMedia } from "@primer/octicons-react";
import { PageHeader } from "../common/PageHeader";
import { labels } from "../data/labels";

interface Props {}

export const AssetsPage: FC<Props> = ({  }: Props) => {
  return (
    <FullPageWithHeading
      heading={
        <PageHeader
          icon={FileMedia}
          headline={labels.assetPage.headline}
        ></PageHeader>
      }
    >
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <th>Image</th>
              <th>Artist</th>
              <th>Website</th>
            </thead>
            <tbody>
              <tr>
                <td>Background (Mountain)</td>
                <td>
                  <a href="https://unsplash.com/@johnwestrock">John Westrock</a>
                </td>
                <td>
                  <a href="https://unsplash.com/photos/UHFQPFt5-WA">Unsplash</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </FullPageWithHeading>
  );
};
