"use client";

import { DtoUiProps, DtoUiWrapperProps, Entity } from "../../types";
import React from "react";
import { useDtoStore } from "../../hooks/main";

export function DtoUiWrapper<T extends Entity, Props>({
  entityClass,
  entityId,
  renderAs: UiComponent,
  ...props
}: DtoUiWrapperProps<T, Props>) {
  const storeProps = useDtoStore<T>({
    entityId,
    entityClass,
  });

  const finalProps = {
    entityClass,
    ...props,
    ...storeProps,
  } as DtoUiProps<T, Props>;

  return UiComponent && <UiComponent {...finalProps} />;
}
