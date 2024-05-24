import { Dispatch, SetStateAction } from "react";
import { CommitServerAction } from "../types";
import { getEntityNamespaceContextKey } from "./name-space-keys/getEntityNamespaceContextKey";
import { isNotUndefined } from "./isNotUndefined";

export function handleCommitEdits<T, U extends string | number>(
  changedDtos: Array<U>,
  selectiveContextReadAll: { (contextKey: string): undefined | T },
  entityClass: string,
  dispatchChangesList: Dispatch<SetStateAction<Array<U>>>,
  updateServerAction?: CommitServerAction<T>,
) {
  if (updateServerAction === undefined) {
    console.error("No server update action defined");
  } else {
    const set = new Set<string | number>();
    changedDtos.forEach((key) => set.add(key));
    const keyArray: (string | number)[] = [];
    set.forEach((element) => keyArray.push(element));
    const updatedEntities = keyArray
      .map((id) =>
        selectiveContextReadAll(getEntityNamespaceContextKey(entityClass, id)),
      )
      .filter(isNotUndefined);
    updateServerAction(updatedEntities).then(() => dispatchChangesList([]));
  }
}
