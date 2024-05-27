"use client";

import {
  Entity,
  LazyDtoUiArrayProps,
  LazyDtoUiWrapperProps,
} from "../../types";
import { LazyDtoUiWrapper } from "../ui-wrappers";
import React from "react";
import { EmptyArray, KEY_TYPES } from "../../literals";
import { NamespacedHooks } from "../../hooks/main";

export function LazyDtoUiArray<T extends Entity, Props>({
  entityClass,
  renderAs,
  whileLoading,
  ...props
}: LazyDtoUiArrayProps<T, Props>) {
  const { currentState } = NamespacedHooks.useListen(
    entityClass,
    KEY_TYPES.ID_LIST,
    "dtoComponentArrayGenerator",
    EmptyArray,
  );

  return (
    <>
      {currentState.map((entityId: string | number) => {
        const finalProps = {
          whileLoading,
          renderAs,
          entityClass,
          entityId,
          ...props,
        } as LazyDtoUiWrapperProps<T, Props>;
        return (
          <LazyDtoUiWrapper
            key={`${entityClass}:${entityId}`}
            {...finalProps}
          />
        );
      })}
    </>
  );
}
