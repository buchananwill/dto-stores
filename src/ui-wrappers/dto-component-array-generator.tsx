'use client';


import {DtoUiArrayGeneratorProps, EmptyArray, HasId} from "../types";
import {getIdListContextKey} from "../functions/getIdListContextKey";
import {DtoComponentWrapper} from "./dto-component-wrapper";
import React from "react";
import {useGlobalListener} from "selective-context";

export function DtoComponentArrayGenerator<T extends HasId>({
  entityName,
  eachAs: WrappedComponent
} : DtoUiArrayGeneratorProps<T>) {
  const contextKey = getIdListContextKey(entityName);
  const { currentState } = useGlobalListener<number[]>({
    contextKey,
    listenerKey: 'dtoComponentArrayGenerator',
    initialValue: EmptyArray
  });

  return (
      <>
        {currentState.map((id: string | number) => (
            <DtoComponentWrapper<T>
                entityClass={entityName}
                id={id}
                key={`${entityName}:${id}`}
                uiComponent={WrappedComponent}
            />
        ))}
      </>
  )
}
