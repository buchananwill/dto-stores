"use client";

import { useEffect, useRef } from "react";
import { isEqual } from "lodash";

import { DtoControllerProps, Entity } from "../../types";
import { useDtoStoreController } from "../../hooks/internal/useDtoStoreController";
import { useGlobalDispatch } from "selective-context";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
import { KEY_TYPES } from "../../literals";

export function DtoController<T extends Entity>({
  dto,
  entityClass,
}: DtoControllerProps<T>) {
  const { currentState } = useDtoStoreController(dto, entityClass);
  const initialDtoRef = useRef<T>(dto);

  const { dispatchWithoutListen } = useGlobalDispatch<(string | number)[]>(
    getNameSpacedKey(entityClass, KEY_TYPES.CHANGES),
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
