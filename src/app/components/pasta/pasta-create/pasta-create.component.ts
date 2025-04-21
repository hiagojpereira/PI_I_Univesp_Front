import { Component, OnInit } from '@angular/core';
import { Pasta } from '../../../models/pasta.model';
import { Router } from '@angular/router';
import { PastaService } from '../../../services/pasta.service';
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
  selector: 'app-pasta-create',
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
  templateUrl: './pasta-create.component.html',
  styleUrl: './pasta-create.component.css'
})
export class PastaCreateComponent implements OnInit {
  isLoading = false;

  pasta: Pasta = {
    id: 0,
    name: '',
    created_at: new Date(),
    updated_at: new Date()
  }

  constructor(
    private router: Router,
    private pastaService: PastaService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }
  
  createPasta(): void {
    this.isLoading = true;
    
    this.pastaService.create(this.pasta).subscribe({
      next: () => {
        this.isLoading = false;
        this.commonService.showMessage('Massa criada com sucesso!')
        this.router.navigate(['/pasta'])
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao carregar positions!', true);
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/pasta'])
  }
}
