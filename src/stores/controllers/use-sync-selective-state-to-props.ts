import { Dispatch, useEffect, useRef } from 'react';
import {UpdateAction} from "selective-context/dist/types";


export function useSyncSelectiveStateToProps<T>(
  propData: T,
  dispatch: Dispatch<UpdateAction<T>>,
  stateData: T,
  contextKey: string
) {
  const initialMapRef = useRef(propData);

  useEffect(() => {
    if (initialMapRef.current !== propData && (dispatch !== undefined)) {
      dispatch({ contextKey, update: propData });
      initialMapRef.current = propData;
    }
  }, [stateData, propData, contextKey, initialMapRef, dispatch]);
}
