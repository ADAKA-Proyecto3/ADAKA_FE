import { MedicalCenter } from './medical-center.interface';
export interface Room {
    id?: number;
    name: string;
    length: number;
    width: number;
    height: number;
    status: string;
    MedicalCenter?: MedicalCenter;
}