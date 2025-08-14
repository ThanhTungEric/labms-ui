export interface Room {
    id: number;
    name: string;
    description: string;
}

export type RoomListItem = {
    id: number;
    name: string;
    description: string;
    notes?: string;

    floor: {
        id: number;
        level: string;
    };

    building: {
        id: number;
        code?: string;
        name?: string;
        description: string;
    };
};

export type RoomsListResponse = {
    data: RoomListItem[];
    meta: { count: number };
};

export type CreateRoomDto = {
    name: string;
    description: string;
    notes: string;
    buildingId: number;
    floorId: number;
};

export type RoomDetail = {
    id: number;
    name: string;
    description: string;
    notes: string;

    floor: {
        id: number;
        level: string;
        description: string;
    };
    building: {
        id: number;
        name?: string;
        code?: string;
        description: string;
    };
};

export type UpdateRoomDto = Partial<{
    name: string;
    description: string;
    notes: string;
    buildingId: number;
    floorId: number;
}>;
