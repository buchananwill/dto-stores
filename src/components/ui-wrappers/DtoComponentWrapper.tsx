"use client";

import { DtoUiComponent, Entity, HasId } from "../../types";
import React from "react";
import { useDtoStoreDispatchAndListener } from "../../hooks/useDtoStoreDispatchAndListener";
import { useDtoStoreDelete } from "../../hooks/useDtoStoreDelete";

export function DtoComponentWrapper<T extends Entity>({
  entityClass,
  id,
  uiComponent: UiComponent,
}: {
  entityClass: string;
  id: string | number;
  uiComponent?: DtoUiComponent<T>;
}) {
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
}
