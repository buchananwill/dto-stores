import { useGlobalController, useGlobalDispatch } from "selective-context";
import { getChangesContextKey } from "../functions/getChangesContextKey";
import { ChangesCallbackMap, EmptyArray } from "../types";
import { getDeletedContextKey } from "../functions/getDeletedContextKey";
import { getAddedContextKey } from "../functions/getAddedContextKey";

export function useChangesTrackerControllers(entityName: string) {
  const { currentState: changedDtos, dispatch: dispatchChangesList } =
    useGlobalController<(string | number)[]>({
      contextKey: getChangesContextKey(entityName),
      listenerKey: `${entityName}:${listenerKey}`,
      initialValue: EmptyArray,
    });

  const { currentState: deletedDtos, dispatch: dispatchDeletionList } =
    useGlobalController<(string | number)[]>({
      contextKey: getDeletedContextKey(entityName),
      listenerKey: `${entityName}:${listenerKey}`,
      initialValue: EmptyArray,
    });

  const { currentState: transientDtoIdList, dispatch: dispatchTransientList } =
    useGlobalController<(string | number)[]>({
      contextKey: getAddedContextKey(entityName),
      listenerKey: `${entityName}:${listenerKey}`,
      initialValue: EmptyArray,
    });

  const { dispatchWithoutListen } =
    useGlobalDispatch<ChangesCallbackMap>("unsavedChanges");
  return {
    changedDtos,
    dispatchChangesList,
    deletedDtos,
    dispatchDeletionList,
    transientDtoIdList,
    dispatchTransientList,
    dispatchWithoutListen,
  };
}

const listenerKey = "controller";
