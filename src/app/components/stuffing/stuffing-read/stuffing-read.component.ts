import { Component, inject, OnInit } from '@angular/core';
import { StuffingService } from '../../../services/stuffing.service';
import { CommonService } from '../../../services/common.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Stuffing } from '../../../models/stuffing.model';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stuffing-read',
  imports: [HttpClientModule, MatTableModule, MatIconModule, MatDialogModule, MatCardModule,
    MatProgressSpinnerModule, CommonModule],
  templateUrl: './stuffing-read.component.html',
  styleUrl: './stuffing-read.component.css'
})
export class StuffingReadComponent implements OnInit {
  dialog = inject(MatDialog);

  stuffings: Stuffing[] = [];

  displayedColumns: string[] = ['Nome','Ações'];
  dataSource = this.stuffings;

  isLoading = false;

  constructor(
    private stuffingService: StuffingService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStuffings()
  }

  getStuffings() {
    this.isLoading = true;
    this.stuffingService.read().subscribe({
      next: (stuffings) => {
        this.isLoading = false;
        this.stuffings = stuffings
        this.dataSource = this.stuffings;
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao carregar!', true);
      }
    })
  }

  edit(id: any) {
    this.router.navigate(['/stuffing/update/'+id])
  } 

  openDialog(stuffing: any) {
    this.dialog.open(StuffingDialog, {
      data: {
        id: stuffing.id,
        name: stuffing.name,
        getStuffingsFn: () => this.getStuffings()
      },
    });
  }
}


@Component({
  selector: 'stuffing-dialog',
  templateUrl: './stuffing-dialog.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
})
export class StuffingDialog {
  data = inject(MAT_DIALOG_DATA);

  constructor(
    private stuffingService: StuffingService,
    private commonService: CommonService
  ){}

  delete(id: any) {
    this.stuffingService.delete(id).subscribe(() => {
      this.commonService.showMessage('Recheio removido com sucesso!')

      if (this.data.getStuffingsFn) {
        this.data.getStuffingsFn();
      }
    })
  }
}
