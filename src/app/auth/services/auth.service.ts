import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/app/config/config';
import { User } from '../../models/user.interface';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = Config.BASE_URL;
  private user?: User;
  constructor(private httpClient: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

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
    this.user = undefined;
    localStorage.clear();
    sessionStorage.clear();
  }
}
