import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {   MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: isError ? ['msg-error'] : ['msg-success']
      
    })
  }

  errorHandler(e: any): Observable<any> {
    console.log(e.error.erro)
    this.showMessage(e.error.erro, true)
    return EMPTY
  }

}
