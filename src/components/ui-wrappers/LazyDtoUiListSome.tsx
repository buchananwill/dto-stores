"use client";

import {
  Entity,
  Identifier,
  LazyDtoUiArrayProps,
  LazyDtoUiWrapperProps,
} from "../../types";
import { LazyDtoUiWrapper } from "./index";
import React from "react";
import { EmptyArray, KEY_TYPES } from "../../literals";
import { NamespacedHooks } from "../../hooks/main";

export function LazyDtoUiListSome<T extends Entity, Props>({
  entityClass,
  entityIdList,
  renderAs,
  whileLoading,
  ...props
}: LazyDtoUiArrayProps<T, Props> & { entityIdList: Identifier[] }) {
  return (
    <>
      {entityIdList.map((entityId: string | number) => {
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
