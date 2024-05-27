"use client";

import { useGlobalReadAny } from "selective-context";
import { TrackChangesProps } from "../../types";
import { useCommitAddDeleteEditCallback } from "../../hooks/internal/useCommitAddDeleteEditCallback";
import { useChangesTrackerControllers } from "../../hooks/internal/useChangesTrackerControllers";
import { useHasChangesFlagCallback } from "../../hooks/internal/useHasChangesFlagCallback";

export function EditAddDeleteController({
  entityClass,
  ...serverActions
}: TrackChangesProps<any, any>) {
  const changesTrackers = useChangesTrackerControllers(entityClass);
  const { dispatchUnsavedFlag, changedDtos, deletedDtos, transientDtoIdList } =
    changesTrackers;

  const selectiveContextReadAll = useGlobalReadAny();

  const handleCommit = useCommitAddDeleteEditCallback({
    ...changesTrackers,
    selectiveContextReadAll,
    entityClass,
    ...serverActions,
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
