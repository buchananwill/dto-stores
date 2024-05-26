import { useGlobalDispatch, useGlobalListenerGroup } from "selective-context";
import { EmptyArray, Entity } from "../../../types";
import { useEffect, useMemo } from "react";

const initialMap = new Map<string, unknown>();

export function useLazyDtoListListener<T extends Entity>(
  idList: (string | number)[],
  entityClass: string,
  listenerKey: string,
) {
  const { dispatchWithoutListen } = useGlobalDispatch(`${entityClass}:idList`);

  const referencedIdContextKeys = useMemo(
    () => idList.map((id) => `${entityClass}:${id}`) ?? EmptyArray,
    [idList],
  );

  const { currentState } = useGlobalListenerGroup({
    contextKeys: referencedIdContextKeys,
    listenerKey,
    initialValue: initialMap as Map<string, T>,
  });

  useEffect(() => {
    dispatchWithoutListen((list: (string | number)[]) => [...list, ...idList]);
    return () => {
      dispatchWithoutListen((list: (string | number)[]) => {
        let newList = [...list];
        for (let idListElement of idList) {
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
