import { Component, OnInit } from '@angular/core';
import { Pasta } from '../../../models/pasta.model';
import { PastaService } from '../../../services/pasta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pasta-update',
  imports: [
    CommonModule, 
    HttpClientModule, 
    MatCardModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './pasta-update.component.html',
  styleUrl: './pasta-update.component.css'
})
export class PastaUpdateComponent implements OnInit {
  isLoading = false;

  pasta: Pasta = {
    id: 0,
    name: '',
    created_at: '',
    updated_at: ''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pastaService: PastaService,
    private commonService: CommonService
  ) {

  }

  ngOnInit(): void {
    this.isLoading = true;

    const idPasta = this.route.snapshot.paramMap.get('idPasta')
    this.pastaService.readByCod(idPasta != undefined ? Number(idPasta) : 0).subscribe({
      next: (pasta) => {
        this.isLoading = false;
        this.pasta = pasta
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao atualizar a massa!', true);
      }
    })  
  }

  pastaUpdate() {   
    this.isLoading = true;

    this.pastaService.update(this.pasta).subscribe({
      next: () => {
        this.isLoading = false;
        this.commonService.showMessage('Massa alterada com sucesso!')
        this.router.navigate(['/pasta'])
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao atualizar a massa!', true);
      }
    })  
  }

  cancel() {
    this.router.navigate(['/pasta'])
  }

}
