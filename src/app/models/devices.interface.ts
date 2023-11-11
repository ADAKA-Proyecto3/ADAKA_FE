import { Room } from './rooms.interface';
export interface Device {
    deviceId: number;
    model: string;
    installation: Date;
    user: {
        id: number;
      };
    room?: Room;
    assignedRoomId?: number;
}
