"use client";

import { useGlobalReadAny } from "selective-context";
import { Identifier, TrackChangesProps } from "../../types";
import { useCommitAddDeleteEditCallback } from "../../hooks/internal/useCommitAddDeleteEditCallback";
import { useChangesTrackerControllers } from "../../hooks/internal/useChangesTrackerControllers";
import { useHasChangesFlagCallback } from "../../hooks/internal/useHasChangesFlagCallback";

export function EditAddDeleteController({
  entityClass,
  ...serverActions
}: TrackChangesProps<never, Identifier>) {
  const changesTrackers = useChangesTrackerControllers(entityClass);
  const { dispatchUnsavedFlag, changedDtos, deletedDtos, transientDtoIdList } =
    changesTrackers;

  const selectiveContextReadAll = useGlobalReadAny<never>();

  const handleCommit = useCommitAddDeleteEditCallback({
    ...changesTrackers,
    selectiveContextReadAll,
    entityClass,
    ...serverActions,
  });

  const hasChanges =
    (changedDtos.length > 0 && !!serverActions.updateServerAction) ||
    (deletedDtos.length > 0 && !!serverActions.deleteServerAction) ||
    (transientDtoIdList.length > 0 && !!serverActions.postServerAction);

  useHasChangesFlagCallback(
    handleCommit,
    hasChanges,
    dispatchUnsavedFlag,
    entityClass,
  );

  return null;
}
