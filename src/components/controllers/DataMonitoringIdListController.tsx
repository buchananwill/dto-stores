"use client";

import { useGlobalController } from "selective-context";
import { IdListControllerProps } from "../../types";
import { getIdListContextKey } from "../../functions/name-space-keys/getIdListContextKey";
import React, { useMemo } from "react";

import { useEffectSyncDeepEqualWithDispatch } from "../../hooks/useEffectSyncDeepEqualWithDispatch";

function Controller({ entityClass, entityList }: IdListControllerProps<any>) {
  const idList = useMemo(() => {
    return entityList.map((dto) => dto.id);
  }, [entityList]);

  const { dispatch } = useGlobalController({
    contextKey: getIdListContextKey(entityClass),
    listenerKey,
    initialValue: idList,
  });

  useEffectSyncDeepEqualWithDispatch(idList, dispatch);

  return null;
}

const listenerKey = "controller";

export const DataMonitoringIdListController = React.memo(Controller);
