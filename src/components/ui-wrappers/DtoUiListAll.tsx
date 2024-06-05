"use client";

import {
  DtoUiArrayProps,
  DtoUiWrapperProps,
  Entity,
  Identifier,
} from "../../types";
import { DtoUiWrapper } from "./index";
import React from "react";
import { useGlobalListener } from "selective-context";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { EmptyArray, KEY_TYPES } from "../../literals";
import { useUuidListenerKeyFallback } from "../../hooks/util/useUuidListenerKeyFallback";

export function DtoUiListAll<T extends Entity, Props>({
  entityClass,
  renderAs,
  ...props
}: DtoUiArrayProps<T, Props>) {
  const contextKey = getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST);
  const listenerKey = useUuidListenerKeyFallback().current;
  const { currentState } = useGlobalListener<Identifier[]>({
    contextKey,
    listenerKey,
    initialValue: EmptyArray,
  });

  return (
    <>
      {currentState.map((entityId: string | number) => {
        const finalProps = {
          ...props,
          entityClass,
          entityId,
          renderAs,
        } as DtoUiWrapperProps<T, Props>;
        return (
          <DtoUiWrapper key={`${entityClass}:${entityId}`} {...finalProps} />
        );
      })}
    </>
  );
}
