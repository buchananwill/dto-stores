import {
  Dispatch,
  FC,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
} from "react";
import { SelectiveContextReadAll } from "selective-context/dist/types";

export interface HasNumberIdDto {
  id: number;
}

export interface HasUuidDto {
  id: string;
}

export interface Entity {
  id: string | number;
}

export interface EntityOfId<U extends string | number> {
  id: U;
}

export interface DtoControllerProps<T extends Entity> {
  dto: T;
  entityClass: string;
}

export const EmptyArray = [];
export type HasId = HasNumberIdDto | HasUuidDto;
export const ObjectPlaceholder = {};

export interface DtoControllerArrayProps<T extends Entity> {
  dtoList: T[];
  entityClass: string;
}

export interface IdListControllerProps<T extends Entity> {
  entityList: T[];
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

export interface ChangesTracker<U extends string | number> {
  changedDtos: Array<U>;
  dispatchChangesList: Dispatch<SetStateAction<Array<U>>>;
  deletedDtos: Array<U>;
  dispatchDeletionList: Dispatch<SetStateAction<Array<U>>>;
  transientDtoIdList: Array<U>;
  dispatchTransientList: Dispatch<SetStateAction<Array<U>>>;
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

export type UnsavedChangesToast = FC<UnsavedChangesProps>;

export interface UnsavedChangesProps {
  unsavedFlag: boolean;
  handleCommit: () => void;
}

export interface DtoUiComponentProps<T extends Entity>
  extends PropsWithChildren {
  entity: T;
  entityClass: string;
  dispatchWithoutControl?: Dispatch<SetStateAction<T>>;
  deleted: boolean;
  dispatchDeletion?: Dispatch<SetStateAction<(string | number)[]>>;
}

export type DtoUiComponent<T extends Entity> = FC<DtoUiComponentProps<T>>;

export type DtoUiComponentLazy<T extends Entity> = FC<DtoUiComponentProps<T>>;

export interface DtoUiArrayGeneratorProps<T extends Entity> {
  entityClass: string;
  eachAs?: DtoUiComponent<T>;
}

export type ChangesCallbackMap = Map<
  string,
  MutableRefObject<() => Promise<void>>
>;

export interface CommitServerAction<T> {
  (commitList: T[]): Promise<any>;
}

export interface HasIdClass<U> {
  id: U;
}

export type PrimaryDtoControllerArrayProps<
  T extends HasIdClass<U>,
  U extends string | number,
> = TrackChangesProps<T, U> & DtoControllerArrayProps<T>;

export type EditControllerProps = Pick<
  TrackChangesProps<any, any>,
  "entityClass" | "updateServerAction"
>;
