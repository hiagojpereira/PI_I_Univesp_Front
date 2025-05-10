import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductionDailyRecordService } from '../../../services/production-daily-record.service';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';
import { ProductionDailyRecord, ProductionDailyRecordComplete } from '../../../models/production-daily-record.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { Position } from '../../../models/position.model';

@Component({
  selector: 'app-production-daily-record-read',
  imports: [CommonModule, MatProgressSpinnerModule, HttpClientModule, MatTableModule, MatIconModule, MatDialogModule, MatCardModule],
  templateUrl: './production-daily-record-read.component.html',
  styleUrl: './production-daily-record-read.component.css'
})
export class ProductionDailyRecordReadComponent implements OnInit {

  dialog = inject(MatDialog);

  records: ProductionDailyRecordComplete[] = [];

  employees : Employee[] = [];

  displayedColumns: string[] = ['Data', 'Autor', 'Lider de Produção','Ações'];
  dataSource = this.records;

  isLoading = false;

  constructor(
    private recordService: ProductionDailyRecordService,
    private commonService: CommonService,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.getRecords()
  }

  getRecords() {
    this.isLoading = true;

    

    this.employeeService.read().subscribe({
      next: (emps) => {
        this.employees = emps

        this.recordService.read().subscribe({
          next: (records) => {
            records.forEach(element => {
              element.author = this.getNamePosition(element.author);
              element.production_leader = this.getNamePosition(element.production_leader);
            });

            this.isLoading = false;
            this.records = records
            this.dataSource = this.records;
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

  edit(id: any) {
    this.router.navigate(['/records/update/'+id])
  } 

  detail(id: any) {
    this.router.navigate(['/records/detail/'+id])
  } 

  formatarDataString(data: string) {
    let anoMesDia = (data.split('T')[0]).split('-')
    return anoMesDia[2] + "/" + anoMesDia[1] + "/" + anoMesDia[0] 
  }

  openDialog(record: any) {
    this.dialog.open(RecordDialog, {
      data: {
        record: record,
        getRecordsFn: () => this.getRecords()
      },
    });
  }
}


@Component({
  selector: 'record-dialog',
  templateUrl: './record-dialog.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
})
export class RecordDialog {
  data = inject(MAT_DIALOG_DATA);

  constructor(
    private recordService: ProductionDailyRecordService,
    private commonService: CommonService
  ){}

  delete(id: any) {
    this.recordService.delete(id).subscribe(() => {
      this.commonService.showMessage('Registro removido com sucesso!')

      if (this.data.getRecordsFn) {
        this.data.getRecordsFn();
      }
    })
  }

  formatarDataString(data: any) {
    let anoMesDia = (data.split('T')[0]).split('-')
    return anoMesDia[2] + "/" + anoMesDia[1] + "/" + anoMesDia[0] 
  }
}
