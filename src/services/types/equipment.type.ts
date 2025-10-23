import { EquipmentStatus } from './equipmentStatuses.type';
import { EquipmentForm } from './equipmentForms.type';

export type SortDirection = 'asc' | 'desc';
export type Meta = { count: number; page?: number; totalPages?: number };

export interface SortField<T extends string> {
  field: T | (string & {});
  dir: SortDirection;
}

export interface EquipmentItemsQuery {
  skip?: number;
  take?: number;
  searchSerialNumber?: string;
  searchBase?: number[];
  searchLab?: number[];
  searchStatus?: number;
  ids?: number[];
  sorts?: SortField<'id' | 'serialNumber' | 'warrantyExpiration' | 'purchaseDate' | 'status' | 'base' | 'lab'>[];
  _refresh?: any;
}

export interface EquipmentItemsResponse {
  data: EquipmentItem[];
  meta: Meta;
}

export interface CreateEquipmentItemDto {
  serialNumber: string;
  warrantyExpiration: string;
  purchaseDate: string;
  status: number;
  baseId: number;
  labId: number;
}

export interface UpdateEquipmentItemDto extends Partial<CreateEquipmentItemDto> {}

export type EquipmentCategory = { id: number; label: string; description: string };
export type EquipmentDomain = { id: number; label: string; description: string };
export type EquipmentItemStatus = EquipmentStatus;
export type EquipmentItemLab = { id: number; code: string; name: string };

export type Equipment = {
  id: number;
  code: string;
  name: string;
  manufacturer: string;
  photo: string;
  manual: string;
  price: number;
  priceCategory: string;
  modelCode: string;
  components: string[];
  specifications: string[];
  form: EquipmentForm;
  categories: EquipmentCategory[];
  domains: EquipmentDomain[];
};

export type EquipmentItem = {
  id: number;
  serialNumber: string;
  status: EquipmentItemStatus;
  warrantyExpiration: string;
  purchaseDate: string;
  base: Equipment;
  lab: EquipmentItemLab;
};

export type EquipmentDetail = Equipment & {
  items: { data: EquipmentItem[]; meta: { count: number } };
};

export type CreateEquipmentDto = {
  code: string;
  name: string;
  manufacturer: string;
  photo: string;
  manual: string;
  price: number;
  modelCode: string;
  formId: number;
  components: string[];
  specifications: string[];
  categoryIds?: number[];
  domainIds?: number[];
};

export type UpdateEquipmentDto = Partial<Omit<CreateEquipmentDto, 'components' | 'specifications'>> & {
  addedComponents?: string[];
  removedComponents?: string[];
  addedSpecifications?: string[];
  removedSpecifications?: string[];
  addedCategoryIds?: number[];
  removedCategoryIds?: number[];
  addedDomainIds?: number[];
  removedDomainIds?: number[];
};

export type EquipmentSort = SortField<'id' | 'code' | 'name' | 'manufacturer' | 'price' | 'modelCode' | 'form'>;

export type EquipmentQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  formId?: number;
  categoryIds?: number[];
  domainIds?: number[];
  manufacturer?: string;
  ids?: number[];
  sorts?: EquipmentSort[];
  _refresh?: any;
};
