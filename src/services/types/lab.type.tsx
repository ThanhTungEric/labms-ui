export interface LabListItem {
    id: number;
    name: string;
    area: number | null;
    layout: string | null;
    condition: string[] | null;
    status: {
        id: number;
        name: string;
    };
}

export interface LabDetail {
    id: number;
    name: string;
    area: number | null;
    layout: string | null;
    condition: string[] | null;
    status: {
        id: number;
        name: string;
    };
    staffs: Array<{
        staffId: number;
        positionId: number;
    }>;
    rooms: Array<{
        id: number;
        name: string;
        description: string;
        notes: string;
    }>;
}

export interface CreateLabDto {
    name: string;
    area: number;
    layout: string;
    condition: string[];
    roomId: number;
    statusId: number;
}

export interface UpdateLabDto {
    name?: string;
    area?: number;
    layout?: string;
    condition?: string[];
    roomId?: number;
    statusId?: number;
}
