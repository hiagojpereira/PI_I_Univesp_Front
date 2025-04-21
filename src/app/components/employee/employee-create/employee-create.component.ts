import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { Employee, EmployeeGet } from '../../../models/employee.model';
import { CommonService } from '../../../services/common.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PositionService } from '../../../services/position.service';
import { Position } from '../../../models/position.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-employee-create',
  imports: [CommonModule, 
    HttpClientModule, 
    MatCardModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent implements OnInit {
  selected: any;
  positions: Position[] = [];
  registration_numbers: any[] = [];
  isLoading = false;
  
  employee: EmployeeGet = {
    id: 0,
    name: '',
    registration_number: '',
    position: null,
    created_at: new Date(),
    updated_at: new Date()
  }

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    
    this.positionService.read().subscribe({
      next: (positions) => {
        this.positions = positions
        
        this.employeeService.readRegistrationNumber().subscribe({
          next: (numbers) => {
            this.isLoading = false;
            this.registration_numbers = numbers.map(x => x.registration_number)
          },
          error: () => {
            this.isLoading = false;
            this.commonService.showMessage('Erro ao carregar matrículas!', true);
          }
        })  
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao carregar positions!', true);
      }
    })


  }

  exist_number(number: Number) {
    return this.registration_numbers.findIndex(x => x == number) > -1 ? true : false
  }
  
  createEmployee(): void {
    this.employee.position = this.selected
    if (this.exist_number(this.employee.registration_number)) {
      this.commonService.showMessage('Matrícula já cadastrada, informe outro valor!', true)
      return
    }
    this.isLoading = true;
    this.employeeService.create(this.employee).subscribe({
      next: () => {
        this.isLoading = false;
        this.commonService.showMessage('Colaborador criado com sucesso!')
        this.router.navigate(['/employee'])
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao criar!', true);
      }

    })
  }

  cancel(): void {
    this.router.navigate(['/employee'])
  }

  onlyNumber(event: KeyboardEvent) {
    const charCode = event.key;
    if (!/^[0-9]$/.test(charCode)) {
      event.preventDefault();
    }
  }

  preventInvalidKeys(event: KeyboardEvent) {
    if (['e', 'E', '+', '-', ',', '.'].includes(event.key)) {
      event.preventDefault();
    }
  }
}
