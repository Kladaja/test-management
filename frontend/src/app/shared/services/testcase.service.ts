import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TestCase } from '../model/TestCase';

@Injectable({
  providedIn: 'root'
})
export class TestcaseService {

  constructor(private http: HttpClient) { }

  getByRequirement(requirementId: string): Observable<TestCase[]> {
    return this.http.get<TestCase[]>(`http://localhost:5000/app/testcases/getTestCasesByRequirement/${requirementId}`);
  }
}