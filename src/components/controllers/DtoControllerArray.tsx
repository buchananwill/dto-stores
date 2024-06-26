import { DtoControllerArrayProps, Entity } from "../../types";
import { getEntityNamespaceKeyWithDto } from "../../functions/name-space-keys/getEntityNamespaceKeyWithDto";
import React from "react";
import { DtoController } from "./DtoController";

export function DtoControllerArray<T extends Entity>({
  dtoList,
  entityClass,
}: DtoControllerArrayProps<T>) {
  return (
    <>
      {dtoList.map((dto) => (
        <DtoControllerMemo
          key={getEntityNamespaceKeyWithDto(entityClass, dto)}
          dto={dto}
          entityClass={entityClass}
        />
      ))}
    </>
  );
}

const DtoControllerMemo = React.memo(DtoController);
