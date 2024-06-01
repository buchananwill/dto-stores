import { CommitServerAction } from "../types";
import { Dispatch, SetStateAction } from "react";

export function handleCommitDeletes<U>(
  deleteServerAction: undefined | CommitServerAction<U>,
  deletedDtos: U[],
  transientDtoIdList: U[],
  dispatchDeletionList: Dispatch<SetStateAction<U[]>>,
) {
  if (deleteServerAction === undefined) {
    console.error("No server delete action defined");
  } else {
    deletedDtos.filter((id) => !transientDtoIdList.includes(id));
    deleteServerAction(deletedDtos).then(() => dispatchDeletionList([]));
  }
}
