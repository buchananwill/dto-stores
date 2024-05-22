import {getNameSpacedKey} from "./getNameSpacedKey";

export function getAddedContextKey(entityName: string) {
    return getNameSpacedKey(entityName, 'added');
}