import { Entity, Identifier, BaseLazyDtoUiProps } from "../../../types";

import React, { FC, memo, ReactNode, useCallback } from "react";
import { useLazyDtoStore } from "../store/useLazyDtoStore";

export function useLazyDtoComponent<T extends Entity, Props>(
  Component: FC<BaseLazyDtoUiProps<T> & Props>,
  entityClass: string,
  Loading: () => ReactNode,
): FC<Entity & Props> {
  return useCallback(
    ({ id, ...props }: { id: Identifier } & Props) => {
      const listenerKey = `${entityClass}:${id}:ui-wrapper`;
      const { entity, dispatchWithoutControl } = useLazyDtoStore<T>(
        id,
        entityClass,
        listenerKey,
      );

      if (entity === undefined || dispatchWithoutControl === undefined) {
        return <Loading />;
      } else {
        const finalProps = {
          ...props,
          entity,
          dispatchWithoutControl,
          entityClass,
        } as Props & React.JSX.IntrinsicAttributes & BaseLazyDtoUiProps<T>;
        return <Component {...finalProps} />;
      }
    },
    [entityClass],
  );
}
