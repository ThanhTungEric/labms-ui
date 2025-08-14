import { Floor } from "./floor.type";

export interface Building {
    id: number;
    code: string;
    description: string;
    floors: Floor[];
}