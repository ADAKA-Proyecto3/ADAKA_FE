import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/app/config/config';
import { User } from '../../models/user.interface';
import { Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadActiveUser } from 'src/app/store/actions/activeUser.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = Config.BASE_URL;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store<AppState>
  ) {}


  async login(loginRequest: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${this.baseUrl}/login`, loginRequest).subscribe({
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

  checkAuthentication(): Observable<boolean> | boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    } else {
      return true;
    }
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  checkSignedInUser(): void {
    const loginInfo = sessionStorage.getItem('login');
    const userEmail = loginInfo ? JSON.parse(loginInfo).user : '';

    this.store.dispatch(loadActiveUser({ email: userEmail }));
  }
}
