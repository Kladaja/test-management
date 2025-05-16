import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Testcycle } from '../model/Testcycle';

@Injectable({
  providedIn: 'root'
})
export class TestcycleService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Testcycle[]> {
    return this.http.get<Testcycle[]>('http://localhost:5000/app/testcycles/getAllTestcycles', { withCredentials: true });
  }

  getTestcycleById(id: string): Observable<any> {
    return this.http.get<Testcycle>(`http://localhost:5000/app/testcycles/getTestcycleById/${id}`, { withCredentials: true });
  }

  addTestcycle(data: { name: string; description?: string; projectId: string }): Observable<any> {
    const body = new URLSearchParams();
    body.set('name', data.name);
    body.set('description', data.description || '');
    body.set('projectId', data.projectId);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post('http://localhost:5000/app/testcycles/addTestcycle', body.toString(), { headers, withCredentials: true });
  }

  updateTestcycle(id: string, testcycle: Testcycle): Observable<any> {
    const body = new URLSearchParams();
    body.set('name', testcycle.name);
    body.set('description', testcycle.description || '');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.put(`http://localhost:5000/app/testcycles/updateTestcycle/${id}`, body.toString(), { headers, withCredentials: true });
  }

  updateTestcycleTestcases(testcycleId: string, testcaseIds: string[]): Observable<any> {
    return this.http.put(`http://localhost:5000/app/testcycles/updateTestcycleTestcases/${testcycleId}`, { testcaseIds }, { withCredentials: true });
  }

  deleteTestcycle(id: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/app/testcycles/deleteTestcycle/${id}`, { withCredentials: true });
  }
}
