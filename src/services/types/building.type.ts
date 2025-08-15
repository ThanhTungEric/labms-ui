import { Floor } from "./floor.type";

export interface Building {
    id: number;
    code: string;
    description: string;
    floors: Floor[];
}

export type BuildingListItem = {
    id: number;
    name: string;
    description: string;
};

export type RoomInBuilding = {
    id: number;
    name: string;
    description: string;
    notes: string;
};

export type FloorInBuilding = {
    id: number;
    level: string;
    description: string;
    rooms: RoomInBuilding[];
};

export type BuildingDetail = {
    id: number;
    code: string;
    description: string;
    floors: FloorInBuilding[];
};

export type CreateBuildingDto = {
    name: string;
    description: string;
    id?: number;
};

export type UpdateBuildingDto = Partial<{
    id: number;
    name: string;
    description: string;
}>;