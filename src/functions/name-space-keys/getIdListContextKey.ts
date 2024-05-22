import {getNameSpacedKey} from "./getNameSpacedKey";

export function getIdListContextKey(entityName: string) {
    return getNameSpacedKey(entityName, 'idList');
}