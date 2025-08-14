import { Room } from "./room.type";

export interface Floor {
    id: number;
    level: string;
    rooms: Room[];
}