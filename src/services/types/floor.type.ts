import { Room } from "./room.type";

export interface Floor {
    id: number;
    level: string;
    rooms: Room[];
}

export type FloorListItem = {
    id: number;
    level: string;
    description: string;
};

export type FloorDetail = {
    id: number;
    level: string;
    description: string;
    rooms: Room[];
};

export type CreateFloorDto = {
    level: string;
    description: string;
    buildingId: number;
};

export type UpdateFloorDto = Partial<{
    level: string;
    description: string;
    buildingId: number;
}>;
