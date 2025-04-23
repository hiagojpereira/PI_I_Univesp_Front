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

  constructor(
    private commonService: CommonService,
    private http: HttpClient
  ) { }
  
    create(record: ProductionDailyRecord): Observable<ProductionDailyRecord> {
        return this.http.post<ProductionDailyRecord>(this.urlBase, record).pipe(
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

    readByCod(id_record: number): Observable<ProductionDailyRecordComplete> {
        const url = `${this.urlBaseComplete}${id_record}/`
        return this.http.get<ProductionDailyRecordComplete>(url).pipe(
        map(obj => obj),
        catchError(e => this.commonService.errorHandler(e))
        )
    }

    update(record: ProductionDailyRecord): Observable<ProductionDailyRecord> {
        const url = `${this.urlBase}${record.id}/`
        return this.http.put<ProductionDailyRecord>(url, record).pipe(
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
