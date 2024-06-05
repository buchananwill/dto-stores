"use client";
import { Entity, LazyDtoUiProps, LazyDtoUiWrapperProps } from "../../types";

import React from "react";
import { useLazyDtoStore } from "../../hooks/main";

export function LazyDtoUiWrapper<T extends Entity, Props>({
  renderAs: Component,
  entityId,
  entityClass,
  whileLoading: Loading,
  ...props
}: LazyDtoUiWrapperProps<T, Props>) {
  const { entity, dispatchWithoutControl } = useLazyDtoStore<T>(
    entityId,
    entityClass,
  );

  if (entity === undefined || dispatchWithoutControl === undefined) {
    return <Loading />;
  } else {
    const finalProps = {
      entityClass,
      entity,
      dispatchWithoutControl,
      ...props,
    } as LazyDtoUiProps<T, Props>;

    return <Component {...finalProps} />;
  }
}
