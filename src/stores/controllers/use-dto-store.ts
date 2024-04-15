import {
  useSelectiveContextAnyController,
  useSelectiveContextAnyDispatch,
  useSelectiveContextGlobalListener
} from '../../components/global/selective-context-manager-global';
import { HasUuidDto } from '../../../api/dtos/HasUuidDtoSchema';
import { HasNumberIdDto } from '../../../api/dtos/HasNumberIdDtoSchema';

import { ObjectPlaceholder } from '../../../api/main';
import { getEntityNamespaceContextKey } from './get-entity-namespace-context-key';

export function useDtoStoreController<T extends HasUuidDto | HasNumberIdDto>(
  dto: T,
  entityType: string
) {
  return useSelectiveContextAnyController<T>({
    contextKey: getEntityNamespaceContextKey(entityType, dto.id),
    initialValue: dto,
    listenerKey: 'controller'
  });
}
export function useDtoStoreDispatch<T extends HasUuidDto | HasNumberIdDto>(
  id: number | string,
  entityType: string,
  listenerKey: string
) {
  return useSelectiveContextAnyDispatch<T>({
    contextKey: getEntityNamespaceContextKey(entityType, id),
    initialValue: ObjectPlaceholder as T,
    listenerKey: listenerKey
  });
}
export function useDtoStoreListener<T extends HasUuidDto | HasNumberIdDto>(
  id: number | string,
  entityType: string,
  listenerKey: string
) {
  return useSelectiveContextGlobalListener<T>({
    contextKey: getEntityNamespaceContextKey(entityType, id),
    initialValue: ObjectPlaceholder as T,
    listenerKey: listenerKey
  });
}
