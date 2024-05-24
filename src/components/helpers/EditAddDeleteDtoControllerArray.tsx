import { EditAddDeleteController } from "../controllers/EditAddDeleteController";
import { HasIdClass, PrimaryDtoControllerArrayProps } from "../../types";
import React from "react";
import { DtoControllerArray } from "./DtoControllerArray";
import { DataMonitoringIdListController } from "../controllers/DataMonitoringIdListController";

export function EditAddDeleteDtoControllerArray<
  T extends HasIdClass<U>,
  U extends string | number,
>({
  entityClass,
  dtoList,
  ...trackChangesProps
}: PrimaryDtoControllerArrayProps<T, U>) {
  return (
    <>
      <DataMonitoringIdListController
        entityList={dtoList}
        entityClass={entityClass}
      />
      <EditAddDeleteController
        entityClass={entityClass}
        {...trackChangesProps}
      />
      <DtoControllerArray entityClass={entityClass} dtoList={dtoList} />
    </>
  );
}
