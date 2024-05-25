import { useGlobalListener } from "selective-context";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { KEY_TYPES } from "../../literals";

import { DtoUiComponent, Entity } from "../../types";
import { useDtoComponentArray } from "./useDtoComponentArray"; // Adjust the import path as necessary

export function useLazyAllDtoComponents<T extends Entity>(
  entityClass: string,
  UiComponent: DtoUiComponent<T>,
  listenerKey = "dtoComponentArrayGenerator",
) {
  const contextKey = getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST);
  const { currentState: idList } = useGlobalListener<number[]>({
    contextKey,
    listenerKey,
    initialValue: [],
  });

  return useDtoComponentArray(entityClass, UiComponent, idList);
}
