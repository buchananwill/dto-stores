import { ChangesCallbackMap, UnsavedChangesToast } from "../types";
import { useGlobalController } from "selective-context";
import React, { useCallback } from "react";

const unsavedCallbackMap = new Map();

export function MasterChangesController({
  unsavedChangesToast: UnsavedChanges,
}: {
  unsavedChangesToast: UnsavedChangesToast;
}) {
  let { currentState } = useGlobalController<ChangesCallbackMap>({
    contextKey: "unsavedChanges",
    listenerKey: "controller",
    initialValue: unsavedCallbackMap,
  });

  const handleCommit = useCallback(() => {
    [...currentState.values()].forEach((value) => value.current());
  }, [currentState]);

  return (
    <UnsavedChanges
      unsavedFlag={currentState.size > 0}
      handleCommit={handleCommit}
    />
  );
}
