import React, { ReactNode, useMemo } from "react";

import { Entity, LazyDtoUiComponent } from "../../../types";
import { useLazyDtoComponent } from "./useLazyDtoComponent"; // Adjust the import path as necessary

export function useLazyDtoComponentArray<T extends Entity>(
  entityClass: string,
  UiComponent: LazyDtoUiComponent<T>,
  idList: number[],
  Loading: () => ReactNode,
) {
  const LazyDtoComponent = useLazyDtoComponent(
    UiComponent,
    entityClass,
    Loading,
  );

  return useMemo(
    () =>
      idList.map((id) => (
        <LazyDtoComponent id={id} key={`${entityClass}:${id}`} />
      )),
    [idList, entityClass],
  );
}
