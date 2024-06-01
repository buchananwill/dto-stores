import { useGlobalDispatch, useGlobalListenerGroup } from "selective-context";
import { Entity } from "../../../types";
import { useEffect, useMemo, useRef } from "react";
import { EmptyArray, InitialMap, KEY_TYPES } from "../../../literals";
import { NamespacedHooks } from "./useNamespacedHooks";

export function useLazyDtoListListener<T extends Entity>(
  idList: (string | number)[],
  entityClass: string,
  listenerKey?: string,
) {
  const listenerKeyRef = useRef(listenerKey ?? crypto.randomUUID());
  NamespacedHooks.useDispatch(entityClass, KEY_TYPES.ID_LIST);
  const { dispatchWithoutListen } = useGlobalDispatch(`${entityClass}:idList`);

  const referencedIdContextKeys = useMemo(
    () => idList.map((id) => `${entityClass}:${id}`) ?? EmptyArray,
    [idList],
  );

  const { currentState } = useGlobalListenerGroup({
    contextKeys: referencedIdContextKeys,
    listenerKey: listenerKeyRef.current,
    initialValue: InitialMap as Map<string, T>,
  });

  useEffect(() => {
    dispatchWithoutListen((list: (string | number)[]) => [...list, ...idList]);
    return () => {
      dispatchWithoutListen((list: (string | number)[]) => {
        let newList = [...list];
        for (const idListElement of idList) {
          const indexFirst = list.findIndex((item) => item === idListElement);
          if (indexFirst >= 0) newList = list.slice().splice(indexFirst, 1);
        }
        if (newList.length < list.length) return newList;
        else return list;
      });
    };
  }, [dispatchWithoutListen, idList]);

  return { currentState };
}
