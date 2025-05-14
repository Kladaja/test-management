import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Requirement } from '../model/Requirement';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {

  constructor(private http: HttpClient) { }

  getByProject(projectId: string): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`http://localhost:5000/app/requirements/getRequirementsByProject/${projectId}`, { withCredentials: true });
  }

  getRequirementById(id: string): Observable<Requirement> {
    return this.http.get<Requirement>(`http://localhost:5000/app/requirements/getRequirementById/${id}`, { withCredentials: true });
  }

  addRequirement(projectId: string, description: string): Observable<Requirement> {
    const body = new URLSearchParams();
    body.set('projectId', projectId);
    body.set('description', description || '');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<Requirement>(`http://localhost:5000/app/requirements/addRequirement`, body.toString(), { headers, withCredentials: true });
  }

  updateRequirement(id: string, description: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('description', description || '');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.put(`http://localhost:5000/app/requirements/updateRequirement/${id}`, body.toString(), { headers, withCredentials: true });
  }

  deleteRequirement(id: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/app/requirements/deleteRequirement/${id}`, { withCredentials: true });
  }
}