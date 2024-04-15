import {Dispatch, FC, ReactNode, SetStateAction} from "react";

export interface HasNumberIdDto {
    id: number
}

export interface HasUuidDto {
    id: string
}

export interface DtoControllerProps<T extends HasNumberIdDto | HasUuidDto> {
    dto: T;
    entityName: string;
}

export const EmptyArray = [];
export type HasId = HasNumberIdDto | HasUuidDto
export const ObjectPlaceholder = {};

export interface DtoListControllerProps<T extends HasId> {
    dtoList: T[];
    entityName: string;
    updateServerAction?: (entityList: T[]) => Promise<T[]>;
    deleteServerAction?: (idList: any[]) => Promise<any[]>;
    unsavedChangesComponent?: (props: UnsavedChangesProps) => ReactNode
}

export interface UnsavedChangesProps {
    unsavedFlag: boolean,
    handleCommit: () => void
}

export interface DtoUiComponentProps<T extends HasId> {
    entity: T;
    entityClass: string;
    dispatchWithoutControl?: Dispatch<SetStateAction<T>>;
    deleted: boolean;
    dispatchDeletion?: Dispatch<SetStateAction<(string | number)[]>>;
}

export type DtoUiComponent<T extends HasId> = FC<DtoUiComponentProps<T>>;