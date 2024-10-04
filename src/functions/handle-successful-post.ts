import { DispatchState, Entity, Identifier } from "../types";

export function handleSuccessfulPost<T extends Entity>(
  response: T[],
  dispatchMasterList: DispatchState<T[]>,
) {
  const idToEntityMap = response.reduce(
    (prev, curr) => prev.set(curr.id, curr),
    new Map<Identifier, T>(),
  );
  dispatchMasterList((prevList) => {
    const filterAndReplaceFromMap = prevList
      .filter((entity) => !entityIsTransient(entity))
      .map((entity) => {
        const maybeEntity = idToEntityMap.get(entity.id);
        if (maybeEntity) {
          idToEntityMap.delete(entity.id);
          return maybeEntity;
        } else return entity;
      });
    return [...filterAndReplaceFromMap, ...idToEntityMap.values()];
  });
}

function entityIsTransient(entity: Entity) {
  return typeof entity.id === "number" && entity.id < 0;
}
