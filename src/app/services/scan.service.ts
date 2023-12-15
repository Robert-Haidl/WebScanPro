import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = "/api/scanMultiple";

@Injectable({
    providedIn: 'root'
})
export class ScanService {

    constructor(private http: HttpClient) {
    }
    
    scanWebsite(url: string[]) : Observable<any> {
        const requestData = url.map(url => ({ url }));
        return this.http.post(API_URL, requestData);
    }
    
}
