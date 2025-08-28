
import { equipmentStatusItems } from './equipmentStatuses.type';


export type EquipmentForm = {
    id: number;
    name: string;
    description: string;
};

export type EquipmentCategory = {
    id: number;
    label: string;
    description: string;
};

export type EquipmentDomain = {
    id: number;
    label: string;
    description: string;
};


export type EquipmentListItem = {
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

export type EquipmentItemStatus = equipmentStatusItems;

export type EquipmentItemLab = {
    id: number;
    code: string;
    name: string;
};

export type EquipmentItemListItem = {
    id: number;
    serialNumber: string;
    status: EquipmentItemStatus;
    warrantyExpiration: string;
    purchaseDate: string;
    lab: EquipmentItemLab;
};


export type EquipmentDetail = EquipmentListItem & {
    items: {
        data: EquipmentItemListItem[];
        meta: { count: number };
    };
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
    categoryIds: number[];
    domainIds: number[];
};

export type UpdateEquipmentDto = {
    code?: string;
    name?: string;
    manufacturer?: string;
    photo?: string;
    manual?: string;
    price?: number;
    modelCode?: string;
    formId?: number;

    addedComponents?: string[];
    removedComponents?: string[];
    addedSpecifications?: string[];
    removedSpecifications?: string[];

    addedCategoryIds?: number[];
    removedCategoryIds?: number[];
    addedDomainIds?: number[];
    removedDomainIds?: number[];
};


export type EquipmentSort = {
    field:
    | 'id'
    | 'code'
    | 'name'
    | 'manufacturer'
    | 'price'
    | 'modelCode'
    | 'form'
    | (string & {});
    dir: 'asc' | 'desc';
};

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
};
