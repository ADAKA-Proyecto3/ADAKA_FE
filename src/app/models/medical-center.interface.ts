import { Room } from "./rooms.interface";

export interface MedicalCenter {
id?: number;
name: string;
status: string;
direction: string;
email: string;
latitude: number;
longitude: number;
rooms?: Room[];
showPublic?: number;
}
