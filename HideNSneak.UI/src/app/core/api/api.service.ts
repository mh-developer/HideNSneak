import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    public get(
        path: string,
        params: HttpParams = new HttpParams(),
        headers: HttpHeaders = new HttpHeaders()
    ): Observable<any> {
        return this.http
            .get(`${environment.BASE_URL}${path}`, { headers, params })
            .pipe(catchError(this.formatErrors));
    }

    public put(path: string, body: object = {}): Observable<any> {
        return this.http
            .put(`${environment.BASE_URL}${path}`, JSON.stringify(body))
            .pipe(catchError(this.formatErrors));
    }

    public post(
        path: string,
        body: object = {},
        params?: object
    ): Observable<any> {
        return this.http
            .post(
                `${environment.BASE_URL}${path}`,
                JSON.stringify(body),
                params
            )
            .pipe(catchError(this.formatErrors));
    }

    public delete(path: string): Observable<any> {
        return this.http
            .delete(`${environment.BASE_URL}${path}`)
            .pipe(catchError(this.formatErrors));
    }

    private formatErrors(error: any) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                    `body was: ${error.error}`
            );
        }
        return throwError(error.error);
    }
}
