import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../components/template/header/header.service';
import { MatButtonModule } from '@angular/material/button';
import { StuffingReadComponent } from '../../components/stuffing/stuffing-read/stuffing-read.component';

@Component({
  selector: 'app-stuffing-crud',
  imports: [StuffingReadComponent, MatButtonModule],
  templateUrl: './stuffing-crud.component.html',
  styleUrl: './stuffing-crud.component.css'
})
export class StuffingCrudComponent {
  constructor(private router: Router, private headerService: HeaderService) { 
    
    headerService.headerData = {
      title: 'Recheios',
      icon: 'cookie',
      routeUrl: '/stuffing'
    }
  }

  navigateToStuffingCreate() {
    this.router.navigate(['/stuffing/create']);
  }

}
