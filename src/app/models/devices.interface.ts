import { Room } from './rooms.interface';
export interface Device {
    deviceId?: number;
    model?: string;
    date?: number;
    room?: Room;
    assignedRoomId?: number;
    userId?: number;
}