import { Room } from './rooms.interface';
export interface Device {
    id?: number;
    model?: string;
    date?: number;
    room?: Room;
    assignedRoomId?: number;
}