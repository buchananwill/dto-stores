"use client";
import { HasId, ObjectPlaceholder } from "../../types";

import { getEntityNamespaceContextKey } from "../../functions/name-space-keys/getEntityNamespaceContextKey";
import { useGlobalDispatchAndListener } from "selective-context";

/**
 * Does NOT  allow undefined for initial value: forces object placeholder
 * LEADS TO: impossible to detect unset value and blocks the referenced entity from using its loading component.
 * */
export function useDtoStoreDispatchAndListener<T>(
  id: number | string,
  entityType: string,
  listenerKey: string,
) {
  return useGlobalDispatchAndListener<T>({
    contextKey: getEntityNamespaceContextKey(entityType, id),
    initialValue: ObjectPlaceholder as T,
    listenerKey: listenerKey,
  });
}
