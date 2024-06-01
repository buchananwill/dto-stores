export const Controller = "controller";

export const KEY_TYPES = {
  ADDED: "added",
  CHANGES: "changes",
  DELETED: "deleted",
  ID_LIST: "idList",
  MASTER_LIST: "masterList",
  MASTER_MAP: "masterMap",
} as const;
export const EmptyArray = [];
export const ObjectPlaceholder = {};
export const InitialMap = new Map<string, unknown>();
