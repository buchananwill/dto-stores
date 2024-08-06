import { useGlobalController, useGlobalDispatch } from "selective-context";
import { ChangesCallbackMap, ChangesTracker } from "../../types";
import { EmptyArray, KEY_TYPES } from "../../literals";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";

import { getControllerListenerKey } from "./getControllerListenerKey";

export function useChangesTrackerControllers<U extends string | number>(
  entityClass: string,
) {
  const changesContext = getNameSpacedKey(entityClass, KEY_TYPES.CHANGES);
  const { currentState: changedDtos, dispatch: dispatchChangesList } =
    useGlobalController<U[]>({
      contextKey: changesContext,
      listenerKey: getControllerListenerKey(changesContext),
      initialValue: EmptyArray,
    });

  const deletedContext = getNameSpacedKey(entityClass, KEY_TYPES.DELETED);
  const { currentState: deletedDtos, dispatch: dispatchDeletionList } =
    useGlobalController<U[]>({
      contextKey: deletedContext,
      listenerKey: getControllerListenerKey(deletedContext),
      initialValue: EmptyArray,
    });

  const addedContext = getNameSpacedKey(entityClass, KEY_TYPES.ADDED);
  const { currentState: transientDtoIdList, dispatch: dispatchTransientList } =
    useGlobalController<U[]>({
      contextKey: addedContext,
      listenerKey: getControllerListenerKey(addedContext),
      initialValue: EmptyArray,
    });

  const { dispatchWithoutListen: dispatchUnsavedFlag } =
    useGlobalDispatch<ChangesCallbackMap>("unsavedChanges");
  return {
    changedDtos,
    dispatchChangesList,
    deletedDtos,
    dispatchDeletionList,
    transientDtoIdList,
    dispatchTransientList,
    dispatchUnsavedFlag,
  } as ChangesTracker<U>;
}
