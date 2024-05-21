import { useGlobalDispatch } from "selective-context";
import { useDtoStoreDispatch } from "./useDtoStoreDispatch";
import { HasId } from "../types";
import { useEffect } from "react";

export function useReferencedEntity<T extends HasId>(
  entityClass: string,
  id: string | number,
  listenerKey: string,
) {
  const { dispatchWithoutListen } = useGlobalDispatch(`${entityClass}:idList`);

  const { currentState, dispatchWithoutControl } = useDtoStoreDispatch<
    T | undefined
  >(id, entityClass, listenerKey);

  useEffect(() => {
    dispatchWithoutListen((list: (string | number)[]) => [...list, id]);
    return () => {
      dispatchWithoutListen((list: (string | number)[]) => {
        const indexFirst = list.findIndex((item) => item === id);
        if (indexFirst >= 0) return list.slice().splice(indexFirst, 1);
        else return list;
      });
    };
  }, [dispatchWithoutListen, id]);

  return { currentState, dispatchWithoutControl };
}
