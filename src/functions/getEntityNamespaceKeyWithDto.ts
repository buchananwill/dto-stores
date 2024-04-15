import {HasId} from "../types";
import {getEntityNamespaceContextKey} from "./getEntityNamespaceContextKey";

export function getEntityNamespaceKeyWithDto<T extends HasId>(entityName: string, dto: T) {
    return getEntityNamespaceContextKey(entityName, dto.id);
}