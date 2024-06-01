import { useRef } from "react";

export function useUuidListenerKeyFallback(listenerKey: undefined | string) {
  return useRef(listenerKey ?? crypto.randomUUID());
}
