import {
  useGlobalDispatch,
  useGlobalDispatchAndListener,
} from "selective-context";
import { HasId } from "../types";
import { useEffect } from "react";
import { getEntityNamespaceContextKey } from "../functions/name-space-keys/getEntityNamespaceContextKey";

export function useReferencedEntity<T extends HasId>(
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
        const indexFirst = list.findIndex((item) => item === id);
        if (indexFirst >= 0) return list.slice().splice(indexFirst, 1);
        else return list;
      });
    };
  }, [dispatchWithoutListen, id]);

  return { currentState, dispatchWithoutControl };
}
