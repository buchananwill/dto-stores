import {getEntityNamespaceContextKey} from '../functions/getEntityNamespaceContextKey';
import {useSelectiveContextGlobalListener} from "selective-context";
import {HasId, ObjectPlaceholder} from "../types";

export function useDtoStoreListener<T extends HasId>(
  id: number | string,
  entityType: string,
  listenerKey: string
) {
  return useSelectiveContextGlobalListener<T>({
    contextKey: getEntityNamespaceContextKey(entityType, id),
    initialValue: ObjectPlaceholder as T,
    listenerKey: listenerKey
  });
}
