"use client";
import { Entity, LazyDtoComponentWrapperProps } from "../../types";

import React, { Dispatch, SetStateAction } from "react";
import { useLazyDtoStore } from "../../hooks/main";

export function LazyDtoComponentWrapper<T extends Entity, Props>({
  renderAs: Component,
  id,
  entityClass,
  whileLoading: Loading,
  ...props
}: LazyDtoComponentWrapperProps<T> & Props) {
  const listenerKey = `${entityClass}:${id}:ui-wrapper`;
  const { entity, dispatchWithoutControl } = useLazyDtoStore<T>(
    id,
    entityClass,
    listenerKey,
  );

  if (entity === undefined || dispatchWithoutControl === undefined) {
    return <Loading />;
  } else {
    return (
      <Component
        entityClass={entityClass}
        entity={entity}
        dispatchWithoutControl={
          dispatchWithoutControl as Dispatch<SetStateAction<T>>
        }
        {...props}
      />
    );
  }
}
