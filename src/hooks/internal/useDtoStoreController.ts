"use client";
import { Entity } from "../../types";

import { getEntityNamespaceContextKey } from "../../functions/name-space-keys/getEntityNamespaceContextKey";
import { useGlobalController } from "selective-context";
import { getControllerListenerKey } from "./useMasterListControllerAddDelete";

export function useDtoStoreController<T extends Entity>(
  dto: T,
  entityClass: string,
) {
  return useGlobalController<T>({
    contextKey: getEntityNamespaceContextKey(entityClass, dto.id),
    initialValue: dto,
    listenerKey: getControllerListenerKey(`${entityClass}:${dto.id}`),
  });
}
