import { Device } from "./devices.interface";
import { MedicalCenter } from "./medical-center.interface";
import { Suscription } from "./suscription.interface";

export interface User {
    id?: number;
    name: string;
    role?: string | null;
    status?: string | null;
    phone: string;
    email: string;
    password?: string | null;
    medicalCenters?: MedicalCenter[];
    subscription?: Suscription;
    assignedMedicalCenter?: number;
    manager?: number;
    devices?: Device[];



}