import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/app/config/config';
import { Utils } from 'src/app/common/utils/app-util';


//Esta clase es generalizada para el envio de emails, para enviar otros crear una ruta diferente, crear una funcion y aplicarla


@Injectable({
  providedIn: 'root',
})
export class EmailSenderHttpService {
  
  private passwordRecoveryUrl = `${Config.BASE_URL}/passwordRecovery`; //to be defined

  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  sendPasswordRecoveryInstructions(email: String) {
      return this.httpClient.post(`${this.passwordRecoveryUrl}/${email}`, Utils.getHttpHeaders());
    }

}
