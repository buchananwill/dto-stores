import React, { useMemo } from "react";

import { DtoUiComponent, Entity } from "../../types";
import { useDtoComponent } from "./useDtoComponent"; // Adjust the import path as necessary

export function useDtoComponentArray<T extends Entity>(
  entityClass: string,
  UiComponent: DtoUiComponent<T>,
  idList: number[],
) {
  const DtoComponent = useDtoComponent(entityClass, UiComponent);

  return useMemo(
    () =>
      idList.map((id) => <DtoComponent id={id} key={`${entityClass}:${id}`} />),
    [idList, entityClass],
  );
}
