import { getEntityNamespaceContextKey } from "../../functions/name-space-keys/getEntityNamespaceContextKey";

import { Entity, ObjectPlaceholder } from "../../types";
import { useGlobalListener } from "selective-context";

export function useDtoStoreListener<T extends Entity>(
  id: number | string,
  entityType: string,
  listenerKey: string,
) {
  return useGlobalListener<T>({
    contextKey: getEntityNamespaceContextKey(entityType, id),
    initialValue: ObjectPlaceholder as T,
    listenerKey: listenerKey,
  });
}
