import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from 'src/app/models/devices.interface';
import { Config } from 'src/app/config/config';
import { catchError, map } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';
import { Utils } from 'src/app/common/utils/app-util';
import { DebugerService } from '../debug-service/debug.service';



@Injectable({
  providedIn: 'root',
})
export class DeviceHttpService {
  private url = `${Config.BASE_URL}/devices`;

  constructor(
    private readonly httpClient: HttpClient,
    private loader: LoadingService
    ) {}

  registerDevice(adminId: number, device: Device){
    this.loader.showLoadingModal();
    return this.httpClient
      .post(`${this.url}/${adminId}/save`, device, Utils.getHttpHeaders())
      .pipe(
        map((resp: any) => {
          this.loader.dismiss();
          DebugerService.log('Register Device: ' + JSON.stringify(resp));
          return resp;
        }),
        catchError((error) => {
          this.loader.dismiss();
          console.error('Error en la petición:', error);
          throw(error.error);
        })
      );
  }



  getDevices(adminId: number) {
    this.loader.showLoadingModal();
    return this.httpClient.get(`${this.url}/all/${adminId}`, Utils.getHttpHeaders())
    .pipe(
      map((resp:any) => {
        this.loader.dismiss();
        DebugerService.log('Get Devices: ' + JSON.stringify(resp.data));
        return resp.data as Device[];
      }),
      catchError((error) => {
        this.loader.dismiss();
        console.error('Error en la petición:', error);
        throw(error.error);
      })
    );
  }

  deleteDevice( deviceId: number){
    return this.httpClient.delete(`${this.url}/delete/${deviceId}`, Utils.getHttpHeaders());
    // this.loader.showLoadingModal();
    // return this.httpClient.delete(`${this.url}/${deviceId}`, Utils.getHttpHeaders())
    // .pipe(catchError((error) => {
    //   this.loader.dismiss();
    //   throw error;
    //  }),
    //  map((resp: any) => {
    //    this.loader.dismiss();
    //    const response: any = "Deleted device" + resp;
    //    return response;
    //  })

    // )
  }

  // editDevice(deviceId: number, device: Device) {
  //   this.loader.showLoadingModal();
  //   return this.httpClient.put(`${this.url}/${deviceId}`, device)
  //   .pipe(
  //     map(resp => {
  //       this.loader.dismiss();
  //       return resp as Device;
  //     })
  //   );
  // }
  
}
