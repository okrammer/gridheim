import React, { FC } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import Octicon, {
  FileMedia,
  Info,
  Key,
  Law,
  Milestone,
  Play
} from "@primer/octicons-react";
import { Link } from "react-router-dom";
import { routing } from "../App";
import { PageHeader } from "../common/PageHeader";
import { StorageProvider } from "../services/StorageProvider";

interface Props {
  storageProvider: StorageProvider;
}

export const StartApp: FC<Props> = ({  }: Props) => {
  return (
    <FullPageWithHeading
      heading={
        <PageHeader icon={Milestone} headline="Welcome to Gridheim, Friend!">
          <small>
            <a href="#" className="ml-2 mr-2">
              <Octicon icon={Law} /> Impressum
            </a>
            <a href="#" className="">
              <Octicon icon={Key} /> Data Protection
            </a>
          </small>
        </PageHeader>
      }
    >
      {/*<div className="row">*/}
      {/*  <div className="col-md-12">*/}
      {/*    <div className="card">*/}
      {/*      <div className="card-header">*/}
      {/*        <h4>*/}
      {/*          <Octicon icon={Play} size={30} /> Play*/}
      {/*        </h4>*/}
      {/*      </div>*/}
      {/*      <div className="card-body">*/}
      {/*        <p className="card-text text-muted">*/}
      {/*          With supporting text below as a natural lead-in to additional*/}
      {/*          content.*/}
      {/*        </p>*/}
      {/*        <a href="#" className="btn btn-secondary disabled">*/}
      {/*          Start with Session 'Blub'*/}
      {/*        </a>*/}
      {/*        <hr />*/}
      {/*        <p className="card-text text-muted">*/}
      {/*          With supporting text below as a natural lead-in to additional*/}
      {/*          content.*/}
      {/*        </p>*/}
      {/*        <a href="#" className="btn btn-secondary disabled">*/}
      {/*          Create and Start New Session*/}
      {/*        </a>*/}
      {/*        <hr />*/}
      {/*        <p className="card-text text-muted">*/}
      {/*          With supporting text below as a natural lead-in to additional*/}
      {/*          content.*/}
      {/*        </p>*/}
      {/*        <a href="#" className="btn btn-secondary disabled">*/}
      {/*          Manage Sessions*/}
      {/*        </a>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                <Octicon icon={FileMedia} size={30} /> Grid Maps
              </h4>
            </div>
            <div className="card-body">
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary btn-lg">
                Add New Grid Map
              </a>
              {/*  <hr />*/}
              {/*  <p className="card-text">*/}
              {/*    With supporting text below as a natural lead-in to additional*/}
              {/*    content.*/}
              {/*  </p>*/}
              {/*  <a href="#" className="btn btn-secondary disabled">*/}
              {/*    Manage Grid Maps*/}
              {/*  </a>*/}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                <Octicon icon={Info} size={30} /> Infos
              </h4>
            </div>
            <div className="card-body">
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-secondary">
                About
              </a>
              <hr />
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-secondary mr-5">
                Change Log
              </a>
            </div>
          </div>
        </div>
      </div>
    </FullPageWithHeading>
  );
};
