export function getEntityNamespaceContextKey<T>(
  entityType: string,
  id: string | number
) {
  return `${entityType}:${id}`;
}
