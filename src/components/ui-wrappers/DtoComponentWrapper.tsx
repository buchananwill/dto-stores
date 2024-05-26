"use client";

import { DtoUiComponentProps, Entity } from "../../types";
import React, { FC } from "react";
import { useDtoStore } from "../../hooks/main";

export function DtoComponentWrapper<T extends Entity, Props>({
  entityClass,
  id,
  uiComponent: UiComponent,
  ...props
}: {
  entityClass: string;
  id: string | number;
  uiComponent: FC<DtoUiComponentProps<T> & Props>;
} & Props &
  React.JSX.IntrinsicAttributes) {
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
