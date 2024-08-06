import { Controller } from "../../literals";

export function getControllerListenerKey(masterListContext: string) {
  return `${masterListContext}${Controller}`;
}
