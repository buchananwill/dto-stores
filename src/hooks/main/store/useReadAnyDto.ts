import {useCallback} from "react";
import {useGlobalReadAny} from "selective-context";
import {Identifier} from "../../../types";
import {getEntityNamespaceContextKey} from "../../../functions/name-space-keys/getEntityNamespaceContextKey";

export function useReadAnyDto<T>(entityClass: string) {
    const readAny = useGlobalReadAny<T>();
    
    return useCallback((id: Identifier) => {
        return readAny(getEntityNamespaceContextKey(entityClass, id))
    }, [entityClass, readAny]);
}