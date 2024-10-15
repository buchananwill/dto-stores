import { DtoControllerArrayProps, Entity } from "../../types";
import { getEntityNamespaceKeyWithDto } from "../../functions/name-space-keys/getEntityNamespaceKeyWithDto";
import React, { useMemo } from "react";
import { DtoController } from "./DtoController";

export function DtoControllerArray<T extends Entity>({
  dtoList,
  entityClass,
  mergeInitialWithProp,
  commitVersion,
}: DtoControllerArrayProps<T>) {
  const safeDtoList = useMemo(() => {
    const idSet = new Set<number | string>();
    const safeDtoList = [];
    for (const t of dtoList) {
      if (!idSet.has(t.id)) {
        safeDtoList.push(t);
        idSet.add(t.id);
      }
    }
    return safeDtoList;
  }, [dtoList]);
  return (
    <>
      {safeDtoList.map((dto) => (
        <DtoControllerMemo
          key={getEntityNamespaceKeyWithDto(entityClass, dto)}
          dto={dto}
          entityClass={entityClass}
          commitVersion={commitVersion}
          mergeInitialWithProp={mergeInitialWithProp}
        />
      ))}
    </>
  );
}

const DtoControllerMemo = React.memo(DtoController);
