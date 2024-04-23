import {Dispatch, SetStateAction, useEffect, useRef} from 'react';


export function useSyncSelectiveStateToProps<T>(
  propData: T,
  dispatch: Dispatch<SetStateAction<T>>,
  stateData: T,
  contextKey: string
) {
  const initialMapRef = useRef(propData);

  useEffect(() => {
    if (initialMapRef.current !== propData && (dispatch !== undefined)) {
      dispatch(propData);
      initialMapRef.current = propData;
    }
  }, [stateData, propData, contextKey, initialMapRef, dispatch]);
}
