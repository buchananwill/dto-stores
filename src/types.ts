import React, {
  Dispatch,
  FC,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
} from "react";

export interface HasNumberIdDto {
  id: number;
}

export interface HasUuidDto {
  id: string;
}

export interface DtoControllerProps<T extends HasNumberIdDto | HasUuidDto> {
  dto: T;
  entityName: string;
}

export const EmptyArray = [];
export type HasId = HasNumberIdDto | HasUuidDto;
export const ObjectPlaceholder = {};

export interface DtoListControllerProps<T extends HasId> {
  dtoList: T[];
  entityName: string;
  updateServerAction?: CommitServerAction<T>;
  deleteServerAction?: CommitServerAction<any>;
  postServerAction?: CommitServerAction<T>;
  unsavedChangesComponent?: (props: UnsavedChangesProps) => React.ReactNode;
}
export interface IdListControllerProps<T extends HasId> {
  idList: string | number[];
  entityName: string;
  updateServerAction?: CommitServerAction<T>;
  deleteServerAction?: CommitServerAction<any>;
  postServerAction?: CommitServerAction<T>;
}

export type UnsavedChangesToast = FC<UnsavedChangesProps>;

export interface UnsavedChangesProps {
  unsavedFlag: boolean;
  handleCommit: () => void;
}

export interface DtoUiComponentProps<T extends HasId>
  extends PropsWithChildren {
  entity: T;
  entityClass: string;
  dispatchWithoutControl?: Dispatch<SetStateAction<T>>;
  deleted: boolean;
  dispatchDeletion?: Dispatch<SetStateAction<(string | number)[]>>;
}

export type DtoUiComponent<T extends HasId> = FC<DtoUiComponentProps<T>>;

export interface DtoUiArrayGeneratorProps<T extends HasId> {
  entityName: string;
  eachAs?: DtoUiComponent<T>;
}

export type ChangesCallbackMap = Map<
  string,
  MutableRefObject<() => Promise<void>>
>;

export interface CommitServerAction<T> {
  (commitList: T[]): Promise<any>;
}
