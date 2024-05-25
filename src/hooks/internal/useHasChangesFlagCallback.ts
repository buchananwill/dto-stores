import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
} from "react";

export function useHasChangesFlagCallback(
  handleCommit: { (): Promise<void> },
  hasChanges: boolean,
  dispatchUnsavedFlag: Dispatch<
    SetStateAction<Map<string, MutableRefObject<() => Promise<void>>>>
  >,
  entityClass: string,
) {
  const apiCallbackRef = useRef(handleCommit);
  apiCallbackRef.current = handleCommit;
  const hasChangesRef = useRef(false);

  useEffect(() => {
    if (hasChanges && !hasChangesRef.current) {
      dispatchUnsavedFlag((callbackMap) => {
        const updatedMap = new Map([...callbackMap.entries()]);
        updatedMap.set(entityClass, apiCallbackRef);
        return updatedMap;
      });
      hasChangesRef.current = hasChanges;
    } else if (!hasChanges && hasChangesRef.current) {
      dispatchUnsavedFlag((callbackMap) => {
        const updatedMap = new Map([...callbackMap.entries()]);
        updatedMap.delete(entityClass);
        return updatedMap;
      });
      hasChangesRef.current = hasChanges;
    }
  }, [apiCallbackRef, hasChangesRef, hasChanges]);
}
