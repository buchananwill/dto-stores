import { Entity, HasId } from "../../types";
import { getEntityNamespaceContextKey } from "./getEntityNamespaceContextKey";

export function getEntityNamespaceKeyWithDto<T extends Entity>(
  entityClass: string,
  dto: T,
) {
  return getEntityNamespaceContextKey(entityClass, dto.id);
}
