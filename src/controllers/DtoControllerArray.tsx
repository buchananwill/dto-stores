import { DtoController } from "./DtoController";
import { DtoListControllerProps, HasId } from "../types";
import { getEntityNamespaceKeyWithDto } from "../functions/name-space-keys/getEntityNamespaceKeyWithDto";
import React from "react";

function dtoControllerArray<T extends HasId>({
  dtoList,
  entityClass,
}: DtoListControllerProps<T>) {
  return (
    <>
      {dtoList.map((dto) => (
        <DtoController
          key={getEntityNamespaceKeyWithDto(entityClass, dto)}
          dto={dto}
          entityClass={entityClass}
        />
      ))}
    </>
  );
}

export const DtoControllerArray = React.memo(dtoControllerArray);
