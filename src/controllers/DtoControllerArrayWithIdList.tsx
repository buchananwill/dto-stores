import { DtoController } from "./DtoController";
import { DtoIdListController } from "./DtoIdListController";
import { DtoListControllerProps, HasId } from "../types";
import { getEntityNamespaceKeyWithDto } from "../functions/name-space-keys/getEntityNamespaceKeyWithDto";
import React from "react";

export function DtoControllerArrayWithIdList<T extends HasId>({
  dtoList,
  entityClass,
  updateServerAction,
  deleteServerAction,
  unsavedChangesComponent,
  postServerAction,
}: DtoListControllerProps<T>) {
  return (
    <>
      <DtoIdListController
        dtoList={dtoList}
        entityClass={entityClass}
        updateServerAction={updateServerAction}
        deleteServerAction={deleteServerAction}
        postServerAction={postServerAction}
        unsavedChangesComponent={unsavedChangesComponent}
      />
      {dtoList.map((dto) => (
        <DtoController
          key={getEntityNamespaceKeyWithDto(entityClass, dto)}
          dto={dto}
          entityName={entityClass}
        />
      ))}
    </>
  );
}
