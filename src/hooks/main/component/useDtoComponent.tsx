"use client";

import {
  DtoComponentProps,
  DtoUi,
  BaseDtoUiProps,
  Entity,
} from "../../../types";
import React, { FC, useCallback } from "react";
import { useDtoStore } from "../store/useDtoStore";

export type UseDtoComponentReturnProps<T extends Entity, Props> = Exclude<
  Props,
  BaseDtoUiProps<T>
> &
  DtoComponentProps;

export function useDtoComponent<T extends Entity, Props>(
  entityClass: string,
  uiComponent: DtoUi<T, Props>,
): FC<UseDtoComponentReturnProps<T, Props>> {
  return useCallback(
    ({
      entityId,
      ...props
    }: DtoComponentProps & Omit<Props, keyof BaseDtoUiProps<T>>) => {
      const listenerKey = uiComponent?.name || "component";
      const entityProps = useDtoStore<T>({
        entityId,
        entityClass,
        listenerKey,
      });

      const UiComponent = uiComponent as React.FC<Props>;

      const finalProps = {
        ...entityProps,
        ...props,
      } as Props & React.JSX.IntrinsicAttributes & BaseDtoUiProps<T>;

      return <UiComponent {...finalProps} />;
    },
    [entityClass, uiComponent],
  );
}
