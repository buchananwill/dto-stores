"use client";

import { useGlobalReadAny } from "selective-context";
import { EditControllerProps, HasIdClass, Identifier } from "../../types";
import { useChangesTrackerControllers } from "../../hooks/internal/useChangesTrackerControllers";
import { useHasChangesFlagCallback } from "../../hooks/internal/useHasChangesFlagCallback";
import { useCommitEditCallback } from "../../hooks/internal/useCommitEditCallback";

export function EditController<T extends HasIdClass<U>, U extends Identifier>({
  entityClass,
  updateServerAction,
}: EditControllerProps<T, U>) {
  const changesTrackers = useChangesTrackerControllers<U>(entityClass);
  const { dispatchUnsavedFlag, changedDtos, deletedDtos, transientDtoIdList } =
    changesTrackers;

  const selectiveContextReadAll = useGlobalReadAny<T>();

  const handleCommit = useCommitEditCallback<T, U>({
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
