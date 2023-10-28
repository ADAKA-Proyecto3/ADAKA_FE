import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Client, IFrame, IStompSocket } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { MessageType } from 'src/app/common/enums/messageType.enum';
import { Config } from 'src/app/config/config';
import { Message } from 'src/app/models/messages.model';
import { DebugerService } from 'src/app/services/debug-service/debug.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  private generalRoom: string = '/chat/message';
  private typingPing: string = '/chat/typing';

  private client!: Client;
  connected: boolean = false;

  message: Message = new Message();
  messages: Message[] = [];
  isUserTyping: boolean = false;
  userNameTyping: string = '';

  @ViewChild('scrollChat') comment?: ElementRef;
  scrollToTop: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.initializeProperties();
  }

  initializeProperties() {
    this.client = new Client();

    this.client.webSocketFactory = () => {
      const ws = new SockJS(Config.SOCKET_URL);
      return <IStompSocket>(<any>ws);
    };

    this.client.onConnect = (frame: IFrame) => {
      DebugerService.log('Connected: ' + this.client.connected + ' : ' + frame);
      this.connected = true;

      this.client.subscribe(this.generalRoom, (e) => {
        let message: Message = JSON.parse(e.body) as Message;
        message.date = new Date(message.date);

        if (
          !this.message.color &&
          message.type == MessageType.NEW_USER &&
          message.username == this.message.username
        ) {
          this.message.color = message.color;
        }

        this.messages.push(message);
        setTimeout(() => {
          if (this.comment !== undefined) {
            this.comment.nativeElement.scrollTop =
              this.comment.nativeElement.scrollHeight;
          }
        }, 100);
      });

      this.client.subscribe(this.typingPing, (e) => {
       this.userNameTyping = e.body;
       setTimeout(() => this.userNameTyping = '', 3000);
      });

      this.message.type = MessageType.NEW_USER;
      this.client.publish({destination: '/app/mensaje', body: JSON.stringify(this.message)});

    };

    this.client.onDisconnect = (frame: IFrame) => {
      DebugerService.log('Disconnected: ' + !this.client.connected + ' : ' + frame);
      this.connected = false;
    };
  }
}
