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
  private url = `${Config.BASE_URL}/device`;

  constructor(
    private readonly httpClient: HttpClient,
    private loader: LoadingService
    ) {}

 registerDevice(idUser: number, device:Device): Promise<void> {
    this.loader.showLoadingModal();

    return new Promise((resolve, reject) => {
      this.httpClient.post(`${this.url}/${idUser}`, device, Utils.getHttpHeaders() ).subscribe({
        next: (response) => {
            if (response) {
                resolve();
            } else {
                reject();
            }
        },
        error: (error) => {
          reject(error);
          console.error('Error al registrar: ',error);
        },
      });
    });
  }

  getDevices(idUser: number) {
    this.loader.showLoadingModal();
    return this.httpClient.get(`${this.url}/all/${idUser}`)
    .pipe(
      map(resp => {
        console.log("resp", resp);
        this.loader.dismiss();
        return resp as Device[];
      })
    );
  }

  deleteDevice( deviceId: number){
    return this.httpClient.delete(`${this.url}/delete/${deviceId}`, Utils.getHttpHeaders())
    .pipe(catchError((error) => {
      throw error;
     }),
     map((resp: any) => {
       this.loader.dismiss();
       /*const response: Response = {
         title: 'Deleted Device',
         data: resp.data,
       };
       return response;*/
     })

    )
  }

  editDevice(id: number, device: Device) {
    this.loader.showLoadingModal();
    return this.httpClient.put(`${this.url}/edit/${id}`, device)
    .pipe(
      map(resp => {
        this.loader.dismiss();
        return resp as Device;
      })
    );
  }
}
