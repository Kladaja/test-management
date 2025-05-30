import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Project } from '../model/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:5000/app/projects/getAllProjects', { withCredentials: true });
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<Project>(`http://localhost:5000/app/projects/getProjectById/${id}`, { withCredentials: true });
  }

  addProject(project: Project): Observable<any> {
    const body = new URLSearchParams();
    body.set('name', project.name);
    body.set('description', project.description || '');
    body.set('testers', JSON.stringify(project.testers || []));
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post('http://localhost:5000/app/projects/addProject', body, { headers: headers, withCredentials: true });
  }

  updateProject(id: string, project: Project): Observable<any> {
    const body = new URLSearchParams();
    body.set('name', project.name);
    body.set('description', project.description || '');
    body.set('testers', JSON.stringify(project.testers || []));
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.put(`http://localhost:5000/app/projects/updateProject/${id}`, body.toString(), { headers, withCredentials: true });
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/app/projects/deleteProject/${id}`, { withCredentials: true });
  }
}