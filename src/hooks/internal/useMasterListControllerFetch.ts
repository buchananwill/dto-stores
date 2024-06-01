"use client";

import { useCallback, useEffect, useRef } from "react";
import { ArrayPlaceholder, useGlobalController } from "selective-context";
import { DataFetchingProps, HasIdClass } from "../../types";
import { Controller, KEY_TYPES } from "../../literals";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { isNotUndefined } from "../../functions/isNotUndefined";
import { isNull, isNumber } from "lodash";

export function useMasterListFetchController<T extends HasIdClass<U>, U>({
  entityClass,
  idList,
  getServerAction,
}: DataFetchingProps<T, U>) {
  const { currentState: stateIdList } = useGlobalController({
    contextKey: getNameSpacedKey(entityClass, KEY_TYPES.ID_LIST),
    listenerKey: Controller,
    initialValue: idList,
  });

  const { currentState: masterList, dispatch: dispatchMasterList } =
    useGlobalController({
      contextKey: getNameSpacedKey(entityClass, KEY_TYPES.MASTER_LIST),
      listenerKey: Controller,
      initialValue: ArrayPlaceholder as T[],
    });

  const idListRef = useRef([] as U[]);
  const isLoading = useRef(false);

  const fetchNewEntities = useCallback(
    async (newIdSet: Set<U>) => {
      isLoading.current = true;
      try {
        const newIdList = [...newIdSet.values()].filter((id) => {
          const isDefined = isNotUndefined(id) && !isNull(id);
          if (isNumber(id)) return !isNaN(id);
          else return isDefined;
        });
        if (newIdList.length !== 0) {
          const newItems = await getServerAction(
            [...newIdSet.values()].filter(
              (id) => isNotUndefined(id) && !isNull(id),
            ),
          );
          dispatchMasterList((list) => [...list, ...newItems]);
        }
      } finally {
        isLoading.current = false;
      }
    },
    [getServerAction],
  );

  useEffect(() => {
    // make id set from list, and list ref,
    const stateIdSet = new Set<U>(stateIdList);
    const refIdSet = new Set(idListRef.current);
    const newIdSet = new Set<U>();

    // see if any new ids were added...
    for (const newId of stateIdSet) {
      if (!refIdSet.has(newId)) {
        newIdSet.add(newId);
      }
    }

    // see if any ids are no longer present...
    const notListenedIdSet = new Set<U>();
    for (const id of refIdSet) {
      if (!stateIdSet.has(id)) notListenedIdSet.add(id);
    }

    // ...remove them from the state
    if (notListenedIdSet.size > 0)
      dispatchMasterList((entities) =>
        entities.filter((entity) => !notListenedIdSet.has(entity.id)),
      );

    // ...fetch entities according to id list,
    if (newIdSet.size > 0 && !isLoading.current) {
      fetchNewEntities(newIdSet);
    }

    // ...and update the ref
    idListRef.current = stateIdList;
  }, [stateIdList, getServerAction]);

  return { masterList };
}
