'use client'
import {HasId, ObjectPlaceholder} from "../types";
import {useSelectiveContextGlobalDispatch} from "selective-context";
import {getEntityNamespaceContextKey} from "../functions/getEntityNamespaceContextKey";

export function useDtoStoreDispatch<T extends HasId>(
    id: number | string,
    entityType: string,
    listenerKey: string
) {
    return useSelectiveContextGlobalDispatch<T>({
        contextKey: getEntityNamespaceContextKey(entityType, id),
        initialValue: ObjectPlaceholder as T,
        listenerKey: listenerKey
    });
}