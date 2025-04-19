import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterModule, MatSidenavModule, MatListModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
