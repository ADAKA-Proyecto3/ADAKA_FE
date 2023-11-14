import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from 'src/app/models/devices.interface';
import { Config } from 'src/app/config/config';
import { catchError, map } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';
import { Utils } from 'src/app/common/utils/app-util';



@Injectable({
  providedIn: 'root',
})
export class DeviceHttpService {
  private url = `${Config.BASE_URL}/devices`;

  constructor(
    private readonly httpClient: HttpClient,
    private loader: LoadingService
    ) {}

  registerDevice(userId: number, content: Device, roomId: number = 1){
    return this.httpClient
      .post(`${this.url}/save/${userId}/${roomId}`, content, Utils.getHttpHeaders())
      .pipe(
        map((resp: any) => {
          this.loader.dismiss();
          return resp;
        }),
        catchError((error) => {
          console.error('Error en la petición:', error);
          throw(error.error);
        })
      );
  }



  getDevices(userId: number) {
    console.log("entro al http service ");
    this.loader.showLoadingModal();
    return this.httpClient.get(`${this.url}/all/${userId}`, Utils.getHttpHeaders())
    .pipe(
      map(resp => {
        console.log("resp", resp);
        this.loader.dismiss();
        return resp as Device[];
      })
    );
  }

  deleteDevice( deviceId: number){
    return this.httpClient.delete(`${this.url}/${deviceId}`, Utils.getHttpHeaders())
    .pipe(catchError((error) => {
      throw error;
     }),
     map((resp: any) => {
       this.loader.dismiss();
       const response: any = "Deleted device" + resp;
       return response;
     })

    )
  }

  editDevice(deviceId: number, device: Device) {
    this.loader.showLoadingModal();
    return this.httpClient.put(`${this.url}/${deviceId}`, device)
    .pipe(
      map(resp => {
        this.loader.dismiss();
        return resp as Device;
      })
    );
  }
  
}
