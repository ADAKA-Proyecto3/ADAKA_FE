import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from 'src/app/models/devices.interface';
import { Config } from 'src/app/config/config';
import { DebugerService } from '../debug-service/debug.service';
import { map } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceHttpService {
  private url = `${Config.BASE_URL}/device`;

  constructor(
    private readonly httpClient: HttpClient,
    private loader: LoadingService
    ) {}

  saveDevice(device:Device): Promise<void> {

    DebugerService.log('Submitting POST to HTTP Server device/');
  
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${this.url}/`,  device ).subscribe({
        next: (response) => {
            if (response) {
                resolve();
            } else {
                reject();
            }
        },
        error: (error) => {
          reject(error);
          console.error(error);
        },
      });
    });
  }

  getDevices() {
    this.loader.showLoadingModal();
    return this.httpClient.get(`${this.url}/all`)
    .pipe(
      map(resp => {
        console.log("resp", resp);
        this.loader.dismiss();
        return resp as Device[];
      })
    );
  }

  deleteDevice( id: number){
    return this.httpClient.delete(`${this.url}/${id}`)
  }

  resgiterDevice(device: Device) {
    return this.httpClient.post(`${this.url}/`, device);
  }


  editDevice(id: number, device: Device) {
    this.loader.showLoadingModal();
    return this.httpClient.put(`${this.url}/${id}`, device)
    .pipe(
      map(resp => {
        this.loader.dismiss();
        console.log("resp", resp);
        return resp as Device;
      })
    );
  }
}
