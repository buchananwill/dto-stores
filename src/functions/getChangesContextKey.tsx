import {getNameSpacedKey} from "./getNameSpacedKey";

export function getChangesContextKey(entityName: string) {
    return getNameSpacedKey(entityName, 'changes');
}