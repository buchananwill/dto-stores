import { CommitServerAction } from "../types";
import { SelectiveContextReadAll } from "selective-context/dist/types";
import { Dispatch, SetStateAction } from "react";
import { getEntityNamespaceContextKey } from "./name-space-keys/getEntityNamespaceContextKey";
import { isNotUndefined } from "./isNotUndefined";

export function handleCommitAdditions<T, U extends string | number>(
  postServerAction: undefined | CommitServerAction<T>,
  transientDtoIdList: U[],
  deletedDtos: U[],
  selectiveContextReadAll: SelectiveContextReadAll<T>,
  entityClass: string,
  dispatchTransientList: Dispatch<SetStateAction<U[]>>,
) {
  if (postServerAction === undefined) {
    console.error("No server post action defined");
  } else if (transientDtoIdList.length > 0) {
    const transientDtoList = transientDtoIdList
      .filter((id) => !deletedDtos.includes(id))
      .map((id) =>
        selectiveContextReadAll(getEntityNamespaceContextKey(entityClass, id)),
      )
      .filter(isNotUndefined);
    if (transientDtoList.length > 0) {
      postServerAction(transientDtoList).then(() => dispatchTransientList([]));
    } else {
      dispatchTransientList([]);
    }
  }
}
