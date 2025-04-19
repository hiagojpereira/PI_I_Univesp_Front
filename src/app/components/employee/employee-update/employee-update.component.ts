import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeGet } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PositionService } from '../../../services/position.service';
import { Position } from '../../../models/position.model';
import { CommonService } from '../../../services/common.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

interface Animal {
  name: string;
  sound: string;
}

@Component({
  standalone: true,
  selector: 'app-employee-update',
  imports: [
    CommonModule, 
    HttpClientModule, 
    MatCardModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent implements OnInit {
  selected: any;
  positions: Position[] = [];
  registration_numbers: any[] = [];
  old_reg_num: any;

  employee: EmployeeGet = {
    id: 0,
    name: '',
    registration_number: 0,
    position: null,
    created_at: '',
    updated_at: ''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private commonService: CommonService
  ) {

  }

  ngOnInit(): void {
    const idEmployee = this.route.snapshot.paramMap.get('idEmployee')
    this.employeeService.readByCod(idEmployee != undefined ? Number(idEmployee) : 0).subscribe(emp => {
      this.employee = emp
      this.selected = this.employee.position.id
      this.old_reg_num = this.employee.registration_number
    })
    this.positionService.read().subscribe(positions => {
      this.positions = positions
    })  
    this.employeeService.readRegistrationNumber().subscribe(numbers => {
      this.registration_numbers = numbers.map(x => x.registration_number)
    })  
  }

  exist_number(number: Number) {
    return this.registration_numbers.findIndex(x => x == number) > -1 && this.old_reg_num != number? true : false
  }

  employeeUpdate() {    
    this.employee.position = Number(this.selected)
    let new_reg_num = Number(this.employee.registration_number)
    debugger
    if (this.exist_number(new_reg_num)) {
      this.commonService.showMessage('Matrícula já cadastrada, informe outro valor!', true)
      return
    }
    this.employeeService.update(this.employee).subscribe(() => {
      this.commonService.showMessage('Colaborador alterado com sucesso!')
      this.router.navigate(['/employee'])
    })
  }

  cancel() {
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
