"use client";
import { Entity, HasId } from "../types";

import { getEntityNamespaceContextKey } from "../functions/name-space-keys/getEntityNamespaceContextKey";
import { useGlobalController } from "selective-context";

export function useDtoStoreController<T extends Entity>(
  dto: T,
  entityClass: string,
) {
  return useGlobalController<T>({
    contextKey: getEntityNamespaceContextKey(entityClass, dto.id),
    initialValue: dto,
    listenerKey: "controller",
  });
}
