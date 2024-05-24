"use client";
import { getEntityNamespaceContextKey } from "../functions/name-space-keys/getEntityNamespaceContextKey";
import { useGlobalDispatch } from "selective-context";

export function useDtoStoreDispatch<T>(
  id: number | string,
  entityType: string,
) {
  return useGlobalDispatch<T>(getEntityNamespaceContextKey(entityType, id));
}
