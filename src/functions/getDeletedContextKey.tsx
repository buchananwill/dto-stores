import {getNameSpacedKey} from "./getNameSpacedKey";

export function getDeletedContextKey(entityName: string) {
    return getNameSpacedKey(entityName, 'deleted');
}