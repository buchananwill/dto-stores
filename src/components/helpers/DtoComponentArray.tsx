"use client";

import { DtoUiArrayGeneratorProps, EmptyArray, Entity } from "../../types";
import { getIdListContextKey } from "../../functions/name-space-keys/getIdListContextKey";
import { DtoComponentWrapper } from "../ui-wrappers";
import React from "react";
import { useGlobalListener } from "selective-context";

export function DtoComponentArray<T extends Entity>({
  entityClass,
  eachAs: WrappedComponent,
}: DtoUiArrayGeneratorProps<T>) {
  const contextKey = getIdListContextKey(entityClass);
  const { currentState } = useGlobalListener<number[]>({
    contextKey,
    listenerKey: "dtoComponentArrayGenerator",
    initialValue: EmptyArray,
  });

  return (
    <>
      {currentState.map((id: string | number) => (
        <DtoComponentWrapper<T>
          entityClass={entityClass}
          id={id}
          key={`${entityClass}:${id}`}
          uiComponent={WrappedComponent}
        />
      ))}
    </>
  );
}
