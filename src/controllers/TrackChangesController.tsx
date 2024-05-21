"use client";

import { useEffect, useRef } from "react";
import { useGlobalReadAny } from "selective-context";
import { IdListControllerProps } from "../types";
import { useCommitChangesCallback } from "./useCommitChangesCallback";
import { useChangesTrackerControllers } from "./useChangesTrackerControllers";

export function TrackChangesController({
  entityName,
  updateServerAction,
  deleteServerAction,
  postServerAction,
}: IdListControllerProps<any>) {
  const {
    changedDtos,
    dispatchChangesList,
    deletedDtos,
    dispatchDeletionList,
    transientDtoIdList,
    dispatchTransientList,
    dispatchWithoutListen,
  } = useChangesTrackerControllers(entityName);

  const selectiveContextReadAll = useGlobalReadAny();

  const handleCommit = useCommitChangesCallback(
    transientDtoIdList,
    deletedDtos,
    changedDtos,
    selectiveContextReadAll,
    entityName,
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
        updatedMap.set(entityName, apiCallbackRef);
        return updatedMap;
      });
      hasChangesRef.current = hasChanges;
    } else if (!hasChanges && hasChangesRef.current) {
      dispatchWithoutListen((callbackMap) => {
        const updatedMap = new Map([...callbackMap.entries()]);
        updatedMap.delete(entityName);
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
