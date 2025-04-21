import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { EmployeeService } from '../../../services/employee.service';
import {   MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle, } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import {
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Position } from '../../../models/position.model';
import { CommonService } from '../../../services/common.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-employee-read',
  imports: [HttpClientModule, MatTableModule, MatIconModule, MatDialogModule, MatCardModule,
    MatProgressSpinnerModule, CommonModule],
  templateUrl: './employee-read.component.html',
  styleUrl: './employee-read.component.css'
})

export class EmployeeReadComponent implements OnInit {
  dialog = inject(MatDialog);

  employees: any[] = [];
  positions: Position[] = [];
  registration_numbers: any[] = [];

  displayedColumns: string[] = ['Nome', 'Número da Matrícula', 'Cargo Ocupado', 'Ações'];
  dataSource = this.employees;

  isLoading = false;

  constructor(
    private employeeService: EmployeeService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees() {
    this.isLoading = true;
    this.employeeService.read().subscribe({
      next: (emps) => {
        this.isLoading = false;
        this.employees = emps
        this.dataSource = this.employees;
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao carregar!', true);
      }

    })
  }

  edit(id: any) {
    this.router.navigate(['/employee/update/'+id])
  } 

  openDialog(employee: any) {
    this.dialog.open(EmployeeDialog, {
      data: {
        id: employee.id,
        name: employee.name,
        registration_number: employee.registration_number,
        position: employee.position,
        getEmployeesFn: () => this.getEmployees()
      },
    });
  }
}

@Component({
  selector: 'employee-dialog',
  templateUrl: './employee-dialog.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
})
export class EmployeeDialog {
  data = inject(MAT_DIALOG_DATA);

  constructor(
    private employeeService: EmployeeService,
    private commonService: CommonService
  ){}

  delete(id: any) {
    this.employeeService.delete(id).subscribe({
      next: () => {
        this.commonService.showMessage('Colaborador removido com sucesso!')

        if (this.data.getEmployeesFn) {
          this.data.getEmployeesFn();
        }
      },
      error: () => {
        this.commonService.showMessage('Erro ao remover!', true);
      }
    })
  }
}
