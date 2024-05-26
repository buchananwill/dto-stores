import React, { FC, memo, ReactNode, useMemo } from "react";

import { Entity, LazyDtoUiComponentProps } from "../../../types";
import { useLazyDtoComponent } from "./useLazyDtoComponent"; // Adjust the import path as necessary

export function useLazyDtoComponentArray<T extends Entity, Props>(
  entityClass: string,
  UiComponent: FC<LazyDtoUiComponentProps<T> & Props>,
  idList: number[],
  Loading: () => ReactNode,
  sharedProps: Props,
) {
  const LazyDtoComponent = useLazyDtoComponent<T, Props>(
    UiComponent,
    entityClass,
    Loading,
  );

  const NamedExoticComponent = memo(LazyDtoComponent);

  return useMemo(
    () =>
      idList.map((id) => {
        return (
          <NamedExoticComponent
            id={id}
            key={`${entityClass}:${id}`}
            {...sharedProps}
          />
        );
      }),
    [idList, entityClass, sharedProps],
  );
}
