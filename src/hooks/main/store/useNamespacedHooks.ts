import {
  useGlobalDispatch,
  useGlobalDispatchAndListener,
  useGlobalListener,
} from "selective-context";
import { getNameSpacedKey } from "../../../functions/name-space-keys/getNameSpacedKey";
import { ContextNamespace } from "../../../types";

function useDispatch<T>(entityClass: string, keyType: ContextNamespace) {
  return useGlobalDispatch<T>(getNameSpacedKey(entityClass, keyType))
    .dispatchWithoutListen;
}

function useListen<T>(
  entityClass: string,
  keyType: ContextNamespace,
  listenerKey: string,
  initialValue: T,
) {
  return useGlobalListener({
    contextKey: getNameSpacedKey(entityClass, keyType),
    listenerKey,
    initialValue,
  });
}

function useDispatchAndListen<T>(
  entityClass: string,
  keyType: ContextNamespace,
  listenerKey: string,
  initialValue: T,
) {
  return useGlobalDispatchAndListener({
    contextKey: getNameSpacedKey(entityClass, keyType),
    listenerKey,
    initialValue,
  });
}

// noinspection JSUnusedGlobalSymbols
export const NamespacedHooks = {
  useDispatch,
  useListen,
  useDispatchAndListen,
};
