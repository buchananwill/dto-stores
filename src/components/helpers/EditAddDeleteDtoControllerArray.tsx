"use client";
import { EditAddDeleteController } from "../controllers";
import { HasIdClass, PrimaryDtoControllerArrayProps } from "../../types";
import React from "react";
import { DtoControllerArray } from "./DtoControllerArray";
import { useMasterListControllerAddDelete } from "../../hooks/internal";

export function EditAddDeleteDtoControllerArray<
  T extends HasIdClass<U>,
  U extends string | number,
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
