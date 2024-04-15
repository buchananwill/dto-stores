export function getEntityNamespaceContextKey(
  entityType: string,
  id: string | number
) {
  return `${entityType}:${id}`;
}
