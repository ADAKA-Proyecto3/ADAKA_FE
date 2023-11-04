import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicalCenter } from 'src/app/models/medical-center.interface';
import { Response } from 'src/app/models/Response.interface';
import { Config } from 'src/app/config/config';
import { DebugerService } from '../debug-service/debug.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';
import { Utils } from 'src/app/common/utils/app-util';

@Injectable({
  providedIn: 'root',
})
export class MedicalCenterHttpService {
  private url = `${Config.BASE_URL}/medical`;

  constructor(
    private readonly httpClient: HttpClient,
    private loader: LoadingService
  ) {}


  saveMedicalCenter(id: number, medicalCenter: MedicalCenter): Promise<void> {
    DebugerService.log('Submitting POST to HTTP Server user/');
    const urlWithId = `${this.url}/${id}`;
    return new Promise((resolve, reject) => {
      
      this.httpClient.post(urlWithId, medicalCenter).subscribe({
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

  resgiterMedicalCenter(id: number, medicalCenter: MedicalCenter) {
    const urlWithId = `${this.url}/${id}`;
    return this.httpClient.post(urlWithId, medicalCenter,Utils.getHttpHeaders());
  }


  getMedicalCenters(id: number) {
    this.loader.showLoadingModal();
    const urlWithId = `${this.url}/all/${id}`;
    console.log(urlWithId);
    return this.httpClient.get<Response<MedicalCenter>>(urlWithId,Utils.getHttpHeaders()).pipe(
      map((resp) => {
        console.log('resp', resp);
        this.loader.dismiss();
        return resp.data as MedicalCenter[];
      })
    );
  }
 
  deleteMedicalCenter(id: number) {
    const urlWithId = `${this.url}/delete/${id}`;
  
    return this.httpClient
      .delete(urlWithId, Utils.getHttpHeaders())
      .pipe(
        catchError((error) => {
         throw error;
        }),
        map((resp: any) => {
          this.loader.dismiss();
          console.log('resp', resp);
  
          const response: Response<MedicalCenter> = {
            title: 'Updated Medical Center', // Puedes ajustar el título según tus necesidades
            data: resp.data, // Suponiendo que 'data' contiene el centro médico
          };
  
          return response;
        })
      );
  }

  editMedicalCenter(id: number, medicalCenter: MedicalCenter) {
    this.loader.showLoadingModal();
    DebugerService.log("Entro al editar");
    console.log(medicalCenter);
    return this.httpClient
      .put(`${this.url}/changeMedical/${id}`, medicalCenter, Utils.getHttpHeaders())
      .pipe(
        map((resp: any) => {
          this.loader.dismiss();
          console.log('resp', resp);
  
          const response: Response<MedicalCenter> = {
            title: resp.title,
            data: resp.data, 
          };

          return response;
        }),
        catchError((error) => {
          console.log(error);
          throw(error);
        })
      );
  }

  editStatusMedicalCenter(id: number, status: string) {
    this.loader.showLoadingModal();
    DebugerService.log("Entro al editar");
    console.log(status);
    return this.httpClient
      .put(`${this.url}/changeMedical/${id}/${status}`, Utils.getHttpHeaders())
      .pipe(
        map((resp: any) => {
          this.loader.dismiss();
          console.log('resp', resp);
  
          const response: Response<MedicalCenter> = {
            title: resp.title,
            data: resp.data, 
          };

          return response;
        }),
        catchError((error) => {
          console.log(error);
          throw(error);
        })
      );
  }
}
