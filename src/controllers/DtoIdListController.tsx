'use client';

import React, {useMemo} from "react";
import {useSelectiveContextGlobalController, useSelectiveContextListenerReadAll} from "selective-context";
import {SelectiveContextGlobal} from "selective-context/dist/creators/selectiveContextCreatorGlobal";
import {getEntityNamespaceContextKey} from "../functions/getEntityNamespaceContextKey";
import {useSyncSelectiveStateToProps} from "../hooks/useSyncSelectiveStateToProps";
import {DtoListControllerProps, EmptyArray} from "../types";
import {getChangesContextKey} from "../functions/getChangesContextKey";
import {getDeletedContextKey} from "../functions/getDeletedContextKey";
import {getIdListContextKey} from "../functions/getIdListContextKey";
import {getAddedContextKey} from "../functions/getAddedContextKey";

export function DtoIdListController({
  entityName,
  dtoList,
  updateServerAction,
  deleteServerAction,
    postServerAction,
    unsavedChangesComponent: UnsavedChanges
}: DtoListControllerProps<any>) {
  const idListArray = useMemo(() => {
    return dtoList.map((dto) => dto.id);
  }, [dtoList]);

  const { currentState, dispatch } = useSelectiveContextGlobalController({
    contextKey: getIdListContextKey(entityName),
    listenerKey: listenerKey,
    initialValue: idListArray
  });

  const { currentState: changedDtos } = useSelectiveContextGlobalController<
    (string | number)[]
  >({
    contextKey: getChangesContextKey(entityName),
    listenerKey: `${entityName}:listenerKey`,
    initialValue: EmptyArray
  });

  const { currentState: deletedDtos } = useSelectiveContextGlobalController<
    (string | number)[]
  >({
    contextKey: getDeletedContextKey(entityName),
    listenerKey: `${entityName}:listenerKey`,
    initialValue: EmptyArray
  });

  const { currentState: transientDtoIdList } = useSelectiveContextGlobalController<
    (string | number)[]
  >({
    contextKey: getAddedContextKey(entityName),
    listenerKey: `${entityName}:listenerKey`,
    initialValue: EmptyArray
  });

  const selectiveContextReadAll = useSelectiveContextListenerReadAll(
    SelectiveContextGlobal
  );



  async function handleCommit() {
    if ((updateServerAction) === undefined) {
      console.error('No server update action defined');
    } else {
      const set = new Set<string | number>();
      changedDtos.forEach((key) => set.add(key));
      const keyArray: (string | number)[] = [];
      set.forEach((element) => keyArray.push(element));
      const updatedEntities = keyArray
          .map((id) =>
              selectiveContextReadAll(getEntityNamespaceContextKey(entityName, id))
          )
          .filter(item => item !== undefined);
      // const entityList = Object.values(currentModels as StringMap<T>);
      console.log(updatedEntities);
      updateServerAction(updatedEntities);
    }

    if ((deleteServerAction) === undefined) {
      console.error('No server delete action defined');
    } else {
      deleteServerAction(deletedDtos);
    }

    if (postServerAction === undefined) {
      console.error('No server post action defined')
    } else {
      const transientDtoList = transientDtoIdList .map((id) =>
          selectiveContextReadAll(getEntityNamespaceContextKey(entityName, id))
      ).filter(item => item !== undefined);
      postServerAction(transientDtoList)
    }

  }

  useSyncSelectiveStateToProps(
    idListArray,
    dispatch,
    currentState,
    getIdListContextKey(entityName)
  );
  return (
      UnsavedChanges &&
  <UnsavedChanges
      unsavedFlag={changedDtos.length > 0 || deletedDtos.length > 0}
      handleCommit={handleCommit}
  />

  );
}

const listenerKey = 'listController';

