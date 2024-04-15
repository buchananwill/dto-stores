'use client';

import {useSelectiveContextGlobalListener} from "selective-context"
import {DtoUiComponent, EmptyArray, HasId} from "../types";
import {getIdListContextKey} from "../functions/getIdListContextKey";
import {DtoComponentWrapper} from "./dto-component-wrapper";
import React from "react";

export function DtoComponentArrayGenerator<T extends HasId>({
  entityName,
  renderEachAs: WrappedComponent
}: {
  entityName: string;
  renderEachAs?: DtoUiComponent<T>;
}) {
  const contextKey = getIdListContextKey(entityName);
  const { currentState } = useSelectiveContextGlobalListener<number[]>({
    contextKey,
    listenerKey: 'dtoComponentArrayGenerator',
    initialValue: EmptyArray
  });

  console.log(currentState);

  return currentState.map((id) => (
    <DtoComponentWrapper<T>
      entityClass={entityName}
      id={id}
      key={`${entityName}:${id}`}
      uiComponent={WrappedComponent}
    />
  ));
}
