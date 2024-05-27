import React, { memo, useMemo } from "react";

import { DtoUi, Entity } from "../../../types";
import { useDtoComponent, UseDtoComponentReturnProps } from "./useDtoComponent"; // Adjust the import path as necessary

export function useDtoComponentArray<T extends Entity, Props>(
  entityClass: string,
  UiComponent: DtoUi<T, Props>,
  idList: number[],
  sharedProps: Props,
) {
  const DtoComponent = useDtoComponent<T, Props>(entityClass, UiComponent);

  const MemoComponent = memo(DtoComponent);

  return useMemo(
    () =>
      idList.map((id) => {
        const finalProps = {
          entityId: id,
          ...sharedProps,
        } as UseDtoComponentReturnProps<T, Props>;
        return <MemoComponent key={`${entityClass}:${id}`} {...finalProps} />;
      }),
    [idList, entityClass, sharedProps],
  );
}
