import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../components/template/header/header.service';
import { PositionReadComponent } from '../../components/position/position-read/position-read.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-position-crud',
  imports: [PositionReadComponent, MatButtonModule],
  templateUrl: './position-crud.component.html',
  styleUrl: './position-crud.component.css'
})
export class PositionCrudComponent {


  constructor(private router: Router, private headerService: HeaderService) { 
    
    headerService.headerData = {
      title: 'Cargos',
      icon: 'badge',
      routeUrl: '/position'
    }
  }

  navigateToPositonCreate() {
    this.router.navigate(['/position/create']);
  }

}
