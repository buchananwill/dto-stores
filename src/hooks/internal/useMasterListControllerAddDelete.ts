import {
  ArrayPlaceholder,
  useGlobalController,
  useGlobalDispatchAndListener,
} from "selective-context";

import { useEffect, useMemo, useRef } from "react";
import { HasIdClass } from "../../types";
import { Controller, KEY_TYPES } from "../../literals";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { useEffectSyncDeepEqualWithDispatch } from "../util";

const masterListListener = `masterList`;

/**
 * Maintains a list of all the loaded entities of a class, including transient ones.
 * Transient entities that are deleted get discarded.
 * */
export function useMasterListControllerAddDelete<
  T extends HasIdClass<U>,
  U extends string | number,
>(entityList: T[], entityClass: string) {
  const masterListListenerKey = `${entityClass}:${masterListListener}${Controller}`;
  const { currentState: masterList, dispatch: dispatchMasterList } =
    useGlobalController({
      contextKey: getNameSpacedKey(entityClass, KEY_TYPES.MASTER_LIST),
      listenerKey: Controller,
      initialValue: entityList,
    });

  const idList = useMemo(() => {
    return masterList.map((dto) => dto.id);
  }, [masterList]);

  const { dispatch } = useGlobalController({
    contextKey: getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST),
    listenerKey: Controller,
    initialValue: idList,
  });

  useEffectSyncDeepEqualWithDispatch(idList, dispatch);

  const {
    currentState: deletedIdList,
    dispatchWithoutControl: dispatchDeletedList,
  } = useGlobalDispatchAndListener<U[]>({
    contextKey: getNameSpacedKey(entityClass, KEY_TYPES.DELETED),
    listenerKey: masterListListenerKey,
    initialValue: ArrayPlaceholder,
  });

  const {
    dispatchWithoutControl: dispatchTransientIdList,
    currentState: transientIdList,
  } = useGlobalDispatchAndListener<U[]>({
    contextKey: getNameSpacedKey(entityClass, KEY_TYPES.ADDED),
    listenerKey: masterListListenerKey,
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
