import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { Employee } from '../employee.model';
// import { EmployeeService } from '../employee.service';
import { map, Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-employee-read',
  imports: [HttpClientModule, MatTableModule],
  templateUrl: './employee-read.component.html',
  styleUrl: './employee-read.component.css'
})

export class EmployeeReadComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { 

  }

  ngOnInit(): void {
    this.read().subscribe(emps => 
      {
        debugger
        this.employees = emps
        this.dataSource = this.employees;
      }
    )
  }

  employees: any[] = [];

  displayedColumns: string[] = ['Nome', 'Número da Matrícula', 'Cargo Ocupado', 'Ações'];
  dataSource = this.employees;

  urlBase = 'http://localhost:8000/api/employees/'

  read(): Observable<Employee[]> {
      return this.http.get<Employee[]>(this.urlBase).pipe(
          map(obj => {
            debugger 
            return obj 
          })
      )
  }

  getEmployee() {
    this.http.get('http://localhost:8000/api/employees/1/').subscribe(
      response => { 
        debugger
        console.log('Upload bem-sucedido:', response) 
      },
      error => { 
        debugger
        console.error('Erro no upload:', error)
      }
    );
  }

  getEmployees() {
    this.http.get('http://localhost:8000/api/employees/').subscribe(
      response => { 
        debugger
        // response.array.forEach(element => {
        //   this.employees.map(element);          
        // });
        console.log('Upload bem-sucedido:', response) 
      },
      error => { 
        debugger
        console.error('Erro no upload:', error)
      }
    );
  }
}
