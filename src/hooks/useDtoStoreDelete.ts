import {useSelectiveContextGlobalDispatch} from "selective-context";
import {getDeletedContextKey} from "../functions/getDeletedContextKey";
import {EmptyArray} from "../types";
import {useMemo} from "react";

export function useDtoStoreDelete(entityClass: string, id: string | number, listenerKey: string = `${id}:uiWrapper`) {
    const {
        currentState: deletedEntities,
        dispatchWithoutControl: dispatchDeletion
    } = useSelectiveContextGlobalDispatch<(string | number)[]>({
        contextKey: getDeletedContextKey(entityClass),
        initialValue: EmptyArray,
        listenerKey: listenerKey
    });

    const deleted = useMemo(() => {
        return deletedEntities.includes(id);
    }, [deletedEntities, id]);
    return {dispatchDeletion, deleted};
}