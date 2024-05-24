import { CommitEditCallbackParams, HasIdClass } from "../types";
import { useCallback } from "react";
import { handleCommitEdits } from "../functions/handleCommitEdits";

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
