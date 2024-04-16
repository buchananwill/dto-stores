'use client';


import {DtoUiComponent, EmptyArray, HasId} from "../types";
import React, {useMemo} from "react";
import {useDtoStoreDispatch} from "../hooks/useDtoStoreDispatch";
import {useSelectiveContextGlobalDispatch} from "selective-context";
import {getDeletedContextKey} from "../functions/getDeletedContextKey";

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

  const {
    currentState: deletedEntities,
    dispatchWithoutControl: dispatchDeletion
  } = useSelectiveContextGlobalDispatch<(string | number)[]>({
    contextKey: getDeletedContextKey(entityClass),
    initialValue: EmptyArray,
    listenerKey: `${id}:uiWrapper`
  });

  const deleted = useMemo(() => {
    return deletedEntities.includes(id);
  }, [deletedEntities, id]);

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

