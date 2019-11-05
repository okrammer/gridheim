export type ClassesMap = { [className: string]: boolean };
export const classesMap = (classNameMap: ClassesMap): string => {
  const selectedClassNames = Object.keys(classNameMap).filter(
    className => classNameMap[className]
  );

  return selectedClassNames.join(" ");
};
