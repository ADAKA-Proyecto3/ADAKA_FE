import { Room } from './rooms.interface';
export interface Device {
    id?: number;
    model: string;
    installationDate?: number;
    room?: Room;
}