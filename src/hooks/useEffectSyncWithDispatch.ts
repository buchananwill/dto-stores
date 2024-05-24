import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export function useEffectSyncWithDispatch<T>(
  currentData: T,
  dispatch: Dispatch<SetStateAction<T>>,
) {
  const initialDataRef = useRef(currentData);

  useEffect(() => {
    if (initialDataRef.current !== currentData && dispatch !== undefined) {
      dispatch(currentData);
      initialDataRef.current = currentData;
    }
  }, [currentData, initialDataRef, dispatch]);
}
