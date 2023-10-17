import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/app/config/config';
import { map } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';
import { Room } from 'src/app/models/rooms.interface';

@Injectable({
  providedIn: 'root',
})

export class RoomHttpService {
  private url = `${Config.BASE_URL}/room`;

  constructor(
    private readonly httpClient: HttpClient,
    private loader: LoadingService
    ) {}

  

  getRooms() {
    this.loader.showLoadingModal();
    return this.httpClient.get(`${this.url}/all`)
    .pipe(
      map(resp => {
        console.log("resp", resp);
        this.loader.dismiss();
        return resp as Room[];
      })
    );
  }

  deleteRoom( id: number){
    return this.httpClient.delete(`${this.url}/${id}`)
  }

  resgiterRoom(room: Room) {
    return this.httpClient.post(`${this.url}/`, room);
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
