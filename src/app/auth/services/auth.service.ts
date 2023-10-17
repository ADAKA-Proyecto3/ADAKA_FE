import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/app/config/config';
import { User } from '../../models/user.interface';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // private baseUrl = Config.BASE_URL;
  private user?: User;
 // constructor(private httpClient: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string):boolean | undefined
   //Observable<User> 
   {

    console.log('login en servicio', email, password);

    if(email && password) return true;

    return false;
  //  return this.httpClient
  //     .post<User>(`${this.baseUrl}auth/login`, { email, password })
  //     .pipe(
  //       tap((user) => (this.user = user)),
  //       tap((user) => localStorage.setItem('token', user.id.toString()))
  //     );
  
  }

  checkAuthentication(): Observable<boolean> | boolean {
    //if (!localStorage.getItem('token')) return false;

    //const token = localStorage.getItem('token');

    return of (true)
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}
