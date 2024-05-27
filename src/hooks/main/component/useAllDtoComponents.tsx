import { useGlobalListener } from "selective-context";
import { getNameSpacedKey } from "../../../functions/name-space-keys/getNameSpacedKey";
import { KEY_TYPES } from "../../../literals";

import { DtoUi, BaseDtoUiProps, Entity } from "../../../types";
import { useDtoComponentArray } from "./useDtoComponentArray";

export function useAllDtoComponents<T extends Entity, Props>(
  entityClass: string,
  UiComponent: DtoUi<T, Props>,
  sharedProps?: Exclude<Props, BaseDtoUiProps<T>>,
) {
  const contextKey = getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST);
  const { currentState: idList } = useGlobalListener<number[]>({
    contextKey,
    listenerKey: "dtoComponentArrayGenerator",
    initialValue: [],
  });

  return useDtoComponentArray(entityClass, UiComponent, idList, sharedProps);
}
