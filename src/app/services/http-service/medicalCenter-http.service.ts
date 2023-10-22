import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MedicalCenter} from 'src/app/models/medical-center.interface';
import {Response} from 'src/app/models/Response.interface';
import {Config} from 'src/app/config/config';
import {DebugerService} from '../debug-service/debug.service';
import {map} from 'rxjs';
import {LoadingService} from '../loading-service/loading.service';

@Injectable({
  providedIn: 'root',
})
export class MedicalCenterHttpService {
  private url = `${Config.BASE_URL}/medical`;

  constructor(
    private readonly httpClient: HttpClient,
    private loader: LoadingService
  ) {
  }

  saveMedicalCenter(medicalCenter: MedicalCenter, id: number): Promise<void> {
    DebugerService.log('Submitting POST to HTTP Server user/');

    return new Promise<void>((resolve, reject) => {
      const urlWithId = `${this.url}/${id}`;

      this.httpClient.post(urlWithId, medicalCenter).subscribe({
        next: (response:any) => {
          if (response.data) {
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
  getMedicalCenters(id: number) {
    this.loader.showLoadingModal();
    return this.httpClient.get(`${this.url}/all/${id}`).pipe(
        map((resp: Response<MedicalCenter>) =>{
            console.log("resp", resp);
            this.loader.dismiss();

            return resp.data as MedicalCenter;
        })
      );
  }

  deleteMedicalCenter(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`)
  }

  editMedicalCenter(id: number, medicalCenter: MedicalCenter) {
    this.loader.showLoadingModal();
    return this.httpClient.put(`${this.url}/changeMedical/${id}`, medicalCenter)
      .pipe(
        map((resp: any) => {
          this.loader.dismiss();
          console.log("resp", resp);

          const response: Response<MedicalCenter> = {
            title: 'Updated Medical Center', // Puedes ajustar el título según tus necesidades
            data: resp.data, // Suponiendo que 'data' contiene el centro médico
          };

          return response;
        })
      );
  }

  editStatusMedicalCenter(id: number, medicalCenter: MedicalCenter) {
    this.loader.showLoadingModal();
    return this.httpClient.put(`${this.url}/changeMedicalStatus/${id}`, medicalCenter)
      .pipe(
        map((resp: Response<MedicalCenter>) => {
          if (resp.title === "Algo válido") {
            // La validación del título es exitosa
            console.log("resp", resp);
            this.loader.dismiss();
            return resp.data; // Devuelve la propiedad 'data' de la respuesta
          } else {
            // El título no es válido, puedes manejar el error o lanzar una excepción
            throw new Error(resp.title);
          }
        })
      );
  }

}
