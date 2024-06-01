import { useMemo } from "react";
import { useGlobalDispatchAndListener } from "selective-context";
import { getNameSpacedKey } from "../../../functions/name-space-keys/getNameSpacedKey";
import { EmptyArray, KEY_TYPES } from "../../../literals";
import { useUuidListenerKeyFallback } from "../../util/useUuidListenerKeyFallback";

export function useDtoStoreDelete(
  id: string | number,
  entityClass: string,
  listenerKey?: string,
) {
  const listenerKeyRef = useUuidListenerKeyFallback(listenerKey);
  const {
    currentState: deletedEntities,
    dispatchWithoutControl: dispatchDeletion,
  } = useGlobalDispatchAndListener<(string | number)[]>({
    contextKey: getNameSpacedKey(entityClass, KEY_TYPES.DELETED),
    initialValue: EmptyArray,
    listenerKey: listenerKeyRef.current,
  });

  const deleted = useMemo(() => {
    return deletedEntities.includes(id);
  }, [deletedEntities, id]);
  return { dispatchDeletion, deleted };
}
