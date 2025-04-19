import { Pasta } from '../models/pasta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class PastaService {

  urlBase = 'http://localhost:8000/api/pastas'

  constructor(
    private commonService: CommonService,
    private http: HttpClient
  ) { }
  
    create(pasta: Pasta): Observable<Pasta> {
        return this.http.post<Pasta>(this.urlBase, pasta).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    read(): Observable<Pasta[]> {
        return this.http.get<Pasta[]>(this.urlBase).pipe(
            map(obj => {
            return obj 
            })
        )
    }

    readByCod(id_pasta: number): Observable<Pasta> {
        const url = `${this.urlBase}/${id_pasta}/`
        return this.http.get<Pasta>(url).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    update(pasta: Pasta): Observable<Pasta> {
        console.log(pasta)
        const url = `${this.urlBase}/${pasta.id}/`
        console.log(url)
        return this.http.put<Pasta>(url, pasta).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    delete(id_pasta: number): Observable<Pasta> {
        const url = `${this.urlBase}/${id_pasta}/`
        console.log(url)
        return this.http.delete<Pasta>(url).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }
}
