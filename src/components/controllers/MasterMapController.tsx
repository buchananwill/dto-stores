"use client";

import { useEffect, useMemo } from "react";
import { EmptyArray } from "../../types";
import {
  useGlobalController,
  useGlobalListener,
  useGlobalListenerGroup,
} from "selective-context";

export interface DtoGroupMapControllerProps {
  entityClass: string;
}

const initialMap = new Map();

export function MasterMapController({
  entityClass,
}: DtoGroupMapControllerProps) {
  const listenerKey = `${entityClass}:mapController`;
  const { currentState: idList } = useGlobalListener<(number | string)[]>({
    contextKey: `${entityClass}:idList`,
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
    contextKey: `${entityClass}:masterMap`,
    listenerKey: "controller",
    initialValue: entityMap,
  });

  useEffect(() => {
    dispatch(entityMap);
  }, [entityMap]);

  return null;
}
