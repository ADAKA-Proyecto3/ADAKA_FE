import { MedicalCenter } from './medical-center.interface';
export interface Room {
    id?: number;
    name: string;
    MedicalCenter?: MedicalCenter;
}