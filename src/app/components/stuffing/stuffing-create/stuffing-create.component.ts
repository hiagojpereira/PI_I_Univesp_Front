import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { StuffingService } from '../../../services/stuffing.service';
import { Stuffing } from '../../../models/stuffing.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-stuffing-create',
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
  templateUrl: './stuffing-create.component.html',
  styleUrl: './stuffing-create.component.css'
})
export class StuffingCreateComponent implements OnInit{
  isLoading = false;

  stuffing: Stuffing = {
    id: 0,
    name: '',
    created_at: new Date(),
    updated_at: new Date()
  }

  constructor(
    private router: Router,
    private stuffingService: StuffingService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }
  
  createStuffing(): void {
    this.isLoading = true;
    
    this.stuffingService.create(this.stuffing).subscribe({
      next: () => {
        this.isLoading = false;
        this.commonService.showMessage('Recheio criado com sucesso!')
        this.router.navigate(['/stuffing'])
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao carregar positions!', true);
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/stuffing'])
  }

}
