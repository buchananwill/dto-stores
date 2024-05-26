"use client";

import { DtoUiComponentProps, Entity, Identifier } from "../../../types";
import React, { FC, useCallback } from "react";
import { useDtoStore } from "../store/useDtoStore";

export function useDtoComponent<T extends Entity, Props>(
  entityClass: string,
  uiComponent: React.FC<Props & DtoUiComponentProps<T>>,
): FC<Props & Entity> {
  return useCallback(
    ({ id, ...props }: { id: Identifier } & Props) => {
      const listenerKey = uiComponent?.name || "component";
      const entityProps = useDtoStore<T>({
        id,
        entityClass,
        listenerKey,
      });

      const UiComponent = uiComponent as React.FC<Props>;

      const finalProps = {
        ...entityProps,
        ...props,
      } as Props & React.JSX.IntrinsicAttributes & DtoUiComponentProps<T>;

      return <UiComponent {...finalProps} />;
    },
    [entityClass, uiComponent],
  );
}
