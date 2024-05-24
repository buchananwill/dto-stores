import { CommitServerAction } from "../types";
import { Dispatch, SetStateAction } from "react";

export function handleCommitDeletes<U>(
  deleteServerAction: undefined | CommitServerAction<U>,
  deletedDtos: Array<U>,
  transientDtoIdList: Array<U>,
  dispatchDeletionList: Dispatch<SetStateAction<Array<U>>>,
) {
  if (deleteServerAction === undefined) {
    console.error("No server delete action defined");
  } else {
    deletedDtos.filter((id) => !transientDtoIdList.includes(id));
    deleteServerAction(deletedDtos).then(() => dispatchDeletionList([]));
  }
}
