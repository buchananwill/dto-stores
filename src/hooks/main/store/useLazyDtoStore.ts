import { useDtoStoreDispatchAndListener } from "./useDtoStoreDispatchAndListener";
import { Entity, Identifier, LazyDtoStoreReturn } from "../../../types";
import { useDtoStoreDelete } from "./useDtoStoreDelete";
import { useRef } from "react";
import { useLazyDtoDispatchAndListen } from "./useLazyDtoDispatchAndListen";

export function useLazyDtoStore<T extends Entity>(
  id: Identifier,
  entityClass: string,
  listenerKey?: string,
): LazyDtoStoreReturn<T> {
  const listenerKeyRef = useRef(listenerKey ?? crypto.randomUUID());

  const dtoStoreDispatchAndListener = useLazyDtoDispatchAndListen<T>(
    id,
    entityClass,
    listenerKeyRef.current,
  );

  return { ...dtoStoreDispatchAndListener };
}
