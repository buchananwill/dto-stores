'use client';

import {ReactNode, useMemo} from "react";
import {useSelectiveContextGlobalController, useSelectiveContextListenerReadAll} from "selective-context";
import {EmptyArray} from "./dto-controller";
import {SelectiveContextGlobal} from "selective-context/dist/creators/selectiveContextCreatorGlobal";
import {getEntityNamespaceContextKey} from "./get-entity-namespace-context-key";
import {HasId} from "./dto-controller-array";
import {useSyncSelectiveStateToProps} from "./use-sync-selective-state-to-props";

export default function DtoIdListController({
  entityName,
  dtoList,
  updateServerAction,
  deleteServerAction,
    unsavedChangesComponent: UnsavedChanges
}: DtoListControllerProps<any>) {
  const idListArray = useMemo(() => {
    return dtoList.map((dto) => dto.id);
  }, [dtoList]);

  const { currentState, dispatchUpdate } = useSelectiveContextGlobalController({
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

  const selectiveContextReadAll = useSelectiveContextListenerReadAll(
    SelectiveContextGlobal
  );



  async function handleCommit() {
    if ((updateServerAction) === undefined) {
      console.error('No server action defined');
      return;
    }
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
    if ((deleteServerAction) !== undefined) deleteServerAction(deletedDtos);

  }

  useSyncSelectiveStateToProps(
    idListArray,
    dispatchUpdate,
    currentState,
    getIdListContextKey(entityName)
  );
  return (
    <UnsavedChanges
      unsavedFlag={changedDtos.length > 0 || deletedDtos.length > 0}
      handleCommit={handleCommit}
    />
  );
}

export interface DtoListControllerProps<T extends HasId> {
  dtoList: T[];
  entityName: string;
  updateServerAction?: (entityList: T[]) => Promise<T[]>;
  deleteServerAction?: (idList: any[]) => Promise<any[]>;
  unsavedChangesComponent?: (props: UnsavedChangesProps) => ReactNode
}

export interface UnsavedChangesProps {
  unsavedFlag: boolean,
  handleCommit: () => void
}

export function getNameSpacedKey(entityName: string, keyType: string) {
  return `${entityName}:${keyType}`;
}

export function getIdListContextKey(entityName: string) {
  return getNameSpacedKey(entityName, 'idList');
}

const listenerKey = 'listController';

export function getChangesContextKey(entityName: string) {
  return getNameSpacedKey(entityName, 'changes');
}

export function getDeletedContextKey(entityName: string) {
  return getNameSpacedKey(entityName, 'deleted');
}
