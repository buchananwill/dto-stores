import {
  useGlobalDispatch,
  useGlobalDispatchAndListener,
} from "selective-context";
import { Entity, LazyDtoStoreReturn } from "../../../types";
import { useEffect } from "react";
import { getEntityNamespaceContextKey } from "../../../functions/name-space-keys/getEntityNamespaceContextKey";
import { safeFunctionalSplice } from "../../../functions/safeFunctionalSplice";
import { NamespacedHooks } from "./useNamespacedHooks";
import { KEY_TYPES } from "../../../literals";

export function useLazyDtoDispatchAndListen<T extends Entity>(
  id: string | number,
  entityClass: string,
  listenerKey: string,
): LazyDtoStoreReturn<T> {
  const dispatchWithoutListen = NamespacedHooks.useDispatch(
    entityClass,
    KEY_TYPES.ID_LIST,
  );

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

  return { entity: currentState, dispatchWithoutControl };
}
