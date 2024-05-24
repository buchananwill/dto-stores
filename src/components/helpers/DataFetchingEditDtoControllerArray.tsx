"use client";

import React from "react";
import {
  DataFetchingProps,
  EditControllerProps,
  HasIdClass,
} from "../../types";
import { DtoControllerArray } from "./DtoControllerArray";
import { useMasterListFetchController } from "../../hooks/useMasterListControllerFetch";
import { EditController } from "../controllers/EditController";

export function DataFetchingEditDtoControllerArray<
  T extends HasIdClass<U>,
  U extends string | number,
>({
  entityClass,
  idList,
  getServerAction,
  updateServerAction,
}: DataFetchingProps<T, U> & EditControllerProps) {
  const { masterList } = useMasterListFetchController({
    entityClass,
    idList,
    getServerAction,
  });

  return (
    <>
      <EditController
        entityClass={entityClass}
        updateServerAction={updateServerAction}
      />
      <DtoControllerArray dtoList={masterList} entityClass={entityClass} />
    </>
  );
}
