import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { HeaderService } from '../../components/template/header/header.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
}
