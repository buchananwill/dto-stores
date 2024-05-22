"use client";

import { useGlobalController } from "selective-context";
import { IdListControllerProps } from "../types";
import { getIdListContextKey } from "../functions/name-space-keys/getIdListContextKey";
import React from "react";

function idListController({
  entityClass,
  idList,
}: IdListControllerProps<any, any>) {
  useGlobalController({
    contextKey: getIdListContextKey(entityClass),
    listenerKey: listenerKey,
    initialValue: idList,
  });

  return null;
}

const listenerKey = "controller";

export const IdListController = React.memo(idListController);
