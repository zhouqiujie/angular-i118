import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SiteService {

    URL = 'api';

    constructor(
        private http: HttpClient,
    ) {

    }


    public getPage(id: string): Observable<any> {
        const url = `${this.URL}/page?id=${id}`;
        return this.http.get(url)
            .pipe(catchError(this.handleError));
    }

    public getSolutionCate(): Observable<any> {
        return this.http.get('///')
            .pipe(catchError(this.handleError));
    }

    public getSolutions(): Observable<any> {
        return this.http.get('////')
            .pipe(catchError(this.handleError));
    }



    private handleError(error: any): any {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }


        return new Observable(error);
    }
}
