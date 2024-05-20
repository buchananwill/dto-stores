import {getDeletedContextKey} from "../functions/getDeletedContextKey";
import {EmptyArray} from "../types";
import {useMemo} from "react";
import {useGlobalDispatchAndListener} from "selective-context";

export function useDtoStoreDelete(entityClass: string, id: string | number, listenerKey: string = `${id}:uiWrapper`) {
    const {
        currentState: deletedEntities,
        dispatchWithoutControl: dispatchDeletion
    } = useGlobalDispatchAndListener<(string | number)[]>({
        contextKey: getDeletedContextKey(entityClass),
        initialValue: EmptyArray,
        listenerKey: listenerKey
    });

    const deleted = useMemo(() => {
        return deletedEntities.includes(id);
    }, [deletedEntities, id]);
    return {dispatchDeletion, deleted};
}