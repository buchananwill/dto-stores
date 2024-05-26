import { useCallback } from "react";
import { DispatchList } from "../../../types";
import { KEY_TYPES } from "../../../literals";
import { NamespacedHooks } from "./useNamespacedHooks";

export function useMasterListInteraction(
  entityClass: string,
  callback: (
    dispatchMasterList: DispatchList<any>,
    dispatchAddedList: DispatchList<any>,
  ) => void,
) {
  const dispatch = NamespacedHooks.useDispatch(
    entityClass,
    KEY_TYPES.MASTER_LIST,
  );
  const dispatchWithoutListen = NamespacedHooks.useDispatch(
    entityClass,
    KEY_TYPES.ADDED,
  );

  return useCallback(
    () => callback(dispatch, dispatchWithoutListen),
    [callback, dispatch, dispatchWithoutListen],
  );
}
