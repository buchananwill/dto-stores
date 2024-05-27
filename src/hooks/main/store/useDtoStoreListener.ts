import { getEntityNamespaceContextKey } from "../../../functions/name-space-keys/getEntityNamespaceContextKey";

import { Entity } from "../../../types";
import { useGlobalListener } from "selective-context";
import { ObjectPlaceholder } from "../../../literals";

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
