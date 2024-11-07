import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from './app.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // http://localhost:8080/myapi
  // http://localhost:7001/employee-weblogic/myapi
  private apiUrl = 'http://localhost:7001/employee-weblogic/myapi';

  constructor(private http: HttpClient) { }

  fetchEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
    // return of([{name : "venz", company_id:"123123",age:18}
    //   ,{name : "venz", company_id:"123123",age:21}]);
  }

  addEmployee(employee?: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Employee>(this.apiUrl, employee, { headers });
  }

  editEmployee(employee?: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Employee>(`${this.apiUrl}/${employee?.id}`, employee, { headers });
  }

  deleteEmployee(employee?: Employee): Observable<Employee> {
    return this.http.delete<any>(`${this.apiUrl}/${employee?.id}`);
  }
}
