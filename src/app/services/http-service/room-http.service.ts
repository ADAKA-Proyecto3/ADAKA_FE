import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/app/config/config';
import { catchError, map } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';
import { Room } from 'src/app/models/rooms.interface';
import { Response } from 'src/app/models/response.interface';
import { Utils } from 'src/app/common/utils/app-util';
import { DebugerService } from '../debug-service/debug.service';

@Injectable({
  providedIn: 'root',
})
export class RoomHttpService {
  private url = `${Config.BASE_URL}/room`;

  constructor(
    private readonly httpClient: HttpClient,
    private loader: LoadingService
  ) {}

  getRooms(id: number) {
    this.loader.showLoadingModal();
    return this.httpClient
      .get<Response<Room>>(`${this.url}/all/${id}`, Utils.getHttpHeaders())
      .pipe(
        map((resp) => {
          DebugerService.log('resp: ' + JSON.stringify(resp));
          this.loader.dismiss();
          return resp.data as Room[];
        })
      );
  }

  deleteRoom(id: number) {
    return this.httpClient.delete(
      `${this.url}/delete/${id}`,
      Utils.getHttpHeaders()
    );
  }


  resgiterRoom(id: number, room: Room) {
    this.loader.showLoadingModal();
    return this.httpClient
      .post(`${this.url}/${id}`, room, Utils.getHttpHeaders())
      .pipe(
        map((resp: any) => {
          this.loader.dismiss();
        
          DebugerService.log('resp: ' + JSON.stringify(resp));
         
          return resp.data[0];
        }),
        catchError((error) => {
          console.error('Error en la petición:', error);
          throw error.error.title;
        })
      );
  }

  editRoom(id: number, medicalCenterId: number ,room: Room) {
    this.loader.showLoadingModal();
    return this.httpClient
      .put(`${this.url}/changeRoom/${id}/${medicalCenterId}`, room, Utils.getHttpHeaders())
      .pipe(
        map((resp) => {
          this.loader.dismiss();
          console.log('resp', resp);
          return resp as Room;
        })
      );
  }
}
