import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  urlBase = 'http://localhost:8000/api/employees/'
  urlGetBase = 'http://localhost:8000/api/employees/get/'

  constructor(
    private commonService: CommonService,
    private http: HttpClient
  ) { }
  
    create(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.urlBase, employee).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    read(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.urlGetBase).pipe(
            map(obj => {
            return obj 
            })
        )
    }

    readByCod(id_employee: number): Observable<Employee> {
        const url = `${this.urlGetBase}${id_employee}/`
        return this.http.get<Employee>(url).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    readRegistrationNumber():Observable<any[]> {
        const url = `${this.urlGetBase}registration_number/`
        return this.http.get<any[]>(url).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    update(employee: Employee): Observable<Employee> {
        console.log(employee)
        const url = `${this.urlBase}${employee.id}/`
        console.log(url)
        return this.http.put<Employee>(url, employee).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    delete(id_employee: number): Observable<Employee> {
        const url = `${this.urlBase}${id_employee}/`
        console.log(url)
        return this.http.delete<Employee>(url).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }
}
