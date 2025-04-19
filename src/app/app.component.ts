import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/template/header/header.component';
import { NavComponent } from './components/template/nav/nav.component';
import { FooterComponent } from './components/template/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PI_I_Univesp_Front';
}
