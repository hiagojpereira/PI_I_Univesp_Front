import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../components/template/header/header.service';
import { PastaReadComponent } from '../../components/pasta/pasta-read/pasta-read.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pasta-crud',
  imports: [PastaReadComponent, MatButtonModule],
  templateUrl: './pasta-crud.component.html',
  styleUrl: './pasta-crud.component.css'
})
export class PastaCrudComponent {

  constructor(private router: Router, private headerService: HeaderService) { 
    
    headerService.headerData = {
      title: 'Massas',
      icon: 'soup_kitchen',
      routeUrl: '/pasta'
    }
  }

  navigateToPastaCreate() {
    this.router.navigate(['/pasta/create']);
  }

}
