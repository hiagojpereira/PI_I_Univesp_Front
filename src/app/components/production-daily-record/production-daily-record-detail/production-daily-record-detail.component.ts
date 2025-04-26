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
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeGet } from '../../../models/employee.model';

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
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './production-daily-record-detail.component.html',
  styleUrl: './production-daily-record-detail.component.css'
})
export class ProductionDailyRecordDetailComponent implements OnInit {

  record = {
    author: {
      id: '',
      name: '',
    },
    production_leader: {
      id: '',
      name: '',
    },
    date: '',
    finished_pastas: [],
    in_progress_pastas: [],
    pasta_machine_usages: [],
    cooked_pastas: [],
    pasta_stuffings: []
  }

  isLoading = false;  
  displayedColumnsFinishedPastas: string[] = ['Massa','Quantidade','Desperdicio'];
  dataSourceFinishedPastas = this.record.finished_pastas;

  displayedColumnsInProgressPastas: string[] = ['Colaborador','Massa','Quantidade'];
  dataSourceInProgressPastas = this.record.in_progress_pastas;

  displayedColumnsPastaMachineUsages: string[] = ['Colaborador','Masseiras'];
  dataSourcePastaMachineUsages = this.record.pasta_machine_usages;

  displayedColumnsCookedPastas: string[] = ['Colaborador','Cozimento', 'Quantidade', 'Descarte'];
  dataSourceCookedPastas = this.record.cooked_pastas;

  displayedColumnsPastaStuffings: string[] = ['Colaborador','Recheio', 'Receitas'];
  dataSourcePastaStuffings = this.record.pasta_stuffings;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recordService: ProductionDailyRecordService,
    private commonService: CommonService
  ) {

  }

  ngOnInit(): void {
    this.isLoading = true;

    const idRecord = this.route.snapshot.paramMap.get('idRecord')
    this.recordService.readByCod(idRecord != undefined ? Number(idRecord) : 0).subscribe({
      next: (rec) => {
        this.isLoading = false;
        this.record = rec
        this.dataSourceFinishedPastas = this.record.finished_pastas;
        this.dataSourceInProgressPastas = this.record.in_progress_pastas;
        this.dataSourcePastaMachineUsages = this.record.pasta_machine_usages;
        this.dataSourceCookedPastas = this.record.cooked_pastas;
        this.dataSourcePastaStuffings = this.record.pasta_stuffings;
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao carregar!', true);
      }
    })    
  }

  valor(value: any) {
    if (value == null){
      return 0
    }
    else {
      return value
    }
  }

  formateDate(Date: any) {
    let newDate = Date.split('-')
    return newDate[2]+'/'+newDate[1]+'/'+newDate[0]
  }
}
