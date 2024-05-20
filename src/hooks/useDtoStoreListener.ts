import {getEntityNamespaceContextKey} from '../functions/getEntityNamespaceContextKey';

import {HasId, ObjectPlaceholder} from "../types";
import {useGlobalListener} from "selective-context";

export function useDtoStoreListener<T extends HasId>(
  id: number | string,
  entityType: string,
  listenerKey: string
) {
  return useGlobalListener<T>({
    contextKey: getEntityNamespaceContextKey(entityType, id),
    initialValue: ObjectPlaceholder as T,
    listenerKey: listenerKey
  });
}
