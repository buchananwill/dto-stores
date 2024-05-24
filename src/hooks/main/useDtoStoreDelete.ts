import { EmptyArray } from "../../types";
import { useMemo } from "react";
import { useGlobalDispatchAndListener } from "selective-context";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { KEY_TYPES } from "../../literals";

export function useDtoStoreDelete(
  entityClass: string,
  id: string | number,
  listenerKey: string = `${id}:uiWrapper`,
) {
  const {
    currentState: deletedEntities,
    dispatchWithoutControl: dispatchDeletion,
  } = useGlobalDispatchAndListener<(string | number)[]>({
    contextKey: getNameSpacedKey(entityClass, KEY_TYPES.DELETED),
    initialValue: EmptyArray,
    listenerKey: listenerKey,
  });

  const deleted = useMemo(() => {
    return deletedEntities.includes(id);
  }, [deletedEntities, id]);
  return { dispatchDeletion, deleted };
}
