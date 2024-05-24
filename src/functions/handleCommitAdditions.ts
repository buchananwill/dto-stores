import { CommitServerAction } from "../types";
import { SelectiveContextReadAll } from "selective-context/dist/types";
import { Dispatch, SetStateAction } from "react";
import { getEntityNamespaceContextKey } from "./name-space-keys/getEntityNamespaceContextKey";
import { isNotUndefined } from "./isNotUndefined";

export function handleCommitAdditions<T, U extends string | number>(
  postServerAction: undefined | CommitServerAction<T>,
  transientDtoIdList: Array<U>,
  deletedDtos: Array<U>,
  selectiveContextReadAll: SelectiveContextReadAll<T>,
  entityClass: string,
  dispatchTransientList: Dispatch<SetStateAction<Array<U>>>,
) {
  if (postServerAction === undefined) {
    console.error("No server post action defined");
  } else {
    const transientDtoList = transientDtoIdList
      .filter((id) => !deletedDtos.includes(id))
      .map((id) =>
        selectiveContextReadAll(getEntityNamespaceContextKey(entityClass, id)),
      )
      .filter(isNotUndefined);
    postServerAction(transientDtoList).then(() => dispatchTransientList([]));
  }
}
