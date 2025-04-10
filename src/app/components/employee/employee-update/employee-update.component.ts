import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-update',
  imports: [],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent implements OnInit {
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    const idEmployee = this.route.snapshot.paramMap.get('idEmployee')
    debugger
  }

}
