import {
  ArrayPlaceholder,
  useGlobalController,
  useGlobalDispatch,
  useGlobalDispatchAndListener,
} from "selective-context";

import { useEffect } from "react";
import { getDeletedContextKey } from "../functions/name-space-keys/getDeletedContextKey";
import { getAddedContextKey } from "../functions/name-space-keys/getAddedContextKey";
import { getMasterListContextKey } from "../functions/name-space-keys/getMasterListContextKey";
import { HasId, HasIdClass } from "../types";

const listenerKey = "masterListController";

export function useMasterListController<
  T extends HasIdClass<U>,
  U extends string | number,
>(collectionData: T[], entityName: string) {
  const { currentState: masterList, dispatch } = useGlobalController({
    contextKey: getMasterListContextKey(entityName),
    listenerKey: listenerKey,
    initialValue: collectionData,
  });

  const {
    currentState: deletedIdList,
    dispatchWithoutControl: dispatchDeleted,
  } = useGlobalDispatchAndListener<U[]>({
    contextKey: getDeletedContextKey(entityName),
    listenerKey: listenerKey,
    initialValue: ArrayPlaceholder,
  });

  const { dispatchWithoutControl, currentState: transientIdList } =
    useGlobalDispatchAndListener<U[]>({
      contextKey: getAddedContextKey(entityName),
      listenerKey: listenerKey,
      initialValue: ArrayPlaceholder,
    });

  useEffect(() => {
    const transientAndDeleted = deletedIdList.filter((id) =>
      transientIdList.includes(id),
    );
    if (transientAndDeleted.length > 0) {
      dispatch((list) =>
        list.filter((item) => !transientAndDeleted.includes(item.id)),
      );
      dispatchDeleted((list) =>
        list.filter((id) => !transientAndDeleted.includes(id)),
      );
      dispatchWithoutControl((list) =>
        list.filter((id) => !deletedIdList.includes(id)),
      );
    }
  }, [
    deletedIdList,
    dispatch,
    dispatchWithoutControl,
    dispatchDeleted,
    transientIdList,
  ]);
  return { masterList, dispatch, dispatchWithoutControl };
}
