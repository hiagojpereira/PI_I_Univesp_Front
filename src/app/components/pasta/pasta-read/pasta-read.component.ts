import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { PastaService } from '../../../services/pasta.service';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';
import { Pasta } from '../../../models/pasta.model';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pasta-read',
  imports: [HttpClientModule, MatTableModule, MatIconModule, MatDialogModule, MatCardModule,
    MatProgressSpinnerModule, CommonModule],
  templateUrl: './pasta-read.component.html',
  styleUrl: './pasta-read.component.css'
})
export class PastaReadComponent {
  dialog = inject(MatDialog);

  pastas: Pasta[] = [];

  displayedColumns: string[] = ['Nome','Ações'];
  dataSource = this.pastas;

  isLoading = false;

  constructor(
    private pastaService: PastaService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPastas()
  }

  getPastas() {
    this.isLoading = true;
    this.pastaService.read().subscribe({
      next: (pastas) => {
        this.isLoading = false;
        this.pastas = pastas
        this.dataSource = this.pastas;
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao carregar!', true);
      }

    })
  }

  

  edit(id: any) {
    this.router.navigate(['/pasta/update/'+id])
  } 

  openDialog(position: any) {
    this.dialog.open(PastaDialog, {
      data: {
        id: position.id,
        name: position.name,
        getPastasFn: () => this.getPastas()
      },
    });
  }
}


@Component({
  selector: 'pasta-dialog',
  templateUrl: './pasta-dialog.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
})
export class PastaDialog {
  data = inject(MAT_DIALOG_DATA);

  constructor(
    private pastaService: PastaService,
    private commonService: CommonService
  ){}

  delete(id: any) {
    this.pastaService.delete(id).subscribe(() => {
      this.commonService.showMessage('Massa removida com sucesso!')

      if (this.data.getPastasFn) {
        this.data.getPastasFn();
      }
    })
  }
}
