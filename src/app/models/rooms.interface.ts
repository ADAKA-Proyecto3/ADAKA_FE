import { Device } from './devices.interface';
import { MedicalCenter } from './medical-center.interface';
export interface Room {
    id?: number;
    name: string;
    length: number;
    width: number;
    height: number;
    medicalCenter?: MedicalCenter;
    medicalCenterId?: number;
    device?:Device;
}