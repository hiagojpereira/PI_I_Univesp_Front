import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { PositionService } from '../../../services/position.service';
import { CommonService } from '../../../services/common.service';
import { Position } from '../../../models/position.model';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-position-read',
  imports: [HttpClientModule, MatTableModule, MatIconModule, MatDialogModule, MatCardModule,
    MatProgressSpinnerModule, CommonModule],
  templateUrl: './position-read.component.html',
  styleUrl: './position-read.component.css'
})
export class PositionReadComponent implements OnInit {
  dialog = inject(MatDialog);

  positions: Position[] = [];

  displayedColumns: string[] = ['Nome','Ações'];
  dataSource = this.positions;

  isLoading = false;

  constructor(
    private positionService: PositionService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPositions()
  }

  getPositions() {
    this.isLoading = true;
    this.positionService.read().subscribe({
      next: (positions) => {
        this.isLoading = false;
        this.positions = positions
        this.dataSource = this.positions;
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao carregar!', true);
      }
    })
  }

  edit(id: any) {
    this.router.navigate(['/position/update/'+id])
  } 

  openDialog(position: any) {
    this.dialog.open(PositionDialog, {
      data: {
        id: position.id,
        name: position.name,
        getPositionsFn: () => this.getPositions()
      },
    });
  }
}

@Component({
  selector: 'position-dialog',
  templateUrl: './position-dialog.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
})
export class PositionDialog {
  data = inject(MAT_DIALOG_DATA);

  constructor(
    private positionService: PositionService,
    private commonService: CommonService
  ){}

  delete(id: any) {
    this.positionService.delete(id).subscribe(() => {
      this.commonService.showMessage('Cargo removido com sucesso!')

      if (this.data.getPositionsFn) {
        this.data.getPositionsFn();
      }
    })
  }
}
