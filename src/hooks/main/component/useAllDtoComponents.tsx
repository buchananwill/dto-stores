import { useGlobalListener } from "selective-context";
import { getNameSpacedKey } from "../../../functions/name-space-keys/getNameSpacedKey";
import { KEY_TYPES } from "../../../literals";

import { DtoUiComponentProps, Entity } from "../../../types";
import { useDtoComponentArray } from "./useDtoComponentArray";
import React from "react"; // Adjust the import path as necessary

export function useAllDtoComponents<T extends Entity, Props>(
  entityClass: string,
  UiComponent: React.FC<Props & DtoUiComponentProps<T>>,
  sharedProps?: Props,
) {
  const contextKey = getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST);
  const { currentState: idList } = useGlobalListener<number[]>({
    contextKey,
    listenerKey: "dtoComponentArrayGenerator",
    initialValue: [],
  });

  return useDtoComponentArray(entityClass, UiComponent, idList, sharedProps);
}
