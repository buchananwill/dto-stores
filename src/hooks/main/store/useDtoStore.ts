import { useDtoStoreDispatchAndListener } from "./useDtoStoreDispatchAndListener";
import { DtoStoreParams, DtoStoreReturn, Entity } from "../../../types";
import { useDtoStoreDelete } from "./useDtoStoreDelete";
import { useUuidListenerKeyFallback } from "../../util/useUuidListenerKeyFallback";

export function useDtoStore<T extends Entity>({
  entityId,
  entityClass,
  listenerKey,
}: DtoStoreParams): DtoStoreReturn<T> {
  const listenerKeyRef = useUuidListenerKeyFallback(listenerKey);

  const { currentState: entity, ...other } = useDtoStoreDispatchAndListener<T>(
    entityId,
    entityClass,
    listenerKeyRef.current,
  );
  const dtoStoreDelete = useDtoStoreDelete(
    entityId,
    entityClass,
    listenerKeyRef.current,
  );
  return { entity, ...other, ...dtoStoreDelete };
}
