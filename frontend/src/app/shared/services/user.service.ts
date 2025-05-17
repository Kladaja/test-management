import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(
      'http://localhost:5000/app/users/getAllUsers',
      { withCredentials: true }
    );
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<User>(
      `http://localhost:5000/app/users/getUserById/${id}`,
      { withCredentials: true }
    );
  }

  getCurrentUser() {
    return this.http.get<User>(
      'http://localhost:5000/app/users/getCurrentUser',
      { withCredentials: true }
    );
  }

  updateUser(id: string, user: User): Observable<any> {
    const body = new URLSearchParams();
    body.set('firstName', user.firstName);
    body.set('lastName', user.lastName);
    body.set('email', user.email);
    body.set('role', user.role);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.put(
      `http://localhost:5000/app/users/updateUser/${id}`,
      body.toString(),
      { headers, withCredentials: true }
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(
      `http://localhost:5000/app/users/deleteUser/${id}`,
      { withCredentials: true }
    );
  }
}
