import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapInfo } from 'src/app/models/map-info.interface';
import { Response } from 'src/app/models/response.interface';
import { Config } from 'src/app/config/config';
import { map } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';


@Injectable({
  providedIn: 'root',
})
export class MapInfoHttpService {
  private url = `${Config.BASE_URL}/medical`;

  constructor(
    private readonly httpClient: HttpClient,
    private loader: LoadingService
  ) {}

  getMapInfo() {
    const urlWithId = `${this.url}/all`;
    return this.httpClient
      .get<Response<any>>(urlWithId)
      .pipe(
        map((resp) => {
          console.log('resp', resp);
          return resp.data as MapInfo[];
        })
      );
  }

  public getMapInfoaqicn() {
    const urlWithId = `https://api.waqi.info/v2/map/bounds?latlng=10.1889,-82.3333,8.5239,-85.9583&networks=all&token=2234cdb06d0902a2418a2f99185c4689c40f4628`;
    return this.httpClient
      .get<Response<any>>(urlWithId)
      .pipe(
        map((resp) => {
          return resp.data;
        })
      );
  }
}
