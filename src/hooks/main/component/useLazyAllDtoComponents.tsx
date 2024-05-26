import { useGlobalListener } from "selective-context";
import { getNameSpacedKey } from "../../../functions/name-space-keys/getNameSpacedKey";
import { KEY_TYPES } from "../../../literals";

import { DtoUiComponent, Entity } from "../../../types";
import { useLazyDtoComponentArray } from "./useLazyDtoComponentArray";
import { ReactNode } from "react"; // Adjust the import path as necessary

export function useLazyAllDtoComponents<T extends Entity>(
  entityClass: string,
  UiComponent: DtoUiComponent<T>,
  Loading: () => ReactNode,
  listenerKey = "dtoComponentArrayGenerator",
) {
  const contextKey = getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST);
  const { currentState: idList } = useGlobalListener<number[]>({
    contextKey,
    listenerKey,
    initialValue: [],
  });

  return useLazyDtoComponentArray(entityClass, UiComponent, idList, Loading);
}
