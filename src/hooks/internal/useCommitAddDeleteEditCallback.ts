import { CommitChangesCallbackParams, HasIdClass } from "../../types";
import { useCallback } from "react";
import { handleCommitEdits } from "../../functions/handleCommitEdits";
import { handleCommitDeletes } from "../../functions/handleCommitDeletes";
import { handleCommitAdditions } from "../../functions/handleCommitAdditions";

export function useCommitAddDeleteEditCallback<
  T extends HasIdClass<U>,
  U extends string | number,
>({
  changedDtos,
  dispatchChangesList,
  deletedDtos,
  dispatchDeletionList,
  transientDtoIdList,
  dispatchTransientList,
  selectiveContextReadAll,
  entityClass,
  updateServerAction,
  postServerAction,
  deleteServerAction,
  dispatchIdList,
  dispatchMasterList,
}: CommitChangesCallbackParams<T, U>) {
  return useCallback(async () => {
    handleCommitEdits(
      changedDtos,
      transientDtoIdList,
      selectiveContextReadAll,
      entityClass,
      dispatchChangesList,
      updateServerAction,
    );
    handleCommitDeletes(
      deleteServerAction,
      deletedDtos,
      transientDtoIdList,
      dispatchDeletionList,
      dispatchMasterList,
      dispatchIdList,
    );

    handleCommitAdditions(
      postServerAction,
      transientDtoIdList,
      deletedDtos,
      selectiveContextReadAll,
      entityClass,
      dispatchTransientList,
    );
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
}
