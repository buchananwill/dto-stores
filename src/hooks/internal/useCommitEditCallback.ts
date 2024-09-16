import { CommitEditCallbackParams, HasIdClass } from "../../types";
import { useCallback } from "react";
import { handleCommitEdits } from "../../functions/handleCommitEdits";
import { EmptyArray } from "../../literals";

export function useCommitEditCallback<
  T extends HasIdClass<U>,
  U extends string | number,
>({
  changedDtos,
  dispatchChangesList,
  selectiveContextReadAll,
  entityClass,
  updateServerAction,
}: CommitEditCallbackParams<T, U>) {
  return useCallback(async () => {
    handleCommitEdits(
      changedDtos,
      EmptyArray,
      selectiveContextReadAll,
      entityClass,
      dispatchChangesList,
      updateServerAction,
    );
  }, [
    updateServerAction,
    changedDtos,
    selectiveContextReadAll,
    entityClass,
    dispatchChangesList,
  ]);
}
