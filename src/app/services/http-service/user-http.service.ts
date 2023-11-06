import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { Config } from 'src/app/config/config';
import { DebugerService } from '../debug-service/debug.service';
import { map } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';
import { Utils } from 'src/app/common/utils/app-util';
import { DialogService } from '../dialog-service/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  private url = `${Config.BASE_URL}/user`;
  private registerAdminUrl = `${Config.BASE_URL}/subscription/save/admin`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly loader: LoadingService,
    private readonly dialog: DialogService
  ) {}

  registerAdmin(suscription: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${this.registerAdminUrl}`, suscription).subscribe({
        next: (response) => {
          if (response) {
            resolve(response);
          } else {
            reject(response);
          }
        },
        error: (error) => {
          reject(error);
          console.error(error);
        },
      });
    });
  }

  saveUser(user: User): Promise<void> {
    DebugerService.log('Submitting POST to HTTP Server user/');

    return new Promise((resolve, reject) => {
      this.httpClient.post(`${this.url}/`, user).subscribe({
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

  getUsers(id: number) {
    return this.httpClient.get(`${this.url}/all/${id}`, Utils.getHttpHeaders()).pipe(
      map((resp) => {
        return resp as User[];
      })
    );
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`, Utils.getHttpHeaders());
  }

  resgiterSubUser(user: User, parentId:number, medicalCenterId:number) {
    return this.httpClient.post(`${this.url}/${parentId}/${medicalCenterId}`, user, Utils.getHttpHeaders());
  }

  editUser(id: number, user: User) {
    return this.httpClient
      .put(`${this.url}/${id}/update`, user, Utils.getHttpHeaders())
      .pipe(
        map((resp) => {
          this.loader.dismiss();
          DebugerService.log('resp' + JSON.stringify(resp));
          return resp as User;
        })
      );
  }

  getActiveUser(email: string): any {
    return this.httpClient
      .get(`${this.url}/email/${email}`, Utils.getHttpHeaders())
      .pipe(
        map((resp) => {
          return resp as User;
        })
      );
  }
}
