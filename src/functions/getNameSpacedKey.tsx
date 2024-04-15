export function getNameSpacedKey(entityName: string, keyType: string) {
    return `${entityName}:${keyType}`;
}