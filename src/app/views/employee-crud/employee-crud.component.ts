import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../components/template/header/header.service';
import { EmployeeReadComponent } from '../../components/employee/employee-read/employee-read.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee-crud',
  imports: [EmployeeReadComponent, MatButtonModule, HttpClientModule],
  templateUrl: './employee-crud.component.html',
  styleUrl: './employee-crud.component.css'
})
export class EmployeeCrudComponent {
  constructor(private router: Router, private headerService: HeaderService) { 
    
    headerService.headerData = {
      title: 'Colaboradores',
      icon: 'face',
      routeUrl: '/employee'
    }
  }

  navigateToEmployeeCreate() {
    this.router.navigate(['/employee/create']);
  }
}
