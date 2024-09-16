import React, {
  Dispatch,
  FC,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from "react";
import { SelectiveContextReadAll } from "selective-context/dist/types";
import { KEY_TYPES } from "./literals";

// Convenience Types
export type Identifier = string | number;

export interface Entity {
  id: Identifier;
}

export interface HasIdClass<U extends Identifier> {
  id: U;
}

export interface DtoComponentProps {
  entityId: Identifier;
}

// Data control types
export interface DtoControllerProps<T extends Entity> {
  dto: T;
  entityClass: string;
  mergeInitialWithProp?: boolean;
}

export type DtoControllerArrayProps<T extends Entity> = Omit<
  DtoControllerProps<T>,
  "dto"
> & {
  dtoList: T[];
};

export type DataFetchingProps<
  T extends HasIdClass<U>,
  U extends Identifier,
> = Pick<DtoControllerProps<T>, "mergeInitialWithProp" | "entityClass"> & {
  idList: U[];
  getServerAction: (idList: U[]) => Promise<T[]>;
};

export interface TrackChangesProps<
  T extends HasIdClass<U>,
  U extends Identifier,
> {
  entityClass: string;
  dispatchMasterList: DispatchList<T>;
  dispatchIdList: DispatchList<U>;
  updateServerAction?: CommitServerAction<T>;
  deleteServerAction?: CommitServerAction<U>;
  postServerAction?: CommitServerAction<T>;
}

export interface ChangesTracker<U extends Identifier> {
  changedDtos: U[];
  dispatchChangesList: Dispatch<SetStateAction<U[]>>;
  deletedDtos: U[];
  dispatchDeletionList: Dispatch<SetStateAction<U[]>>;
  transientDtoIdList: U[];
  dispatchTransientList: Dispatch<SetStateAction<U[]>>;
  dispatchUnsavedFlag: Dispatch<
    SetStateAction<Map<string, MutableRefObject<() => Promise<void>>>>
  >;
}

export type CommitChangesCallbackParams<
  T extends HasIdClass<U>,
  U extends string | number,
> = TrackChangesProps<T, U> &
  ChangesTracker<U> & {
    selectiveContextReadAll: SelectiveContextReadAll<T>;
    dispatchMasterList: DispatchList<HasIdClass<U>>;
    dispatchIdList: DispatchList<U>;
  };

export type CommitEditCallbackParams<
  T extends HasIdClass<U>,
  U extends string | number,
> = Pick<
  CommitChangesCallbackParams<T, U>,
  | "changedDtos"
  | "entityClass"
  | "updateServerAction"
  | "selectiveContextReadAll"
  | "dispatchChangesList"
>;

export type DispatchList<T> = React.Dispatch<React.SetStateAction<T[]>>;

export type ChangesCallbackMap = Map<
  string,
  MutableRefObject<() => Promise<void>>
>;

export type CommitServerAction<T> = (commitList: T[]) => Promise<unknown>;

export type PrimaryDtoControllerArrayProps<
  T extends HasIdClass<U>,
  U extends Identifier,
> = Omit<TrackChangesProps<T, U>, "dispatchMasterList" | "dispatchIdList"> &
  DtoControllerArrayProps<T>;

export type EditControllerProps<
  T extends HasIdClass<U>,
  U extends Identifier,
> = Pick<TrackChangesProps<T, U>, "entityClass" | "updateServerAction">;
export type ContextNamespace = (typeof KEY_TYPES)[keyof typeof KEY_TYPES];

// Data Access Types

export interface DtoStoreParams {
  entityId: Identifier;
  entityClass: string;
  listenerKey?: string;
}

export interface DtoStoreReturn<T> {
  entity: T;
  deleted: boolean;
  dispatchDeletion: React.Dispatch<React.SetStateAction<Identifier[]>>;
  dispatchWithoutControl: React.Dispatch<React.SetStateAction<T>>;
}

export type LazyDtoStoreReturn<T> = Partial<
  Pick<DtoStoreReturn<T | undefined>, "entity" | "dispatchWithoutControl">
>;

// UI Types

export interface BaseDtoUiProps<T extends Entity> extends PropsWithChildren {
  entity: T;
  entityClass: string;
  dispatchWithoutControl?: Dispatch<SetStateAction<T>>;
  deleted: boolean;
  dispatchDeletion?: Dispatch<SetStateAction<Identifier[]>>;
}

export type DtoUiProps<T extends Entity, Props> = BaseDtoUiProps<T> &
  Exclude<Props, BaseDtoUiProps<T>>;

export type DtoUi<T extends Entity, Props> = FC<DtoUiProps<T, Props>>;

export type DtoUiWrapperProps<T extends Entity, Props> = {
  entityClass: string;
  entityId: string | number;
  renderAs: DtoUi<T, Props>;
} & Exclude<Props, BaseDtoUiProps<T>>;

export type DtoUiArrayProps<T extends Entity, Props> = Pick<
  DtoUiWrapperProps<T, Props>,
  "entityClass" | "renderAs"
> &
  Exclude<Props, BaseDtoUiProps<T>>;

export type BaseLazyDtoUiProps<T extends Entity> = Pick<
  BaseDtoUiProps<T>,
  "entity" | "entityClass" | "dispatchWithoutControl" | "children"
>;

export type LazyDtoUiProps<T extends Entity, Props> = BaseLazyDtoUiProps<T> &
  Exclude<Props, BaseLazyDtoUiProps<T>>;

export type LazyDtoUi<T extends Entity, Props> = FC<
  BaseLazyDtoUiProps<T> & Exclude<Props, BaseLazyDtoUiProps<T>>
>;

export type LazyDtoUiWrapperProps<T extends Entity, Props> = {
  renderAs: LazyDtoUi<T, Props>;
  entityId: string | number;
  entityClass: string;
  whileLoading: () => ReactNode;
} & Exclude<Props, BaseLazyDtoUiProps<T>>;

export type LazyDtoUiArrayProps<T extends Entity, Props> = Pick<
  LazyDtoUiWrapperProps<T, Props>,
  "renderAs" | "whileLoading" | "entityClass"
> &
  Exclude<Props, BaseLazyDtoUiProps<T>>;

export type UnsavedChangesToast = FC<UnsavedChangesProps>;

export interface UnsavedChangesProps {
  unsavedFlag: boolean;
  handleCommit: () => void;
}

export type DtoUiWrapperListSomeProps<
  T extends Entity,
  Props,
> = DtoUiArrayProps<T, Props> & { entityIdList: Identifier[] };
