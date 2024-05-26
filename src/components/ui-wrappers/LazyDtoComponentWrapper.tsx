"use client";
import { Entity, LazyDtoComponentWrapperProps } from "../../types";
import {
  useDtoStoreDelete,
  useLazyDtoDispatchAndListen,
} from "../../hooks/main";
import React, { Dispatch, SetStateAction } from "react";

export function LazyDtoComponentWrapper<T extends Entity>({
  renderAs: Component,
  id,
  entityClass,
  whileLoading: Loading,
}: LazyDtoComponentWrapperProps<T>) {
  const listenerKey = `${entityClass}:${id}:ui-wrapper`;
  const { currentState, dispatchWithoutControl } =
    useLazyDtoDispatchAndListen<T>(id, entityClass, listenerKey);

  const deletionProps = useDtoStoreDelete(entityClass, id, listenerKey);

  if (currentState === undefined) {
    return <Loading />;
  } else {
    return (
      <Component
        entity={currentState}
        entityClass={entityClass}
        {...deletionProps}
        dispatchWithoutControl={
          // cast the dispatch because we already handled the undefined case.
          dispatchWithoutControl as Dispatch<SetStateAction<T>>
        }
      />
    );
  }
}
