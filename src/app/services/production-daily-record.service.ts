import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonService } from './common.service';
import { ProductionDailyRecord, ProductionDailyRecordComplete } from '../models/production-daily-record.model';


@Injectable({
  providedIn: 'root'
})
export class ProductionDailyRecordService {

  urlBase = 'http://localhost:8000/api/production-daily-records/'
  urlBaseComplete = 'http://localhost:8000/api/production-daily-records-complete/'
  urlBaseDaily = 'http://localhost:8000/api/production-daily-record-complete/'

  constructor(
    private commonService: CommonService,
    private http: HttpClient
  ) { }
  
    create(record: any): Observable<any> {
        return this.http.post<any>(this.urlBaseDaily, record).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    read(): Observable<ProductionDailyRecordComplete[]> {
        return this.http.get<ProductionDailyRecordComplete[]>(this.urlBaseComplete).pipe(
            map(obj => {
            return obj 
            })
        )
    }

    readByCod(id_record: number): Observable<any> {
        const url = `${this.urlBaseDaily}${id_record}/`
        return this.http.get<any>(url).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    update(record: any): Observable<any> {
        const url = `${this.urlBaseDaily}${record.id}/`
        return this.http.put<any>(url, record).pipe(
            map(obj => obj),
            catchError(e => this.commonService.errorHandler(e))
        )
    }

    delete(id_record: number): Observable<ProductionDailyRecord> {
        const url = `${this.urlBase}${id_record}/`
        return this.http.delete<ProductionDailyRecord>(url).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }
}
