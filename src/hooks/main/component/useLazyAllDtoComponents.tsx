import { useGlobalListener } from "selective-context";
import { getNameSpacedKey } from "../../../functions/name-space-keys/getNameSpacedKey";
import { KEY_TYPES } from "../../../literals";

import { Entity, LazyDtoUiComponentProps } from "../../../types";
import { useLazyDtoComponentArray } from "./useLazyDtoComponentArray";
import { FC, ReactNode } from "react"; // Adjust the import path as necessary

export function useLazyAllDtoComponents<T extends Entity, Props>(
  entityClass: string,
  UiComponent: FC<LazyDtoUiComponentProps<T> & Props>,
  Loading: () => ReactNode,
  listenerKey = "dtoComponentArrayGenerator",
  sharedProps?: Props,
) {
  const contextKey = getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST);
  const { currentState: idList } = useGlobalListener<number[]>({
    contextKey,
    listenerKey,
    initialValue: [],
  });

  return useLazyDtoComponentArray(
    entityClass,
    UiComponent,
    idList,
    Loading,
    sharedProps,
  );
}
