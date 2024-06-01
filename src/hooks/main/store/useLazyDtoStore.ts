import { Entity, Identifier, LazyDtoStoreReturn } from "../../../types";
import { useLazyDtoDispatchAndListen } from "./useLazyDtoDispatchAndListen";
import { useUuidListenerKeyFallback } from "../../util/useUuidListenerKeyFallback";

export function useLazyDtoStore<T extends Entity>(
  id: Identifier,
  entityClass: string,
  listenerKey?: string,
): LazyDtoStoreReturn<T> {
  const listenerKeyRef = useUuidListenerKeyFallback(listenerKey);

  const dtoStoreDispatchAndListener = useLazyDtoDispatchAndListen<T>(
    id,
    entityClass,
    listenerKeyRef.current,
  );

  return { ...dtoStoreDispatchAndListener };
}
