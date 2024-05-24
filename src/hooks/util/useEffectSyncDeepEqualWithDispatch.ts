import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { isEqual } from "lodash";

export function useEffectSyncDeepEqualWithDispatch<T>(
  currentData: T,
  dispatch: Dispatch<SetStateAction<T>>,
) {
  const initialDataRef = useRef(currentData);

  useEffect(() => {
    if (
      !isEqual(initialDataRef.current, currentData) &&
      dispatch !== undefined
    ) {
      dispatch(currentData);
      initialDataRef.current = currentData;
    }
  }, [currentData, initialDataRef, dispatch]);
}
