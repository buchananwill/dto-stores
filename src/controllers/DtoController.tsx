"use client";

import { useEffect, useRef } from "react";
import { isEqual } from "lodash";

import {
  DtoControllerProps,
  EmptyArray,
  HasNumberIdDto,
  HasUuidDto,
} from "../types";
import { useDtoStoreController } from "../hooks/useDtoStoreController";
import { getChangesContextKey } from "../functions/name-space-keys/getChangesContextKey";
import { useGlobalDispatch } from "selective-context";

export function DtoController<T extends HasNumberIdDto | HasUuidDto>({
  dto,
  entityClass,
}: DtoControllerProps<T>) {
  const { currentState } = useDtoStoreController(dto, entityClass);
  const initialDtoRef = useRef<T>(dto);

  const { dispatchWithoutListen } = useGlobalDispatch<(string | number)[]>(
    getChangesContextKey(entityClass),
  );

  useEffect(() => {
    const entityChanged = !isEqual(initialDtoRef.current, currentState);

    dispatchWithoutListen((state) => {
      const previouslyChanged = state.includes(dto.id);
      if (previouslyChanged && !entityChanged) {
        return state.filter((id) => id != dto.id);
      } else if (!previouslyChanged && entityChanged) {
        return [...state, dto.id];
      } else return state;
    });
  }, [currentState, dispatchWithoutListen, dto.id]);

  return null;
}
