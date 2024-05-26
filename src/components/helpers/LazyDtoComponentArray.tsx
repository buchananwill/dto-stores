"use client";

import { EmptyArray, Entity, LazyDtoUiArrayGeneratorProps } from "../../types";
import { LazyDtoComponentWrapper } from "../ui-wrappers";
import React from "react";
import { useGlobalListener } from "selective-context";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { KEY_TYPES } from "../../literals";

export function LazyDtoComponentArray<T extends Entity, Props>({
  entityClass,
  renderAs: WrappedComponent,
  whileLoading,
  ...props
}: LazyDtoUiArrayGeneratorProps<T>) {
  const contextKey = getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST);
  const { currentState } = useGlobalListener<number[]>({
    contextKey,
    listenerKey: "dtoComponentArrayGenerator",
    initialValue: EmptyArray,
  });

  return (
    <>
      {currentState.map((id: string | number) => (
        <LazyDtoComponentWrapper<T, Props>
          entityClass={entityClass}
          id={id}
          key={`${entityClass}:${id}`}
          renderAs={WrappedComponent}
          whileLoading={whileLoading}
          {...(props as Props)}
        />
      ))}
    </>
  );
}
