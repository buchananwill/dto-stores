"use client";

import { DtoUiArrayGeneratorProps, EmptyArray, Entity } from "../../types";
import { DtoComponentWrapper } from "../ui-wrappers";
import React from "react";
import { useGlobalListener } from "selective-context";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { KEY_TYPES } from "../../literals";

export function DtoComponentArray<T extends Entity>({
  entityClass,
  eachAs: WrappedComponent,
}: DtoUiArrayGeneratorProps<T>) {
  const contextKey = getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST);
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
