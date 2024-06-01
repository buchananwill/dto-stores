"use client";

import { getEntityNamespaceContextKey } from "../../../functions/name-space-keys/getEntityNamespaceContextKey";
import { useGlobalDispatchAndListener } from "selective-context";
import { useUuidListenerKeyFallback } from "../../util/useUuidListenerKeyFallback";

/**
 * Uses undefined for initial value: will throw an error if the entity is not loaded before this component needs to access the data.
 * When this is an expected case: useLazyDtoStore.
 * */
export function useDtoStoreDispatchAndListener<T>(
  id: number | string,
  entityClass: string,
  listenerKey?: string,
) {
  const listenerKeyRef = useUuidListenerKeyFallback(listenerKey);

  return useGlobalDispatchAndListener<T>({
    contextKey: getEntityNamespaceContextKey(entityClass, id),
    initialValue: undefined as T,
    listenerKey: listenerKeyRef.current,
  });
}
