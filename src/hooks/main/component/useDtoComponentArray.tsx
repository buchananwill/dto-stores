import React, { memo, useMemo } from "react";

import { DtoUiComponentProps, Entity } from "../../../types";
import { useDtoComponent } from "./useDtoComponent"; // Adjust the import path as necessary

export function useDtoComponentArray<T extends Entity, Props>(
  entityClass: string,
  UiComponent: React.FC<Props & DtoUiComponentProps<T>>,
  idList: number[],
  sharedProps: Props,
) {
  const DtoComponent = useDtoComponent<T, Props>(entityClass, UiComponent);

  const MemoComponent = memo(DtoComponent);

  return useMemo(
    () =>
      idList.map((id) => (
        <MemoComponent id={id} key={`${entityClass}:${id}`} {...sharedProps} />
      )),
    [idList, entityClass, sharedProps],
  );
}
