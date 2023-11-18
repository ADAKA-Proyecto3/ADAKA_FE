import { Injectable } from '@angular/core';
import { LoadingService } from '../loading-service/loading.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';
import { DebugerService } from '../debug-service/debug.service';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  private url = `http://ADAKA-SPRING-env.eba-239pycbx.us-east-1.elasticbeanstalk.com:8080/metrics`;

  constructor(
    private readonly httpClient: HttpClient,
    private loader: LoadingService
  ) {}

  getLatesMetricForRoom(roomId: number) {
    this.loader.showLoadingModal();
    return this.httpClient.get<any>(`${this.url}/room/${roomId}`).pipe(
      map((resp) => {
        DebugerService.log(
          'GetLatesMetricForRoom: ' + JSON.stringify(resp.data)
        );
        this.loader.dismiss();
        return resp.data;
      }),
      catchError((error) => {
        this.loader.dismiss();
        console.error('Error en la petición:', error);
        throw error.error.title;
      })
    );
  }

  async getHistoricalMetricsForRoom(
    roomId: number,
    startDate: string,
    endDate: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(
          `${this.url}/room/${roomId}/dates?startDate=${startDate}&endDate=${endDate}`
        )
        .subscribe({
          next: (response) => {
            if (response) {
              resolve(response);
            } else {
              reject(response);
            }
          },
          error: (error) => {
            reject(error);
            console.error(error.error.error);
          },
        });
    });
  }
}
