import {
  ArrayPlaceholder,
  useGlobalController,
  useGlobalDispatchAndListener,
} from "selective-context";

import { useEffect, useMemo, useRef } from "react";
import { HasIdClass } from "../../types";
import { KEY_TYPES } from "../../literals";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { useEffectSyncDeepEqualWithDispatch } from "../util";
import { getControllerListenerKey } from "./getControllerListenerKey";

function getMasterListControllerListenerKey(deletedContext: string) {
  return `${deletedContext}:masterListController`;
}

/**
 * Maintains a list of all the loaded entities of a class, including transient ones.
 * Transient entities that are deleted get discarded.
 * */
export function useMasterListControllerAddDelete<
  T extends HasIdClass<U>,
  U extends string | number,
>(entityList: T[], entityClass: string) {
  const masterListContext = getNameSpacedKey(
    entityClass,
    KEY_TYPES.MASTER_LIST,
  );
  const { currentState: masterList, dispatch: dispatchMasterList } =
    useGlobalController({
      contextKey: masterListContext,
      listenerKey: getControllerListenerKey(masterListContext),
      initialValue: entityList,
    });

  const idList = useMemo(() => {
    return masterList.map((dto) => dto.id);
  }, [masterList]);

  const idListContext = getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST);

  const { dispatch } = useGlobalController({
    contextKey: idListContext,
    listenerKey: getControllerListenerKey(idListContext),
    initialValue: idList,
  });

  const selectedContext = getNameSpacedKey(entityClass, KEY_TYPES.SELECTED);

  useGlobalController({
    contextKey: selectedContext,
    listenerKey: getControllerListenerKey(selectedContext),
    initialValue: ArrayPlaceholder as U[],
  });

  useEffectSyncDeepEqualWithDispatch(idList, dispatch);

  const deletedContext = getNameSpacedKey(entityClass, KEY_TYPES.DELETED);

  const {
    currentState: deletedIdList,
    dispatchWithoutControl: dispatchDeletedList,
  } = useGlobalDispatchAndListener<U[]>({
    contextKey: deletedContext,
    listenerKey: getMasterListControllerListenerKey(deletedContext),
    initialValue: ArrayPlaceholder,
  });

  const addedContext = getNameSpacedKey(entityClass, KEY_TYPES.ADDED);

  const {
    dispatchWithoutControl: dispatchTransientIdList,
    currentState: transientIdList,
  } = useGlobalDispatchAndListener<U[]>({
    contextKey: addedContext,
    listenerKey: getMasterListControllerListenerKey(addedContext),
    initialValue: ArrayPlaceholder,
  });

  // Store the transient ID list in a ref, so changes to it don't directly trigger the subsequent useEffect.
  const transientIdListRef = useRef([] as U[]);
  transientIdListRef.current = transientIdList;

  useEffect(() => {
    const transientAndDeleted = deletedIdList.filter((id) =>
      transientIdListRef.current.includes(id),
    );
    if (transientAndDeleted.length > 0) {
      dispatchMasterList((list) =>
        list.filter((item) => !transientAndDeleted.includes(item.id)),
      );
      dispatchDeletedList((list) =>
        list.filter((id) => !transientAndDeleted.includes(id)),
      );
      dispatchTransientIdList((list) =>
        list.filter((id) => !transientAndDeleted.includes(id)),
      );
    }
  }, [
    deletedIdList,
    dispatchMasterList,
    dispatchTransientIdList,
    dispatchDeletedList,
  ]);
  return {
    masterList,
    dispatch: dispatchMasterList,
    dispatchWithoutControl: dispatchTransientIdList,
  };
}
