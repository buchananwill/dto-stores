import { DtoController } from './DtoController';
import { DtoIdListController } from './DtoIdListController';
import {DtoListControllerProps, HasId} from "../types";
import {getEntityNamespaceKeyWithDto} from "../functions/getEntityNamespaceKeyWithDto";
import React from "react";

export function DtoControllerArray<T extends HasId>({
  dtoList,
  entityName,
  updateServerAction,
  deleteServerAction
}: DtoListControllerProps<T>) {
  return (
    <>
      <DtoIdListController
        dtoList={dtoList}
        entityName={entityName}
        updateServerAction={updateServerAction}
        deleteServerAction={deleteServerAction}
      />
      {dtoList.map((dto) => (
        <DtoController
          key={getEntityNamespaceKeyWithDto(entityName, dto)}
          dto={dto}
          entityName={entityName}
        />
      ))}
    </>
  );
}
