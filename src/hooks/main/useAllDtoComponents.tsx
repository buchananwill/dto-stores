import { useGlobalListener } from "selective-context";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { KEY_TYPES } from "../../literals";

import { DtoUiComponent, Entity } from "../../types";
import { useDtoComponentArray } from "./useDtoComponentArray"; // Adjust the import path as necessary

export function useAllDtoComponents<T extends Entity>(
  entityClass: string,
  UiComponent: DtoUiComponent<T>,
) {
  const contextKey = getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST);
  const { currentState: idList } = useGlobalListener<number[]>({
    contextKey,
    listenerKey: "dtoComponentArrayGenerator",
    initialValue: [],
  });

  return useDtoComponentArray(entityClass, UiComponent, idList);
}
