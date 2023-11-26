import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:3000/api/scan";

@Injectable({
    providedIn: 'root'
})
export class ScanService {

    constructor(private http: HttpClient) {
    }
    
    scanWebsite(url: string) : Observable<any> {
        return this.http.post(API_URL, { url });
    }
    
}
