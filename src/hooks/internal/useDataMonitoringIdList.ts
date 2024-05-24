"use client";

import { useGlobalController } from "selective-context";
import { IdListControllerProps } from "../../types";
import { useMemo } from "react";

import { useEffectSyncDeepEqualWithDispatch } from "../util";
import { Controller, KEY_TYPES } from "../../literals";
import { getNameSpacedKey } from "../../functions/name-space-keys/getNameSpacedKey";
