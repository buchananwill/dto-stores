import { Dispatch, SetStateAction } from "react";
import { CommitServerAction } from "../types";
import { getEntityNamespaceContextKey } from "./name-space-keys/getEntityNamespaceContextKey";
import { isNotUndefined } from "./isNotUndefined";

export function handleCommitEdits<T, U extends string | number>(
  changedDtos: U[],
  transientDtoIdList: U[],
  selectiveContextReadAll: (contextKey: string) => undefined | T,
  entityClass: string,
  dispatchChangesList: Dispatch<SetStateAction<U[]>>,
  updateServerAction?: CommitServerAction<T, T[]>,
) {
  if (updateServerAction === undefined) {
    console.error("No server update action defined");
  } else if (changedDtos.length > 0) {
    const set = new Set<string | number>();
    const transientIds = new Set(transientDtoIdList);
    changedDtos
      .filter((id) => !transientIds.has(id))
      .forEach((key) => set.add(key));
    const keyArray: (string | number)[] = [];
    set.forEach((element) => keyArray.push(element));
    const updatedEntities = keyArray
      .map((id) =>
        selectiveContextReadAll(getEntityNamespaceContextKey(entityClass, id)),
      )
      .filter(isNotUndefined);
    if (updatedEntities.length > 0) {
      updateServerAction(updatedEntities).then(() => dispatchChangesList([]));
    } else {
      dispatchChangesList([]);
    }
  }
}
