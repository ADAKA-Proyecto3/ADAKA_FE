import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/app/config/config';
import { map } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';
import { Room } from 'src/app/models/rooms.interface';
import { Response } from 'src/app/models/response.interface';

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
    return this.httpClient.get<Response<Room>>(`${this.url}/all/${id}`)
    .pipe(
      map(resp => {
        console.log("resp", resp);
        this.loader.dismiss();
        return resp.data as Room[];
      })
    );
  }
  

  deleteRoom( id: number){
    return this.httpClient.delete(`${this.url}/delete/${id}`)
  }

  resgiterRoom(id: number, room: Room) {
    return this.httpClient.post(`${this.url}/${id}`, room);
  }


  editRoom(id: number, room: Room) {
    this.loader.showLoadingModal();
    return this.httpClient.put(`${this.url}/${id}`, room)
    .pipe(
      map(resp => {
        this.loader.dismiss();
        console.log("resp", resp);
        return resp as Room;
      })
    );
  }
}
