"use client";

import {
  HasIdClass,
  Identifier,
  PrimaryDtoControllerArrayProps,
} from "../../types";
import React from "react";
import { DtoControllerArray } from "./DtoControllerArray";
import { useMasterListControllerAddDelete } from "../../hooks/internal";
import { EditAddDeleteController } from "../internal/EditAddDeleteController";
import { useGlobalController } from "selective-context";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { KEY_TYPES } from "../../literals";
import { getControllerListenerKey } from "../../hooks/internal/getControllerListenerKey";

export function EditAddDeleteDtoControllerArray<
  T extends HasIdClass<U>,
  U extends Identifier,
>({
  entityClass,
  dtoList,
  mergeInitialWithProp,
  ...trackChangesProps
}: PrimaryDtoControllerArrayProps<T, U>) {
  const { masterList, dispatchIdList, dispatchMasterList } =
    useMasterListControllerAddDelete<T, U>(dtoList, entityClass);
  const nameSpacedKey = getNameSpacedKey(entityClass, KEY_TYPES.COMMIT_VERSION);
  const { currentState: commitVersion } = useGlobalController<number>({
    contextKey: nameSpacedKey,
    initialValue: 0,
    listenerKey: getControllerListenerKey(nameSpacedKey),
  });
  return (
    <>
      <EditAddDeleteController
        entityClass={entityClass}
        {...trackChangesProps}
        dispatchIdList={dispatchIdList}
        dispatchMasterList={dispatchMasterList}
      />
      <DtoControllerArray
        entityClass={entityClass}
        commitVersion={commitVersion}
        dtoList={masterList}
        mergeInitialWithProp={mergeInitialWithProp}
      />
    </>
  );
}
