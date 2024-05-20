'use client'


import {useEffect, useMemo} from "react";
import {EmptyArray} from "../types";
import {useGlobalController, useGlobalListener, useGlobalListenerGroup} from "selective-context";

export interface DtoGroupMapControllerProps {
    entityClass: string
}

const initialMap = new Map()

export function DtoGroupMapController({entityClass}:DtoGroupMapControllerProps) {
    const { currentState: idList } = useGlobalListener<
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
        useGlobalListenerGroup({
            contextKeys,
            listenerKey: `mapController`,
            initialValue: initialMap
        });

    let {dispatch} = useGlobalController({contextKey: `${entityClass}:stringMap`, listenerKey:'mapController', initialValue:entityMap});

    useEffect(() => {

            dispatch(entityMap)

    }, [entityMap])

    return null

}