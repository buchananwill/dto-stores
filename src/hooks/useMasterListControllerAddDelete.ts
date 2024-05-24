import {
  ArrayPlaceholder,
  useGlobalController,
  useGlobalDispatchAndListener,
} from "selective-context";

import { useEffect, useRef } from "react";
import { getDeletedContextKey } from "../functions/name-space-keys/getDeletedContextKey";
import { getAddedContextKey } from "../functions/name-space-keys/getAddedContextKey";
import { getMasterListContextKey } from "../functions/name-space-keys/getMasterListContextKey";
import { HasIdClass } from "../types";
import { Controller } from "../literals";

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
      contextKey: getMasterListContextKey(entityClass),
      listenerKey: Controller,
      initialValue: entityList,
    });

  const {
    currentState: deletedIdList,
    dispatchWithoutControl: dispatchDeletedList,
  } = useGlobalDispatchAndListener<U[]>({
    contextKey: getDeletedContextKey(entityClass),
    listenerKey: masterListListenerKey,
    initialValue: ArrayPlaceholder,
  });

  const {
    dispatchWithoutControl: dispatchTransientIdList,
    currentState: transientIdList,
  } = useGlobalDispatchAndListener<U[]>({
    contextKey: getAddedContextKey(entityClass),
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
