"use client";

import {
  DtoComponentWrapperProps,
  DtoUiComponentProps,
  Entity,
} from "../../types";
import React from "react";
import { useDtoStore } from "../../hooks/main";

export function DtoComponentWrapper<T extends Entity, Props>({
  entityClass,
  id,
  renderAs: UiComponent,
  ...props
}: DtoComponentWrapperProps<T, Props>) {
  const storeProps = useDtoStore<T>({
    id,
    entityClass,
  });

  const finalProps = {
    entityClass,
    ...storeProps,
    ...props,
  } as DtoUiComponentProps<T> & Props & React.JSX.IntrinsicAttributes;

  return UiComponent && <UiComponent {...finalProps} />;
}
