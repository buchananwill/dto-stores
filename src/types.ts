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

// Convenience Utilities
export type Identifier = string | number;

export interface Entity {
  id: Identifier;
}

export interface HasIdClass<U> {
  id: U;
}

// Data control types
export interface DtoControllerProps<T extends Entity> {
  dto: T;
  entityClass: string;
}

export interface DtoControllerArrayProps<T extends Entity> {
  dtoList: T[];
  entityClass: string;
}

export interface DataFetchingProps<T extends HasIdClass<U>, U> {
  idList: U[];
  entityClass: string;
  getServerAction: (idList: U[]) => Promise<T[]>;
}

export interface TrackChangesProps<T extends HasIdClass<U>, U> {
  entityClass: string;
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

export interface CommitServerAction<T> {
  (commitList: T[]): Promise<any>;
}

export type PrimaryDtoControllerArrayProps<
  T extends HasIdClass<U>,
  U extends Identifier,
> = TrackChangesProps<T, U> & DtoControllerArrayProps<T>;

export type EditControllerProps = Pick<
  TrackChangesProps<any, any>,
  "entityClass" | "updateServerAction"
>;
export type ContextNamespace = (typeof KEY_TYPES)[keyof typeof KEY_TYPES];

// Data Access Types

export interface DtoStoreParams {
  id: Identifier;
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

export interface DtoUiComponentProps<T extends Entity>
  extends PropsWithChildren {
  entity: T;
  entityClass: string;
  dispatchWithoutControl?: Dispatch<SetStateAction<T>>;
  deleted: boolean;
  dispatchDeletion?: Dispatch<SetStateAction<Identifier[]>>;
}

export type DtoUiComponent<T extends Entity, Props> = FC<
  DtoUiComponentProps<T> & Props
>;

export type DtoComponentWrapperProps<T extends Entity, Props> = {
  entityClass: string;
  id: string | number;
  renderAs: DtoUiComponent<T, Props>;
} & Props;

export type DtoUiArrayGeneratorProps<T extends Entity, Props> = Omit<
  DtoComponentWrapperProps<T, Props>,
  "id"
>;

export type LazyDtoUiComponentProps<T extends Entity> = Omit<
  DtoUiComponentProps<T>,
  "deleted" | "dispatchDeletion"
>;

export type LazyDtoUiComponent<T extends Entity, Props> = FC<
  LazyDtoUiComponentProps<T> & Props
>;

export type LazyDtoComponentWrapperProps<T extends Entity, Props> = {
  renderAs: LazyDtoUiComponent<T, Props>;
  id: string | number;
  entityClass: string;
  whileLoading: () => ReactNode;
} & Props;

export type LazyDtoUiArrayGeneratorProps<T extends Entity, Props> = Omit<
  LazyDtoComponentWrapperProps<T, Props>,
  "id"
> &
  Props;

export type UnsavedChangesToast = FC<UnsavedChangesProps>;

export interface UnsavedChangesProps {
  unsavedFlag: boolean;
  handleCommit: () => void;
}
