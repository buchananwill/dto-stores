"use client";

import { useGlobalReadAny } from "selective-context";
import { EditControllerProps } from "../../types";
import { useChangesTrackerControllers } from "../../hooks/internal/useChangesTrackerControllers";
import { useHasChangesFlagCallback } from "../../hooks/internal/useHasChangesFlagCallback";
import { useCommitEditCallback } from "../../hooks/internal/useCommitEditCallback";

export function EditController({
  entityClass,
  updateServerAction,
}: EditControllerProps) {
  const changesTrackers = useChangesTrackerControllers(entityClass);
  const { dispatchUnsavedFlag, changedDtos, deletedDtos, transientDtoIdList } =
    changesTrackers;

  const selectiveContextReadAll = useGlobalReadAny();

  const handleCommit = useCommitEditCallback({
    ...changesTrackers,
    selectiveContextReadAll,
    entityClass,
    updateServerAction,
  });

  const hasChanges =
    changedDtos.length > 0 ||
    deletedDtos.length > 0 ||
    transientDtoIdList.length > 0;

  useHasChangesFlagCallback(
    handleCommit,
    hasChanges,
    dispatchUnsavedFlag,
    entityClass,
  );

  return null;
}
