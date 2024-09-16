"use client";

import {
  HasIdClass,
  Identifier,
  PrimaryDtoControllerArrayProps,
} from "../../types";
import React from "react";
import { DtoControllerArray } from "./DtoControllerArray";
import { useMasterListControllerAddDelete } from "../../hooks/internal";
import { EditAddDeleteController } from "../internal/EditAddDeleteController";

export function EditAddDeleteDtoControllerArray<
  T extends HasIdClass<U>,
  U extends Identifier,
>({
  entityClass,
  dtoList,
  mergeInitialWithProp,
  ...trackChangesProps
}: PrimaryDtoControllerArrayProps<T, U>) {
  const { masterList, dispatchIdList, dispatchMasterList } =
    useMasterListControllerAddDelete<T, U>(dtoList, entityClass);
  return (
    <>
      <EditAddDeleteController
        entityClass={entityClass}
        {...trackChangesProps}
        dispatchIdList={dispatchIdList}
        dispatchMasterList={dispatchMasterList}
      />
      <DtoControllerArray
        entityClass={entityClass}
        dtoList={masterList}
        mergeInitialWithProp={mergeInitialWithProp}
      />
    </>
  );
}
