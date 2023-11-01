import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { Config } from 'src/app/config/config';
import { DebugerService } from '../debug-service/debug.service';
import { map } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';
import { Utils } from 'src/app/common/utils/notification-util';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  private url = `${Config.BASE_URL}/user`;
  private registerAdminUrl = `${Config.BASE_URL}/subscription/save/admin`;

  constructor(
    private readonly httpClient: HttpClient,
    private loader: LoadingService
  ) {}

  registerAdmin(suscription: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${this.registerAdminUrl}`, suscription).subscribe({
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

  getUsers() {
    return this.httpClient.get(`${this.url}/all`, Utils.getHttpHeaders()).pipe(
      map((resp) => {
        return resp as User[];
      })
    );
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`, Utils.getHttpHeaders());
  }

  resgiterSubUser(user: User) {
    return this.httpClient.post(`${this.url}/`, user, Utils.getHttpHeaders());
  }

  editUser(id: number, user: User) {
    return this.httpClient
      .put(`${this.url}/${id}`, user, Utils.getHttpHeaders())
      .pipe(
        map((resp) => {
          this.loader.dismiss();
          console.log('resp', resp);
          return resp as User;
        })
      );
  }
}
