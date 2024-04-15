import {HasId} from "../types";
import {useSelectiveContextGlobalController} from "selective-context";
import {getEntityNamespaceContextKey} from "../functions/getEntityNamespaceContextKey";

export function useDtoStoreController<T extends HasId>(
    dto: T,
    entityType: string
) {
    return useSelectiveContextGlobalController<T>({
        contextKey: getEntityNamespaceContextKey(entityType, dto.id),
        initialValue: dto,
        listenerKey: 'controller'
    });
}