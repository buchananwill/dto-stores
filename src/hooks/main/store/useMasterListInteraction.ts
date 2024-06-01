import { useCallback } from "react";
import { DispatchList, Entity, Identifier } from "../../../types";
import { KEY_TYPES } from "../../../literals";
import { NamespacedHooks } from "./useNamespacedHooks";

export function useMasterListInteraction<T extends Entity>(
  entityClass: string,
  callback: (
    dispatchMasterList: DispatchList<T>,
    dispatchAddedList: DispatchList<Identifier>,
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
