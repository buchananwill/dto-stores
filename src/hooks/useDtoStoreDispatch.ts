"use client";
import { HasId, ObjectPlaceholder } from "../types";

import { getEntityNamespaceContextKey } from "../functions/name-space-keys/getEntityNamespaceContextKey";
import { useGlobalDispatchAndListener } from "selective-context";

export function useDtoStoreDispatch<T>(
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
