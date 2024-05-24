import { ContextNamespace } from "../../types";

export function getNameSpacedKey(
  entityClass: string,
  keyType: ContextNamespace,
) {
  return `${entityClass}:${keyType}`;
}
