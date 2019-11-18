import { useContext } from "react";
import {
  __RouterContext as RouterContext,
  RouteComponentProps
} from "react-router";

export const useRouter = (): RouteComponentProps => {
  return useContext(RouterContext);
};
