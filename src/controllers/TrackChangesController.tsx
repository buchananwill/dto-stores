"use client";

import { useEffect, useRef } from "react";
import { useGlobalReadAny } from "selective-context";
import { IdListControllerProps } from "../types";
import { useCommitChangesCallback } from "../hooks/useCommitChangesCallback";
import { useChangesTrackerControllers } from "../hooks/useChangesTrackerControllers";

export function TrackChangesController({
  entityClass,
  updateServerAction,
  deleteServerAction,
  postServerAction,
}: IdListControllerProps<any, any>) {
  const {
    changedDtos,
    dispatchChangesList,
    deletedDtos,
    dispatchDeletionList,
    transientDtoIdList,
    dispatchTransientList,
    dispatchWithoutListen,
  } = useChangesTrackerControllers(entityClass);

  const selectiveContextReadAll = useGlobalReadAny();

  const handleCommit = useCommitChangesCallback(
    transientDtoIdList,
    deletedDtos,
    changedDtos,
    selectiveContextReadAll,
    entityClass,
    dispatchChangesList,
    dispatchDeletionList,
    dispatchTransientList,
    updateServerAction,
    postServerAction,
    deleteServerAction,
  );

  const apiCallbackRef = useRef(handleCommit);
  const hasChangesRef = useRef(false);

  useEffect(() => {
    const hasChanges =
      changedDtos.length > 0 ||
      deletedDtos.length > 0 ||
      transientDtoIdList.length > 0;
    if (hasChanges && !hasChangesRef.current) {
      dispatchWithoutListen((callbackMap) => {
        const updatedMap = new Map([...callbackMap.entries()]);
        updatedMap.set(entityClass, apiCallbackRef);
        return updatedMap;
      });
      hasChangesRef.current = hasChanges;
    } else if (!hasChanges && hasChangesRef.current) {
      dispatchWithoutListen((callbackMap) => {
        const updatedMap = new Map([...callbackMap.entries()]);
        updatedMap.delete(entityClass);
        return updatedMap;
      });
      hasChangesRef.current = hasChanges;
    }
  }, [
    changedDtos,
    deletedDtos,
    transientDtoIdList,
    apiCallbackRef,
    hasChangesRef,
  ]);

  return null;
}
