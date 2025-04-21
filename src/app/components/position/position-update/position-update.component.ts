import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Position } from '../../../models/position.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionService } from '../../../services/position.service';
import { CommonService } from '../../../services/common.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-position-update',
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
  templateUrl: './position-update.component.html',
  styleUrl: './position-update.component.css'
})
export class PositionUpdateComponent implements OnInit {
  isLoading = false;

  position: Position = {
    id: 0,
    name: '',
    created_at: '',
    updated_at: ''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private positionService: PositionService,
    private commonService: CommonService
  ) {

  }

  ngOnInit(): void {
    this.isLoading = true;

    const idPosition = this.route.snapshot.paramMap.get('idPosition')
    this.positionService.readByCod(idPosition != undefined ? Number(idPosition) : 0).subscribe({
      next: (pos) => {
        this.isLoading = false;
        this.position = pos
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao carregar o cargo!', true);
      }
    })    
  }

  positionUpdate() {    
    this.isLoading = true;

    this.positionService.update(this.position).subscribe({
      next: () => {
        this.isLoading = false;
        this.commonService.showMessage('Cargo alterado com sucesso!')
        this.router.navigate(['/position'])
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao atualizar o cargo!', true);
      }
    })  
  }

  cancel() {
    this.router.navigate(['/position'])
  }

}


