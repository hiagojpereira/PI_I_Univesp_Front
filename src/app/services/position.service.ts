import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Position } from '../models/position.model';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  urlBase = 'http://localhost:8000/api/positions/'

  constructor(
    private commonService: CommonService,
    private http: HttpClient
  ) { }
  
    create(position: Position): Observable<Position> {
        return this.http.post<Position>(this.urlBase, position).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    read(): Observable<Position[]> {
        return this.http.get<Position[]>(this.urlBase).pipe(
            map(obj => {
            return obj 
            })
        )
    }

    readByCod(id_position: number): Observable<Position> {
        const url = `${this.urlBase}${id_position}/`
        return this.http.get<Position>(url).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    update(position: Position): Observable<Position> {
        console.log(position)
        const url = `${this.urlBase}${position.id}/`
        console.log(url)
        return this.http.put<Position>(url, position).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    delete(id_position: number): Observable<Position> {
        const url = `${this.urlBase}${id_position}/`
        console.log(url)
        return this.http.delete<Position>(url).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }
}
