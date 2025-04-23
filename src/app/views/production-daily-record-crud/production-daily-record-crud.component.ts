import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../components/template/header/header.service';
import { MatButtonModule } from '@angular/material/button';
import { ProductionDailyRecordReadComponent } from '../../components/production-daily-record/production-daily-record-read/production-daily-record-read.component';

@Component({
  selector: 'app-production-daily-record-crud',
  imports: [ProductionDailyRecordReadComponent, MatButtonModule],
  templateUrl: './production-daily-record-crud.component.html',
  styleUrl: './production-daily-record-crud.component.css'
})
export class ProductionDailyRecordCrudComponent {
  constructor(private router: Router, private headerService: HeaderService) { 
    
    headerService.headerData = {
      title: 'Registros Diários de Produção',
      icon: 'article',
      routeUrl: '/records'
    }
  }

  navigateToProductionDailyRecordCreate() {
    this.router.navigate(['/records/create']);
  }

}
