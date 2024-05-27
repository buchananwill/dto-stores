import {
  DtoUiWrapperListSomeProps,
  DtoUiWrapperProps,
  Entity,
} from "../../types";
import { DtoUiWrapper } from "./DtoUiWrapper";
import React from "react";

export function DtoUiListSome<T extends Entity, Props>({
  entityIdList,
  entityClass,
  renderAs,
  ...props
}: DtoUiWrapperListSomeProps<T, Props>) {
  return entityIdList.map((entityId) => {
    const finalProps = {
      entityId,
      entityClass,
      renderAs,
      ...props,
    } as DtoUiWrapperProps<T, Props> & Props;
    return <DtoUiWrapper key={`${entityClass}:${entityId}`} {...finalProps} />;
  });
}
