import { MessageType } from "../enums/messageType.enum";

export interface Message {
    text: string;
    date: Date;
    username: string;
    type: MessageType;
    color: string;
}