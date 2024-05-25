"use client";

import { useEffect, useMemo } from "react";
import { EmptyArray } from "../../types";
import {
  useGlobalController,
  useGlobalListener,
  useGlobalListenerGroup,
} from "selective-context";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { Controller, KEY_TYPES } from "../../literals";

export interface DtoGroupMapControllerProps {
  entityClass: string;
}

const initialMap = new Map();

export function MasterMapController({
  entityClass,
}: DtoGroupMapControllerProps) {
  const listenerKey = `${entityClass}:mapController`;
  const { currentState: idList } = useGlobalListener<(number | string)[]>({
    contextKey: getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST),
    initialValue: EmptyArray,
    listenerKey: listenerKey,
  });

  const contextKeys = useMemo(
    () => idList.map((entityId) => `${entityClass}:${entityId}`),
    [idList, entityClass],
  );

  const { currentState: entityMap } = useGlobalListenerGroup({
    contextKeys,
    listenerKey: listenerKey,
    initialValue: initialMap,
  });

  let { dispatch } = useGlobalController({
    contextKey: getNameSpacedKey(entityClass, KEY_TYPES.MASTER_MAP),
    listenerKey: Controller,
    initialValue: entityMap,
  });

  useEffect(() => {
    dispatch(entityMap);
  }, [entityMap]);

  return null;
}
