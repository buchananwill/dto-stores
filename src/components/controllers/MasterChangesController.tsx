"use client";
import { ChangesCallbackMap, UnsavedChangesToast } from "../../types";
import { useGlobalController } from "selective-context";
import React, { useCallback } from "react";
import { InitialMap } from "../../literals";

export function MasterChangesController({
  unsavedChangesToast: UnsavedChanges,
}: {
  unsavedChangesToast: UnsavedChangesToast;
}) {
  const { currentState } = useGlobalController<ChangesCallbackMap>({
    contextKey: "unsavedChanges",
    listenerKey: "controller",
    initialValue: InitialMap as Map<string, never>,
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
