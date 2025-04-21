import { Stuffing } from '../models/stuffing.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class StuffingService {

  urlBase = 'http://localhost:8000/api/stuffings/'

  constructor(
    private commonService: CommonService,
    private http: HttpClient
  ) { }
  
    create(stuffing: Stuffing): Observable<Stuffing> {
        return this.http.post<Stuffing>(this.urlBase, stuffing).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    read(): Observable<Stuffing[]> {
        return this.http.get<Stuffing[]>(this.urlBase).pipe(
            map(obj => {
            return obj 
            })
        )
    }

    readByCod(id_stuffing: number): Observable<Stuffing> {
        const url = `${this.urlBase}${id_stuffing}/`
        return this.http.get<Stuffing>(url).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    update(stuffing: Stuffing): Observable<Stuffing> {
        console.log(stuffing)
        const url = `${this.urlBase}${stuffing.id}/`
        console.log(url)
        return this.http.put<Stuffing>(url, stuffing).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    delete(id_stuffing: number): Observable<Stuffing> {
        const url = `${this.urlBase}${id_stuffing}/`
        console.log(url)
        return this.http.delete<Stuffing>(url).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }
}
