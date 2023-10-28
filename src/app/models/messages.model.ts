import { MessageType } from "../common/enums/messageType.enum";

export class Message {
    text: string = '';
    date!: Date;
    username!: string;
    type!: MessageType ;
    color: string = '';
}