import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductionDailyRecordService } from '../../../services/production-daily-record.service';
import { CommonService } from '../../../services/common.service';
import { ProductionDailyRecord, ProductionDailyRecordComplete } from '../../../models/production-daily-record.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-production-daily-record-detail',
  imports: [    
    CommonModule, 
    HttpClientModule, 
    MatCardModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule],
  templateUrl: './production-daily-record-detail.component.html',
  styleUrl: './production-daily-record-detail.component.css'
})
export class ProductionDailyRecordDetailComponent implements OnInit {
  isLoading = false;

  record: ProductionDailyRecordComplete = {
    id: 0,
    author: '',
    production_leader: '',
    created_at: '',
    updated_at: ''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recordService: ProductionDailyRecordService,
    private commonService: CommonService
  ) {

  }

  ngOnInit(): void {
    debugger
    this.isLoading = true;

    const idRecord = this.route.snapshot.paramMap.get('idRecord')
    this.recordService.readByCod(idRecord != undefined ? Number(idRecord) : 0).subscribe({
      next: (rec) => {
        debugger
        this.isLoading = false;
        this.record = rec
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao carregar!', true);
      }
    })    
  }

}
