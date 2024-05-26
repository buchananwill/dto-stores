import { EmptyArray } from "../../../types";
import { useMemo } from "react";
import { useGlobalDispatchAndListener } from "selective-context";
import { getNameSpacedKey } from "../../../functions/name-space-keys/getNameSpacedKey";
import { KEY_TYPES } from "../../../literals";

export function useDtoStoreDelete(
  id: string | number,
  entityClass: string,
  listenerKey = `${id}:uiWrapper`,
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
