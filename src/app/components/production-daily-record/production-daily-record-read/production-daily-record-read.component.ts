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

@Component({
  selector: 'app-production-daily-record-read',
  imports: [CommonModule, MatProgressSpinnerModule, HttpClientModule, MatTableModule, MatIconModule, MatDialogModule, MatCardModule],
  templateUrl: './production-daily-record-read.component.html',
  styleUrl: './production-daily-record-read.component.css'
})
export class ProductionDailyRecordReadComponent implements OnInit {

  dialog = inject(MatDialog);

  records: ProductionDailyRecordComplete[] = [];


  displayedColumns: string[] = ['Data', 'Autor', 'Lider de Produção','Ações'];
  dataSource = this.records;

  isLoading = false;

  constructor(
    private recordService: ProductionDailyRecordService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRecords()
  }

  getRecords() {
    this.isLoading = true;
    this.recordService.read().subscribe({
      next: (records) => {
        this.isLoading = false;
        this.records = records
        this.dataSource = this.records;
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao carregar!', true);
      }
    })
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
        created_at: record.created_at,
        author: record.author,
        production_leader: record.production_leader,
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

  formatarDataString(data: string) {
    let anoMesDia = (data.split('T')[0]).split('-')
    return anoMesDia[2] + "/" + anoMesDia[1] + "/" + anoMesDia[0] 
  }
}
