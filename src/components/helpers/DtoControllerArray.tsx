import { DtoController } from "../controllers/DtoController";
import { DtoControllerArrayProps, Entity } from "../../types";
import { getEntityNamespaceKeyWithDto } from "../../functions/name-space-keys/getEntityNamespaceKeyWithDto";
import React from "react";

function dtoControllerArray<T extends Entity>({
  dtoList,
  entityClass,
}: DtoControllerArrayProps<T>) {
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
