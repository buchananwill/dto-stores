import { useRef } from "react";

export function useUuidListenerKeyFallback(listenerKey?: string) {
  return useRef(listenerKey ?? crypto.randomUUID());
}
