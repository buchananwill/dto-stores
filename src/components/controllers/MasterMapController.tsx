"use client";

import { useEffect, useMemo } from "react";
import {
  useGlobalController,
  useGlobalListener,
  useGlobalListenerGroup,
} from "selective-context";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { EmptyArray, InitialMap, KEY_TYPES } from "../../literals";

import { getControllerListenerKey } from "../../hooks/internal/getControllerListenerKey";

export interface DtoGroupMapControllerProps {
  entityClass: string;
}

export function MasterMapController({
  entityClass,
}: DtoGroupMapControllerProps) {
  const listenerKey = `${entityClass}:mapController`;
  const { currentState: idList } = useGlobalListener<(number | string)[]>({
    contextKey: getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST),
    listenerKey: listenerKey,
    initialValue: EmptyArray,
  });

  const contextKeys = useMemo(
    () => idList.map((entityId) => `${entityClass}:${entityId}`),
    [idList, entityClass],
  );

  const { currentState: entityMap } = useGlobalListenerGroup({
    contextKeys,
    listenerKey: listenerKey,
    initialValue: InitialMap,
  });

  const masterMapContext = getNameSpacedKey(entityClass, KEY_TYPES.MASTER_MAP);

  const { dispatch } = useGlobalController({
    contextKey: masterMapContext,
    listenerKey: getControllerListenerKey(masterMapContext),
    initialValue: entityMap,
  });

  useEffect(() => {
    dispatch(entityMap);
  }, [entityMap]);

  return null;
}
