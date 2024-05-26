import { useDtoStoreDispatchAndListener } from "./useDtoStoreDispatchAndListener";
import { DtoStoreParams, DtoStoreReturn, Entity } from "../../../types";
import { useDtoStoreDelete } from "./useDtoStoreDelete";
import { useRef } from "react";

export function useDtoStore<T extends Entity>({
  id,
  entityClass,
  listenerKey,
}: DtoStoreParams): DtoStoreReturn<T> {
  const listenerKeyRef = useRef(listenerKey ?? crypto.randomUUID());

  const { currentState: entity, ...other } = useDtoStoreDispatchAndListener<T>(
    id,
    entityClass,
    listenerKeyRef.current,
  );
  const dtoStoreDelete = useDtoStoreDelete(
    id,
    entityClass,
    listenerKeyRef.current,
  );
  return { entity, ...other, ...dtoStoreDelete };
}
