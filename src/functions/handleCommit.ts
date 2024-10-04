import { Dispatch, SetStateAction } from "react";
import { CommitServerAction } from "../types";
import { getEntityNamespaceContextKey } from "./name-space-keys/getEntityNamespaceContextKey";
import { isNotUndefined } from "./isNotUndefined";
import { handleAction } from "./handleAction";

export function handleCommit<Entity, Id extends string | number, Response>(
  itemsToCommit: Id[], // Items to commit (either additions or edits)
  itemsToExcludeFromCommit: Id[], // Items that should be excluded (transient or deleted)
  selectiveContextReadAll: (contextKey: string) => undefined | Entity,
  entityClass: string,
  dispatchIdList: Dispatch<SetStateAction<Id[]>>,
  serverAction?: CommitServerAction<Entity[], Response>,
  handleError?: (error: Error) => void, // Optional error callback
) {
  // Prepare payload function
  const preparePayload = () => {
    const exclusionSet = new Set(itemsToExcludeFromCommit);
    const filteredItems = itemsToCommit.filter((id) => !exclusionSet.has(id)); // Filter out the excluded items
    if (filteredItems.length > 0) {
      return filteredItems
        .map((id) =>
          selectiveContextReadAll(
            getEntityNamespaceContextKey(entityClass, id),
          ),
        )
        .filter(isNotUndefined); // Only process valid entities
    }
    return undefined; // Return undefined if no valid items
  };

  // Success handler
  const onSuccess = () => {
    dispatchIdList([]); // Clear the items on successful commit
  };

  // Call handleAction with prepared functions
  if (serverAction !== undefined) {
    handleAction(preparePayload, serverAction, onSuccess, handleError);
  } else {
    console.error("No server action defined");
  }
}
