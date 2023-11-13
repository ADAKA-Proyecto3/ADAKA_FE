// email-sender-http.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class EmailSenderHttpService {

  private Url = `${Config.BASE_URL}/user/recover`; 

  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  sendPasswordRecoveryInstructions(email: string) {
    const emailObj = {email};
    return this.httpClient.post(`${this.Url}`, emailObj);
  }

}
