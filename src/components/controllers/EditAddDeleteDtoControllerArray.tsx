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
  ...trackChangesProps
}: PrimaryDtoControllerArrayProps<T, U>) {
  const { masterList } = useMasterListControllerAddDelete(dtoList, entityClass);
  return (
    <>
      <EditAddDeleteController
        entityClass={entityClass}
        {...trackChangesProps}
      />
      <DtoControllerArray entityClass={entityClass} dtoList={masterList} />
    </>
  );
}
