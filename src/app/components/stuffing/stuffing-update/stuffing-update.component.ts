import { Component, OnInit } from '@angular/core';
import { Stuffing } from '../../../models/stuffing.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { StuffingService } from '../../../services/stuffing.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-stuffing-update',
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
  templateUrl: './stuffing-update.component.html',
  styleUrl: './stuffing-update.component.css'
})
export class StuffingUpdateComponent implements OnInit {
  isLoading = false;

  stuffing: Stuffing = {
    id: 0,
    name: '',
    created_at: '',
    updated_at: ''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stuffingService: StuffingService,
    private commonService: CommonService
  ) {

  }

  ngOnInit(): void {
    this.isLoading = true;

    const idStuffing = this.route.snapshot.paramMap.get('idStuffing')
    this.stuffingService.readByCod(idStuffing != undefined ? Number(idStuffing) : 0).subscribe({
      next: (stuff) => {
        this.isLoading = false;
        this.stuffing = stuff
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao atualizar o recheio!', true);
      }
    })  
  }

  stuffingUpdate() {
    this.isLoading = true;

    this.stuffingService.update(this.stuffing).subscribe({
      next: () => {
        this.isLoading = false;
        this.commonService.showMessage('Recheio alterado com sucesso!')
        this.router.navigate(['/stuffing'])
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao atualizar o recheio!', true);
      }
    })  
  }

  cancel() {
    this.router.navigate(['/stuffing'])
  }

}
