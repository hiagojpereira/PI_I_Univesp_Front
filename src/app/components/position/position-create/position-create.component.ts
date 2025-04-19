import { Component, OnInit } from '@angular/core';
import { Position } from '../../../models/position.model';
import { Router } from '@angular/router';
import { PositionService } from '../../../services/position.service';
import { CommonService } from '../../../services/common.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-position-create',
  imports: [
    CommonModule, 
    HttpClientModule, 
    MatCardModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './position-create.component.html',
  styleUrl: './position-create.component.css'
})
export class PositionCreateComponent implements OnInit {
  position: Position = {
    id: 0,
    name: '',
    created_at: new Date(),
    updated_at: new Date()
  }

  constructor(
    private router: Router,
    private positionService: PositionService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }
  
  createPosition(): void {
    this.positionService.create(this.position).subscribe(() => {
      this.commonService.showMessage('Cargo criado com sucesso!')
      this.router.navigate(['/position'])
    })
  }

  cancel(): void {
    this.router.navigate(['/position'])
  }

}
