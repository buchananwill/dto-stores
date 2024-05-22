import { HasId } from "../../types";
import { getEntityNamespaceContextKey } from "./getEntityNamespaceContextKey";

export function getEntityNamespaceKeyWithDto<T extends HasId>(
  entityClass: string,
  dto: T,
) {
  return getEntityNamespaceContextKey(entityClass, dto.id);
}
