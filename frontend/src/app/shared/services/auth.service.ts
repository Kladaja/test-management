import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuth().subscribe({
      next: (isAuth) => this.loggedIn.next(isAuth),
      error: () => this.loggedIn.next(false)
    });
  }

  login(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/auth/login', body, { headers: headers, withCredentials: true }).pipe(
      tap(() => this.loggedIn.next(true))
    );
  }

  register(user: User) {
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('firstName', user.firstName);
    body.set('lastName', user.lastName);
    body.set('password', user.password);
    body.set('role', user.role);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/auth/register', body, { headers: headers });
  }

  logout() {
    return this.http.post('http://localhost:5000/app/auth/logout', {}, { withCredentials: true, responseType: 'text' }).pipe(
      tap(() => this.loggedIn.next(false))
    );
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5000/app/auth/checkAuth', { withCredentials: true });
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }
}