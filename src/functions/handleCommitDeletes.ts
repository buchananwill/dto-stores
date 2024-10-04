import {
  CommitServerAction,
  DispatchList,
  HasIdClass,
  Identifier,
} from "../types";
import { Dispatch, SetStateAction } from "react";

export function handleCommitDeletes<
  T extends HasIdClass<U>,
  U extends Identifier,
>(
  deleteServerAction: undefined | CommitServerAction<U, U[]>,
  deletedDtos: U[],
  transientDtoIdList: U[],
  dispatchDeletionList: Dispatch<SetStateAction<U[]>>,
  dispatchMasterList: DispatchList<T>,
  dispatchIdList: DispatchList<U>,
) {
  if (deleteServerAction === undefined) {
    console.error("No server delete action defined");
  } else if (deletedDtos.length > 0) {
    deletedDtos.filter((id) => !transientDtoIdList.includes(id));
    deleteServerAction(deletedDtos).then(() => {
      const idSet = new Set(deletedDtos);
      dispatchDeletionList([]);
      dispatchMasterList((list) =>
        list.filter((entity) => !idSet.has(entity.id)),
      );
      dispatchIdList((list) => list.filter((id) => !idSet.has(id)));
    });
  }
}
