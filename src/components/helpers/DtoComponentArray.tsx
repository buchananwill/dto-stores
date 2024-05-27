"use client";

import { DtoUiArrayGeneratorProps, Entity } from "../../types";
import { DtoComponentWrapper } from "../ui-wrappers";
import React from "react";
import { useGlobalListener } from "selective-context";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { EmptyArray, KEY_TYPES } from "../../literals";

export function DtoComponentArray<T extends Entity, Props>({
  entityClass,
  renderAs: WrappedComponent,
  ...props
}: DtoUiArrayGeneratorProps<T, Props>) {
  const contextKey = getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST);
  const { currentState } = useGlobalListener<number[]>({
    contextKey,
    listenerKey: "dtoComponentArrayGenerator",
    initialValue: EmptyArray,
  });

  return (
    <>
      {currentState.map((id: string | number) => (
        <DtoComponentWrapper<T, Props>
          entityClass={entityClass}
          id={id}
          key={`${entityClass}:${id}`}
          renderAs={WrappedComponent}
          {...(props as Props)}
        />
      ))}
    </>
  );
}
