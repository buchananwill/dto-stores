'use client';


import {DtoUiComponent, HasId} from "../types";
import React from "react";
import {useDtoStoreDispatch} from "../hooks/useDtoStoreDispatch";
import {useDtoStoreDelete} from "../hooks/useDtoStoreDelete";

export function DtoComponentWrapper<T extends HasId>({
  entityClass,
  id,
  uiComponent: UiComponent
}: {
  entityClass: string;
  id: string | number;
  uiComponent?: DtoUiComponent<T>;
}) {
  const { currentState, dispatchWithoutControl } = useDtoStoreDispatch<T>(
    id,
    entityClass,
    UiComponent?.name || 'component'
  );
  const {dispatchDeletion, deleted} = useDtoStoreDelete(entityClass, id);

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

