import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Testcase } from '../model/Testcase';

@Injectable({
  providedIn: 'root'
})
export class TestcaseService {

  constructor(private http: HttpClient) { }

  getTestcasesByRequirement(requirementId: string): Observable<Testcase[]> {
    return this.http.get<Testcase[]>(`http://localhost:5000/app/testcases/getTestcasesByRequirement/${requirementId}`, { withCredentials: true });
  }

  getTestcasesByProject(projectId: string): Observable<Testcase[]> {
    return this.http.get<Testcase[]>(`http://localhost:5000/app/testcases/getTestcasesByProject/${projectId}`, { withCredentials: true });
  }

  getTestcasesByTestcycle(testcycleId: string): Observable<Testcase[]> {
    return this.http.get<Testcase[]>(`http://localhost:5000/app/testcases/getTestcasesByTestcycle/${testcycleId}`, { withCredentials: true });
  }

  getTestcaseById(id: string): Observable<Testcase> {
    return this.http.get<Testcase>(`http://localhost:5000/app/testcases/getTestcaseById/${id}`, { withCredentials: true });
  }

  addTestcase(testcase: Testcase, requirementId: string, projectId: string) {
    const body = new URLSearchParams();
    body.set('title', testcase.title);
    body.set('description', testcase.description || '');
    body.set('steps', JSON.stringify(testcase.steps));
    body.set('expectedResult', testcase.expectedResult || '');
    body.set('status', testcase.status);
    body.set('requirementId', requirementId);
    body.set('projectId', projectId);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post('http://localhost:5000/app/testcases/addTestcase', body, { headers: headers, withCredentials: true });
  }

  addTestcaseToTestcycle(testcaseId: string, testcycleId: string): Observable<Testcase> {
    return this.http.post<Testcase>(`http://localhost:5000/app/testcases/${testcaseId}/addToTestcycle/${testcycleId}`, {}, { withCredentials: true });
  }

  deleteTestcase(id: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/app/testcases/deleteTestcase/${id}`, { withCredentials: true });
  }

  removeTestcaseFromTestcycle(testcaseId: string, testcycleId: string): Observable<Testcase> {
    return this.http.post<Testcase>(`http://localhost:5000/app/testcases/${testcaseId}/removeFromTestcycle/${testcycleId}`, {}, { withCredentials: true });
  }
}