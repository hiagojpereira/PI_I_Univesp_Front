import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {   MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef, } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


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
      // panelClass: isError ? ['blue-snackbar'] : ['blue-snackbar']
      panelClass: isError ? ['msg-error'] : ['msg-success']
      
    })
  }

  errorHandler(e: any): Observable<any> {
    console.log(e.error.erro)
    this.showMessage(e.error.erro, true)
    return EMPTY
  }

}
