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
import { Employee, EmployeeGet } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';

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
  employees : Employee[] = []

  record = {
    id: '',
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

  displayedColumnsInProgressPastas: string[] = ['Colaborador','Massa','Quantidade'];

  displayedColumnsPastaMachineUsages: string[] = ['Colaborador','Masseiras'];

  displayedColumnsCookedPastas: string[] = ['Colaborador','Cozimento', 'Quantidade', 'Descarte'];

  displayedColumnsPastaStuffings: string[] = ['Colaborador','Recheio', 'Receitas'];

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private recordService: ProductionDailyRecordService,
    private commonService: CommonService
  ) {

  }

  ngOnInit(): void {
    this.isLoading = true;

    this.employeeService.read().subscribe({
      next: (emps) => {
        this.employees = emps

        const idRecord = this.route.snapshot.paramMap.get('idRecord')
        this.recordService.readByCod(idRecord != undefined ? Number(idRecord) : 0).subscribe({
          next: (rec) => {
            this.isLoading = false;

            this.record.id = rec.id
            this.record.author = this.getNamePosition(rec.author)
            this.record.production_leader = this.getNamePosition(rec.production_leader)
            this.record.date = rec.date
            this.record.finished_pastas = rec.finished_pastas_read
            this.record.in_progress_pastas = this.getNamePositionInList(rec.in_progress_pastas_read)
            this.record.pasta_machine_usages = this.getNamePositionInList(rec.pasta_machine_usages_read)
            this.record.cooked_pastas = this.getNamePositionInList(rec.cooked_pastas_read)
            this.record.pasta_stuffings = this.getNamePositionInList(rec.pasta_stuffings_read)
          },
          error: () => {
            this.isLoading = false;
            this.commonService.showMessage('Erro ao carregar!', true);
          }
        })    

      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao carregar!', true);
      }
    })
  }

  getNamePositionInList(list: any) {
    list.forEach((x: { employee: any; }) => { 
      x.employee = this.getNamePosition(x.employee)
    });
    return list
  }

  getNamePosition(emp: any) {
    let position = this.getPosition(emp.id)
    emp.name = emp.name + ' - ' + position
    return emp
  }

  getPosition(id: any) {
    return this.employees.filter(x => x.id == id).map(x => x.position)[0].name
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
