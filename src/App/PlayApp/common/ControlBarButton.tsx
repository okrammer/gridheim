import React, { FC } from "react";
import { ClassesMap, classesMap } from "../../../utils/classesMap";
import Octicon, { Icon } from "@primer/octicons-react";

interface Props {
  classes?: ClassesMap | string;
  onClick?: () => void;
  icon?: Icon;
  text?: string;
  tooltip?: string;
  iconSize?: number;
  iconHeight?: number;
}

export const ControlBarButton: FC<Props> = ({
  classes,
  onClick,
  icon,
  text,
  iconSize,
  tooltip,
  iconHeight
}: Props) => {
  let additionalClasses = "";
  if (typeof classes === "string") {
    additionalClasses = classes;
  } else if (typeof classes === "object") {
    additionalClasses = classesMap(classes);
  }

  const size = iconSize || 16;

  return (
    <div>
      <a
        href="#"
        title={tooltip}
        onClick={e => {
          e.preventDefault();
          onClick && onClick();
        }}
        className={"btn btn-sm mb-md-2 " + additionalClasses}
      >
        <div className="icon-button-content">
          {icon && (
            <Octicon icon={icon} width={size} height={iconHeight || size} />
          )}
          {text && <span>{text}</span>}
        </div>
      </a>
    </div>
  );
};
