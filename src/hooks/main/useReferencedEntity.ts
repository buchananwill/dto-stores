import {
  useGlobalDispatch,
  useGlobalDispatchAndListener,
} from "selective-context";
import { Entity } from "../../types";
import { useEffect } from "react";
import { getEntityNamespaceContextKey } from "../../functions/name-space-keys/getEntityNamespaceContextKey";
import { safeFunctionalSplice } from "../../functions/safeFunctionalSplice";

export function useReferencedEntity<T extends Entity>(
  id: string | number,
  entityClass: string,
  listenerKey: string,
) {
  const { dispatchWithoutListen } = useGlobalDispatch(`${entityClass}:idList`);

  const { currentState, dispatchWithoutControl } = useGlobalDispatchAndListener<
    T | undefined
  >({
    contextKey: getEntityNamespaceContextKey(entityClass, id),
    initialValue: undefined,
    listenerKey: listenerKey,
  });

  useEffect(() => {
    dispatchWithoutListen((list: (string | number)[]) => [...list, id]);
    return () => {
      dispatchWithoutListen((list: (string | number)[]) => {
        let updatedList: Array<string | number>;
        updatedList = safeFunctionalSplice(list, id);
        return updatedList;
      });
    };
  }, [dispatchWithoutListen, id]);

  return { currentState, dispatchWithoutControl };
}
