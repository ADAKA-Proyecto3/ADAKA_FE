import { Room } from "./rooms.interface";

export interface MedicalCenter {
id?: number;
name: string;
status: string;
address: string;
email: string;
coordenates: {
    latitude: number;
    longitude: number;
};
rooms?: Room[];
}
