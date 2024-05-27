"use client";
import {
  Entity,
  LazyDtoComponentWrapperProps,
  LazyDtoUiComponentProps,
} from "../../types";

import React from "react";
import { useLazyDtoStore } from "../../hooks/main";

export function LazyDtoComponentWrapper<T extends Entity, Props>({
  renderAs: Component,
  id,
  entityClass,
  whileLoading: Loading,
  ...props
}: LazyDtoComponentWrapperProps<T, Props>) {
  const listenerKey = `${entityClass}:${id}:ui-wrapper`;
  const { entity, dispatchWithoutControl } = useLazyDtoStore<T>(
    id,
    entityClass,
    listenerKey,
  );

  if (entity === undefined || dispatchWithoutControl === undefined) {
    return <Loading />;
  } else {
    const finalProps = {
      entityClass,
      entity,
      dispatchWithoutControl,
      ...props,
    } as LazyDtoUiComponentProps<T> & Props;

    return <Component {...finalProps} />;
  }
}
