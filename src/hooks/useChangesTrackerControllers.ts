import { useGlobalController, useGlobalDispatch } from "selective-context";
import { getChangesContextKey } from "../functions/name-space-keys/getChangesContextKey";
import { ChangesCallbackMap, ChangesTracker, EmptyArray } from "../types";
import { getDeletedContextKey } from "../functions/name-space-keys/getDeletedContextKey";
import { getAddedContextKey } from "../functions/name-space-keys/getAddedContextKey";

export function useChangesTrackerControllers<U extends string | number>(
  entityName: string,
) {
  const { currentState: changedDtos, dispatch: dispatchChangesList } =
    useGlobalController<U[]>({
      contextKey: getChangesContextKey(entityName),
      listenerKey: `${entityName}:${listenerKey}`,
      initialValue: EmptyArray,
    });

  const { currentState: deletedDtos, dispatch: dispatchDeletionList } =
    useGlobalController<U[]>({
      contextKey: getDeletedContextKey(entityName),
      listenerKey: `${entityName}:${listenerKey}`,
      initialValue: EmptyArray,
    });

  const { currentState: transientDtoIdList, dispatch: dispatchTransientList } =
    useGlobalController<U[]>({
      contextKey: getAddedContextKey(entityName),
      listenerKey: `${entityName}:${listenerKey}`,
      initialValue: EmptyArray,
    });

  const { dispatchWithoutListen: dispatchUnsavedFlag } =
    useGlobalDispatch<ChangesCallbackMap>("unsavedChanges");
  return <ChangesTracker<U>>{
    changedDtos,
    dispatchChangesList,
    deletedDtos,
    dispatchDeletionList,
    transientDtoIdList,
    dispatchTransientList,
    dispatchUnsavedFlag,
  };
}

const listenerKey = "controller";
