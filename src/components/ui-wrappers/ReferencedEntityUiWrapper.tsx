import { DtoUiComponentLazy, Entity } from "../../types";
import { useReferencedEntity } from "../../hooks/main";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { useDtoStoreDelete } from "../../hooks/main";

export function ReferencedEntityUiWrapper<T extends Entity>({
  renderAs: Component,
  id,
  entityClass,
  whileLoading: Loading,
}: {
  renderAs: DtoUiComponentLazy<T>;
  id: string | number;
  entityClass: string;
  whileLoading: () => ReactNode;
}) {
  const listenerKey = `${entityClass}:${id}:ui-wrapper`;
  const { currentState, dispatchWithoutControl } = useReferencedEntity<T>(
    id,
    entityClass,
    listenerKey,
  );

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
}
