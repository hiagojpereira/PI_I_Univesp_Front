import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Position } from '../../../models/position.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionService } from '../../../services/position.service';
import { CommonService } from '../../../services/common.service';

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
    ReactiveFormsModule
  ],
  templateUrl: './position-update.component.html',
  styleUrl: './position-update.component.css'
})
export class PositionUpdateComponent {

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
    const idPosition = this.route.snapshot.paramMap.get('idPosition')
    this.positionService.readByCod(idPosition != undefined ? Number(idPosition) : 0).subscribe(pos => {
      this.position = pos
    })
  }

  positionUpdate() {    
    this.positionService.update(this.position).subscribe(() => {
      this.commonService.showMessage('Cargo alterado com sucesso!')
      this.router.navigate(['/position'])
    })
  }

  cancel() {
    this.router.navigate(['/position'])
  }

}


