import { Room } from "./rooms.interface";

export interface MedicalCenter {
id?: number;
name: string;
status: string;
phone: string;
address: string;
coordenates: {
    latitude: number;
    longitude: number;
};
rooms?: Room[];
}