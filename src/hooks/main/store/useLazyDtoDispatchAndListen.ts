import { useGlobalDispatchAndListener } from "selective-context";
import { Entity, LazyDtoStoreReturn } from "../../../types";
import { useEffect } from "react";
import { getEntityNamespaceContextKey } from "../../../functions/name-space-keys/getEntityNamespaceContextKey";
import { safeFunctionalSplice } from "../../../functions/safeFunctionalSplice";
import { NamespacedHooks } from "./useNamespacedHooks";
import { KEY_TYPES } from "../../../literals";
import { useUuidListenerKeyFallback } from "../../util/useUuidListenerKeyFallback";

export function useLazyDtoDispatchAndListen<T extends Entity>(
  id: string | number,
  entityClass: string,
  listenerKey?: string,
): LazyDtoStoreReturn<T> {
  const listenerKeyRef = useUuidListenerKeyFallback(listenerKey);
  const dispatchWithoutListen = NamespacedHooks.useDispatch(
    entityClass,
    KEY_TYPES.ID_LIST,
  );

  const { currentState, dispatchWithoutControl } = useGlobalDispatchAndListener<
    T | undefined
  >({
    contextKey: getEntityNamespaceContextKey(entityClass, id),
    initialValue: undefined,
    listenerKey: listenerKeyRef.current,
  });

  useEffect(() => {
    dispatchWithoutListen((list: (string | number)[]) => [...list, id]);
    return () => {
      dispatchWithoutListen((list: (string | number)[]) => {
        return safeFunctionalSplice(list, id);
      });
    };
  }, [dispatchWithoutListen, id]);

  return { entity: currentState, dispatchWithoutControl };
}
