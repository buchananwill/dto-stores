import { useGlobalController, useGlobalDispatch } from "selective-context";
import { ChangesCallbackMap, ChangesTracker, EmptyArray } from "../../types";
import { Controller, KEY_TYPES } from "../../literals";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";

export function useChangesTrackerControllers<U extends string | number>(
  entityClass: string,
) {
  const { currentState: changedDtos, dispatch: dispatchChangesList } =
    useGlobalController<U[]>({
      contextKey: getNameSpacedKey(entityClass, KEY_TYPES.CHANGES),
      listenerKey: Controller,
      initialValue: EmptyArray,
    });

  const { currentState: deletedDtos, dispatch: dispatchDeletionList } =
    useGlobalController<U[]>({
      contextKey: getNameSpacedKey(entityClass, KEY_TYPES.DELETED),
      listenerKey: Controller,
      initialValue: EmptyArray,
    });

  const { currentState: transientDtoIdList, dispatch: dispatchTransientList } =
    useGlobalController<U[]>({
      contextKey: getNameSpacedKey(entityClass, KEY_TYPES.ADDED),
      listenerKey: Controller,
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
