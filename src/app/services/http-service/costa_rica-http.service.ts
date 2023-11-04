import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { Config } from 'src/app/config/config';
import { DebugerService } from '../debug-service/debug.service';
import { map } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';

type ApiResponse = {
  [key: string]: string;
};

@Injectable({
  providedIn: 'root',
})
export class CRHttpService {
  private url = 'https://ubicaciones.paginasweb.cr';

  constructor(
    private readonly httpClient: HttpClient,
    private loader: LoadingService
  ) {}

  getCanton(provinciaId: string): Promise<ApiResponse> {
    this.loader.showLoadingModal();
    return new Promise<ApiResponse>((resolve, reject) => {
      this.httpClient
        .get<ApiResponse>(`${this.url}/provincia/${provinciaId}/cantones.json`)
        .subscribe({
          next: (response) => {
            if (response) {
              resolve(response);
              this.loader.dismiss();
            } else {
              reject('No Canton Found');
              this.loader.dismiss();
            }
          },
          error: (error) => {
            reject(error);
            console.error(error);
            this.loader.dismiss();
          },
        });
    });
  }

  getDistrito(provinciaId: string, cantonId: string): Promise<ApiResponse> {
    this.loader.showLoadingModal();
    return new Promise<ApiResponse>((resolve, reject) => {
      this.httpClient
        .get<ApiResponse>(
          `${this.url}/provincia/${provinciaId}/canton/${cantonId}/distritos.json`
        )
        .subscribe({
          next: (response) => {
            if (response) {
              resolve(response);
              this.loader.dismiss();
            } else {
              reject('No Distrito Found');
              this.loader.dismiss();
            }
          },
          error: (error) => {
            reject(error);
            console.error(error);
            this.loader.dismiss();
          },
        });
    });
  }
}
