'use client'

import {
    useSelectiveContextGlobalController,
    useSelectiveContextGlobalListener,
    useSelectiveContextListenerGroupGlobal
} from "selective-context";
import {useEffect, useMemo} from "react";
import {EmptyArray, ObjectPlaceholder} from "../types";
import {isEqual} from "lodash";

export interface DtoGroupMapControllerProps {
    entityClass: string
}

export function DtoGroupMapController({entityClass}:DtoGroupMapControllerProps) {
    const { currentState: idList } = useSelectiveContextGlobalListener<
        (number|string)[]
    >({
        contextKey: `${entityClass}:idList`,
        initialValue: EmptyArray,
        listenerKey: `${entityClass}:mapController`
    });

    const contextKeys = useMemo(
        () =>
            idList.map(
                (entityId) => `${entityClass}:${entityId}`
            ),
        [idList, entityClass]
    );

    const { currentState: entityMap } =
        useSelectiveContextListenerGroupGlobal({
            contextKeys,
            listenerKey: `mapController`,
            initialValue: ObjectPlaceholder
        });

    console.log('local: ', entityMap)

    let {currentState: contextAvailableMap, dispatch} = useSelectiveContextGlobalController({contextKey: `${entityClass}:stringMap`, listenerKey:'mapController', initialValue:entityMap});

    console.log('Subscribable: ', contextAvailableMap)

    useEffect(() => {
        if (!isEqual(entityMap, contextAvailableMap)) {
            dispatch(contextAvailableMap)
        }
    }, [entityMap, contextAvailableMap])

}