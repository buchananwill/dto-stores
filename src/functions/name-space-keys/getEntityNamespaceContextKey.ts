export function getEntityNamespaceContextKey(
  entityClass: string,
  id: string | number,
) {
  return `${entityClass}:${id}`;
}
