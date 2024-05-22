"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalController } from "selective-context";
import { HasId, HasIdClass, IdListControllerProps } from "../types";
import { getIdListContextKey } from "../functions/name-space-keys/getIdListContextKey";
import { DtoControllerArray } from "./DtoControllerArray";

export function IdListDataFetchingController<T extends HasIdClass<U>, U>({
  entityClass,
  idList,
  getServerAction,
}: IdListControllerProps<T, U> & {
  getServerAction: (idList: U[]) => Promise<T[]>;
}) {
  const { currentState: stateIdList, dispatch } = useGlobalController({
    contextKey: getIdListContextKey(entityClass),
    listenerKey: listenerKey,
    initialValue: idList,
  });
  const [entitiesFromDb, setEntitiesFromDb] = useState<T[]>([]);
  const idListRef = useRef([] as U[]);
  const isLoading = useRef(false);

  const fetchNewEntities = useCallback(
    async (newIdSet: Set<U>) => {
      isLoading.current = true;
      try {
        let newItems = await getServerAction([...newIdSet.values()]);
        console.log(newItems);
        setEntitiesFromDb((list) => [...list, ...newItems]);
      } finally {
        isLoading.current = false;
      }
    },
    [getServerAction],
  );

  useEffect(() => {
    console.log(idListRef, stateIdList);
    // make id set from list, and list ref,
    const stateIdSet = new Set<U>(stateIdList);
    const refIdSet = new Set(idListRef.current);
    const newIdSet = new Set<U>();

    // see if any new ids were added...
    for (let newId of stateIdSet) {
      if (!refIdSet.has(newId)) {
        newIdSet.add(newId);
      }
    }

    // see if any ids are no longer present...
    const notListenedIdSet = new Set<U>();
    for (let id of refIdSet) {
      if (!stateIdSet.has(id)) notListenedIdSet.add(id);
    }

    // ...remove them from the state
    if (notListenedIdSet.size > 0)
      setEntitiesFromDb((entities) =>
        entities.filter((entity) => !notListenedIdSet.has(entity.id)),
      );

    // ...fetch entities according to id list,
    if (newIdSet.size > 0 && !isLoading.current) {
      fetchNewEntities(newIdSet);
    }

    // ...and update the ref
    idListRef.current = stateIdList;
  }, [stateIdList, getServerAction]);

  return (
    <DtoControllerArray
      dtoList={entitiesFromDb as HasId[]}
      entityClass={entityClass}
    />
  );
}

const listenerKey = "controller";
