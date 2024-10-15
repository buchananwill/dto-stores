import { CommitChangesCallbackParams, HasIdClass } from "../../types";
import { useCallback } from "react";
import { handleCommitEdits } from "../../functions/handleCommitEdits";
import { handleCommitDeletes } from "../../functions/handleCommitDeletes";
import { handleCommitAdditions } from "../../functions/handleCommitAdditions";
import { useGlobalDispatch } from "selective-context";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { KEY_TYPES } from "../../literals";

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
  const { dispatchWithoutListen } = useGlobalDispatch<number>(
    getNameSpacedKey(entityClass, KEY_TYPES.COMMIT_VERSION),
  );
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
      dispatchMasterList,
    );
    dispatchWithoutListen((prev) => prev++);
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
