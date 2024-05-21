"use client";

import { useCallback } from "react";
import { useGlobalController, useGlobalReadAny } from "selective-context";
import { getEntityNamespaceContextKey } from "../functions/getEntityNamespaceContextKey";
import { EmptyArray, IdListControllerProps } from "../types";
import { getChangesContextKey } from "../functions/getChangesContextKey";
import { getDeletedContextKey } from "../functions/getDeletedContextKey";
import { getIdListContextKey } from "../functions/getIdListContextKey";
import { getAddedContextKey } from "../functions/getAddedContextKey";

export function IdListController({
  entityName,
  idList,
  updateServerAction,
  deleteServerAction,
  postServerAction,
}: IdListControllerProps<any>) {
  const { currentState, dispatch } = useGlobalController({
    contextKey: getIdListContextKey(entityName),
    listenerKey: listenerKey,
    initialValue: idList,
  });

  const { currentState: changedDtos, dispatch: dispatchChangesList } =
    useGlobalController<(string | number)[]>({
      contextKey: getChangesContextKey(entityName),
      listenerKey: `${entityName}:${listenerKey}`,
      initialValue: EmptyArray,
    });

  const { currentState: deletedDtos, dispatch: dispatchDeletionList } =
    useGlobalController<(string | number)[]>({
      contextKey: getDeletedContextKey(entityName),
      listenerKey: `${entityName}:${listenerKey}`,
      initialValue: EmptyArray,
    });

  const { currentState: transientDtoIdList, dispatch: dispatchTransientList } =
    useGlobalController<(string | number)[]>({
      contextKey: getAddedContextKey(entityName),
      listenerKey: `${entityName}:${listenerKey}`,
      initialValue: EmptyArray,
    });

  const selectiveContextReadAll = useGlobalReadAny();

  const handleCommit = useCallback(async () => {
    if (updateServerAction === undefined) {
      console.error("No server update action defined");
    } else {
      const set = new Set<string | number>();
      changedDtos.forEach((key) => set.add(key));
      const keyArray: (string | number)[] = [];
      set.forEach((element) => keyArray.push(element));
      const updatedEntities = keyArray
        .map((id) =>
          selectiveContextReadAll(getEntityNamespaceContextKey(entityName, id)),
        )
        .filter((item) => item !== undefined);
      // const entityList = Object.values(currentModels as StringMap<T>);
      console.log(updatedEntities);
      updateServerAction(updatedEntities).then(() => dispatchChangesList([]));
    }

    if (deleteServerAction === undefined) {
      console.error("No server delete action defined");
    } else {
      deletedDtos.filter((id) => !transientDtoIdList.includes(id));
      deleteServerAction(deletedDtos).then(() => dispatchDeletionList([]));
    }

    if (postServerAction === undefined) {
      console.error("No server post action defined");
    } else {
      const transientDtoList = transientDtoIdList
        .filter((id) => !deletedDtos.includes(id))
        .map((id) =>
          selectiveContextReadAll(getEntityNamespaceContextKey(entityName, id)),
        )
        .filter((item) => item !== undefined);
      postServerAction(transientDtoList).then(() => dispatchTransientList([]));
    }
  }, [
    updateServerAction,
    transientDtoIdList,
    deletedDtos,
    changedDtos,
    selectiveContextReadAll,
    entityName,
    dispatchChangesList,
    deleteServerAction,
    dispatchDeletionList,
    postServerAction,
    dispatchTransientList,
  ]);

  return null;
}

const listenerKey = "controller";
