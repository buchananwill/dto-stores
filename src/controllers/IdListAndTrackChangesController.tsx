"use client";

import { useCallback } from "react";
import { useGlobalController, useGlobalReadAny } from "selective-context";
import { getEntityNamespaceContextKey } from "../functions/name-space-keys/getEntityNamespaceContextKey";
import { EmptyArray, IdListControllerProps } from "../types";
import { getChangesContextKey } from "../functions/name-space-keys/getChangesContextKey";
import { getDeletedContextKey } from "../functions/name-space-keys/getDeletedContextKey";
import { getIdListContextKey } from "../functions/name-space-keys/getIdListContextKey";
import { getAddedContextKey } from "../functions/name-space-keys/getAddedContextKey";

export function IdListAndTrackChangesController({
  entityClass,
  idList,
  updateServerAction,
  deleteServerAction,
  postServerAction,
}: IdListControllerProps<any>) {
  useGlobalController({
    contextKey: getIdListContextKey(entityClass),
    listenerKey: listenerKey,
    initialValue: idList,
  });

  const { currentState: changedDtos, dispatch: dispatchChangesList } =
    useGlobalController<(string | number)[]>({
      contextKey: getChangesContextKey(entityClass),
      listenerKey: `${entityClass}:${listenerKey}`,
      initialValue: EmptyArray,
    });

  const { currentState: deletedDtos, dispatch: dispatchDeletionList } =
    useGlobalController<(string | number)[]>({
      contextKey: getDeletedContextKey(entityClass),
      listenerKey: `${entityClass}:${listenerKey}`,
      initialValue: EmptyArray,
    });

  const { currentState: transientDtoIdList, dispatch: dispatchTransientList } =
    useGlobalController<(string | number)[]>({
      contextKey: getAddedContextKey(entityClass),
      listenerKey: `${entityClass}:${listenerKey}`,
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
          selectiveContextReadAll(
            getEntityNamespaceContextKey(entityClass, id),
          ),
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
          selectiveContextReadAll(
            getEntityNamespaceContextKey(entityClass, id),
          ),
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
    entityClass,
    dispatchChangesList,
    deleteServerAction,
    dispatchDeletionList,
    postServerAction,
    dispatchTransientList,
  ]);

  return null;
}

const listenerKey = "controller";
