"use client";

import { useGlobalReadAny } from "selective-context";
import { HasIdClass, Identifier, TrackChangesProps } from "../../types";
import { useCommitAddDeleteEditCallback } from "../../hooks/internal/useCommitAddDeleteEditCallback";
import { useChangesTrackerControllers } from "../../hooks/internal/useChangesTrackerControllers";
import { useHasChangesFlagCallback } from "../../hooks/internal/useHasChangesFlagCallback";
import { useEffect, useRef } from "react";

export function EditAddDeleteController<
  T extends HasIdClass<U>,
  U extends Identifier,
>({
  entityClass,
  dispatchMasterList,
  dispatchIdList,
  ...serverActions
}: TrackChangesProps<T, U>) {
  const changesTrackers = useChangesTrackerControllers<U>(entityClass);
  const { dispatchUnsavedFlag, changedDtos, deletedDtos, transientDtoIdList } =
    changesTrackers;
  const entityClassRef = useRef(entityClass);

  const selectiveContextReadAll = useGlobalReadAny<T>();

  const handleCommit = useCommitAddDeleteEditCallback({
    ...changesTrackers,
    selectiveContextReadAll,
    entityClass,
    dispatchIdList,
    dispatchMasterList,
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

  useEffect(() => {
    const entityClassScoped = entityClassRef.current;
    return () => {
      dispatchUnsavedFlag((prevMap) => {
        const nextMap = new Map(prevMap);
        nextMap.delete(entityClassScoped);
        return nextMap;
      });
    };
  }, []);

  return null;
}
