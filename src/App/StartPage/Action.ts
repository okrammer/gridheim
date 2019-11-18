export interface Action {
  to: string;
  descriptionText: string;
  actionText: string;
  section: "play" | "gridMaps" | "info";
}
