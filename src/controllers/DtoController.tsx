'use client';

import {useEffect, useRef} from 'react';
import {isEqual} from 'lodash';
import {useSelectiveContextGlobalDispatch} from "selective-context";
import {DtoControllerProps, EmptyArray, HasNumberIdDto, HasUuidDto} from "../types";
import {useDtoStoreController} from "../hooks/useDtoStoreController";
import {getChangesContextKey} from "../functions/getChangesContextKey";

export function DtoController<T extends HasNumberIdDto | HasUuidDto>({
  dto,
  entityName
}: DtoControllerProps<T>) {
  const { currentState } = useDtoStoreController(dto, entityName);
  const initialDtoRef = useRef<T>(dto);

  const { dispatchWithoutControl } = useSelectiveContextGlobalDispatch<
    (string | number)[]
  >({
    contextKey: getChangesContextKey(entityName),
    listenerKey: `controller:${dto.id}`,
    initialValue: EmptyArray
  });

  useEffect(() => {
    const entityChanged = !isEqual(initialDtoRef.current, currentState);

    dispatchWithoutControl((state) => {
      const previouslyChanged = state.includes(dto.id);
      if (previouslyChanged && !entityChanged) {
        return state.filter((id) => id != dto.id);
      } else if (!previouslyChanged && entityChanged) {
        return [...state, dto.id];
      } else return state;
    });
  }, [currentState, dispatchWithoutControl, dto.id]);

  return null;
}
