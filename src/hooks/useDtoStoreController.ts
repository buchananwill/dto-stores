'use client'
import {HasId} from "../types";

import {getEntityNamespaceContextKey} from "../functions/getEntityNamespaceContextKey";
import {useGlobalController} from "selective-context";

export function useDtoStoreController<T extends HasId>(
    dto: T,
    entityType: string
) {
    return useGlobalController<T>({
        contextKey: getEntityNamespaceContextKey(entityType, dto.id),
        initialValue: dto,
        listenerKey: 'controller'
    });
}