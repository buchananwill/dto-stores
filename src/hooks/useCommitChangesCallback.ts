import { CommitServerAction, HasId } from "../types";
import { SelectiveContextReadAll } from "selective-context/dist/types";
import React, { useCallback } from "react";
import { getEntityNamespaceContextKey } from "../functions/name-space-keys/getEntityNamespaceContextKey";
import { isNotUndefined } from "../functions/utils";

export function useCommitChangesCallback<T extends HasId>(
  transientDtoIdList: (string | number)[],
  deletedDtos: (string | number)[],
  changedDtos: (string | number)[],
  selectiveContextReadAll: SelectiveContextReadAll<T>,
  entityName: string,
  dispatchChangesList: React.Dispatch<
    React.SetStateAction<(string | number)[]>
  >,
  dispatchDeletionList: React.Dispatch<
    React.SetStateAction<(string | number)[]>
  >,
  dispatchTransientList: React.Dispatch<
    React.SetStateAction<(string | number)[]>
  >,
  updateServerAction?: CommitServerAction<T>,
  postServerAction?: CommitServerAction<T>,
  deleteServerAction?: CommitServerAction<any>,
) {
  return useCallback(async () => {
    if (updateServerAction === undefined) {
      console.error("No server update action defined");
    } else {
      const set = new Set<string | number>();
      changedDtos.forEach((key) => set.add(key));
      const keyArray: (string | number)[] = [];
      set.forEach((element) => keyArray.push(element));
      const updatedEntities = keyArray
        .map((id) =>
          selectiveContextReadAll(getEntityNamespaceContextKey(entityName, id)),
        )
        .filter(isNotUndefined);
      // const entityList = Object.values(currentModels as StringMap<T>);
      console.log(updatedEntities);
      updateServerAction(updatedEntities).then(() => dispatchChangesList([]));
    }

    if (deleteServerAction === undefined) {
      console.error("No server delete action defined");
    } else {
      deletedDtos.filter((id) => !transientDtoIdList.includes(id));
      deleteServerAction(deletedDtos).then(() => dispatchDeletionList([]));
    }

    if (postServerAction === undefined) {
      console.error("No server post action defined");
    } else {
      const transientDtoList = transientDtoIdList
        .filter((id) => !deletedDtos.includes(id))
        .map((id) =>
          selectiveContextReadAll(getEntityNamespaceContextKey(entityName, id)),
        )
        .filter(isNotUndefined);
      postServerAction(transientDtoList).then(() => dispatchTransientList([]));
    }
  }, [
    updateServerAction,
    transientDtoIdList,
    deletedDtos,
    changedDtos,
    selectiveContextReadAll,
    entityName,
    dispatchChangesList,
    deleteServerAction,
    dispatchDeletionList,
    postServerAction,
    dispatchTransientList,
  ]);
}
