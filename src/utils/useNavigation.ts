import { useRouter } from "./useRouter";

export const useNavigation = <T extends string[]>(
  ...destinations: T
): { [K in keyof T]: () => void } => {
  const router = useRouter();
  return destinations.map(destination => () => {
    router.history.push(destination);
  }) as any;
};
