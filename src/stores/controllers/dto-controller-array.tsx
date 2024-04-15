import DtoController, {HasNumberIdDto, HasUuidDto} from './dto-controller';
import DtoListController, {
  DtoListControllerProps
} from './dto-id-list-controller';
import {getEntityNamespaceContextKey} from "./get-entity-namespace-context-key";

export type HasId = HasNumberIdDto | HasUuidDto

export function getEntityNamespaceKey<T extends HasId>(entityName: string, dto: T) {
  return getEntityNamespaceContextKey(entityName, dto.id);
}

export function DtoControllerArray<T extends HasId>({
  dtoList,
  entityName,
  updateServerAction,
  deleteServerAction
}: DtoListControllerProps<T>) {
  return (
    <>
      <DtoListController
        dtoList={dtoList}
        entityName={entityName}
        updateServerAction={updateServerAction}
        deleteServerAction={deleteServerAction}
      />
      {dtoList.map((dto) => (
        <DtoController
          key={getEntityNamespaceKey(entityName, dto)}
          dto={dto}
          entityName={entityName}
        />
      ))}
    </>
  );
}
