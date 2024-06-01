import { SetStateAction, useCallback } from "react";
import { useGlobalWriteAny } from "selective-context";
import { Identifier } from "../../../types";
import { getEntityNamespaceContextKey } from "../../../functions/name-space-keys/getEntityNamespaceContextKey";

export function useWriteAnyDto<T>(entityClass: string) {
  const { dispatchWriteAny } = useGlobalWriteAny<T>();

  return useCallback(
    (id: Identifier, update: SetStateAction<T>) => {
      return dispatchWriteAny(
        getEntityNamespaceContextKey(entityClass, id),
        update,
      );
    },
    [entityClass, dispatchWriteAny],
  );
}
