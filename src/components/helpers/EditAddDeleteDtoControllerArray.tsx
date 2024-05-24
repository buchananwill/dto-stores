import { EditAddDeleteController } from "../controllers";
import { HasIdClass, PrimaryDtoControllerArrayProps } from "../../types";
import React from "react";
import { DtoControllerArray } from "./DtoControllerArray";
import { DataMonitoringIdListController } from "../controllers";
import { useMasterListControllerAddDelete } from "../../hooks/internal/useMasterListControllerAddDelete";

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
      <DataMonitoringIdListController
        entityList={masterList}
        entityClass={entityClass}
      />
      <EditAddDeleteController
        entityClass={entityClass}
        {...trackChangesProps}
      />
      <DtoControllerArray entityClass={entityClass} dtoList={masterList} />
    </>
  );
}
