import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { Config } from 'src/app/config/config';
import { DebugerService } from '../debug-service/debug.service';
import { map } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  private url = `${Config.BASE_URL}/user`;

  constructor(
    private readonly httpClient: HttpClient,
    private loader: LoadingService
    ) {}

  saveUser(user:User): Promise<void> {
    DebugerService.log('Submitting POST to HTTP Server user/');
  
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${this.url}/`,  user ).subscribe({
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
    //this.loader.showLoadingModal();
    return this.httpClient.get(`${this.url}/all`)
    .pipe(
      map(resp => {
        console.log("resp", resp);
       // this.loader.dismiss();
        return resp as User[];
      })
    );
  }

  deleteUser( id: number){
    return this.httpClient.delete(`${this.url}/${id}`)
  }

  resgiterSubUser(user: User) {
    return this.httpClient.post(`${this.url}/`, user);
  }


  editUser(id: number, user: User) {
    this.loader.showLoadingModal();
    return this.httpClient.put(`${this.url}/${id}`, user)
    .pipe(
      map(resp => {
        this.loader.dismiss();
        console.log("resp", resp);
        return resp as User;
      })
    );
  }
}
