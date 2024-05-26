"use client";

import { DtoUiComponent, Entity } from "../../../types";
import React, { memo, useCallback } from "react";
import { useDtoStoreDelete, useDtoStoreDispatchAndListener } from "../index";

export function useDtoComponent<T extends Entity>(
  entityClass: string,
  UiComponent: DtoUiComponent<T>,
) {
  return useCallback(
    memo(({ id }: { id: string | number }) => {
      const { currentState, dispatchWithoutControl } =
        useDtoStoreDispatchAndListener<T>(
          id,
          entityClass,
          UiComponent?.name || "component",
        );
      const { dispatchDeletion, deleted } = useDtoStoreDelete(entityClass, id);

      return (
        UiComponent && (
          <UiComponent
            entity={currentState}
            entityClass={entityClass}
            dispatchWithoutControl={dispatchWithoutControl}
            deleted={deleted}
            dispatchDeletion={dispatchDeletion}
          />
        )
      );
    }),
    [entityClass, UiComponent],
  );
}
