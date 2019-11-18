import React, { FC } from "react";
import { MediaBody } from "../../common/media/MediaBody";
import Octicon, { GistSecret } from "@primer/octicons-react";
import { MediaContainer } from "../../common/media/MediaContainer";

interface Props {}

export const HelloSection: FC<Props> = ({  }: Props) => {
  return (
    <div className="card mt-5">
      <div className="card-body">
        <MediaContainer>
          <MediaBody>
            <h5>
              <Octicon icon={GistSecret} size={25} />
              <span className="ml-3">
                Hello my name is <strong>Otto</strong> ...
              </span>
            </h5>
            <p>
              ... and I&apos;m a Software Engineer at
              <a href="https://comsystoreply.de/"> Comsysto Reply </a>
              nice to meet you!
              <br />
              <small>
                <a href="https://comsystoreply.de/karriere">
                  (PS: we&apos;re hiring)
                </a>
              </small>
            </p>
            <p>
              Let me explain to you why I created yet another map tool :D ...
              <br />
              It all begun when I searched for a way to visualise battles in my
              D&D campaign.
              <br />
              The first approach was to use a physical map, which was nearly
              impossible for the huge maps that are often used in campaign
              books. The printout would be more than 2 meters in length.
              <br />
              The next thing we tried was to use a tablet with a pen. This works
              quite smoothly because it has a similar usability than the pencil
              drawn maps of my youth, but it was quite challenging to move the
              tokens around. Every token has to be erased and drawn again in a
              other location. So we tried finding a dedicated software that
              would run on tablets, sadly we don&apos;t found one that has
              worked with the pen which was a blast to use :D ...
            </p>
            <p>
              In the mean time I was building some dashboard prototypes at work
              that uses SVG graphics together with React which has quite similar
              characteristics ...
              <br />
              ... so I decided to give it a try, how hard can it be XD
            </p>
          </MediaBody>
          <img
            className="img-thumbnail mr-3"
            src="https://www.gravatar.com/avatar/6f1aded52d041be71a1f5168c6b7e7dd?s=250"
          />
        </MediaContainer>
      </div>
    </div>
  );
};
