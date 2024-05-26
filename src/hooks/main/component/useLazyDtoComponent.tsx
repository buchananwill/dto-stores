import { Entity, LazyDtoUiComponent } from "../../../types";
import { useDtoStoreDelete, useLazyDtoDispatchAndListen } from "../index";
import React, {
  Dispatch,
  memo,
  ReactNode,
  SetStateAction,
  useCallback,
} from "react";

export function useLazyDtoComponent<T extends Entity>(
  Component: LazyDtoUiComponent<T>,
  entityClass: string,
  Loading: () => ReactNode,
) {
  return useCallback(
    memo(({ id }: { id: string | number }) => {
      const listenerKey = `${entityClass}:${id}:ui-wrapper`;
      const { currentState, dispatchWithoutControl } =
        useLazyDtoDispatchAndListen<T>(id, entityClass, listenerKey);

      const deletionProps = useDtoStoreDelete(entityClass, id, listenerKey);

      if (currentState === undefined) {
        return <Loading />;
      } else {
        return (
          <Component
            entity={currentState}
            entityClass={entityClass}
            {...deletionProps}
            dispatchWithoutControl={
              // cast the dispatch because we already handled the undefined case.
              dispatchWithoutControl as Dispatch<SetStateAction<T>>
            }
          />
        );
      }
    }),
    [entityClass],
  );
}
