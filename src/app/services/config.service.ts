// tslint:disable no-string-literal
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { LightResponse } from 'src/app/lights';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private url: string;
    private apikey: string;
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.url = environment.testUrl;
        this.apikey = environment.apiKey;
        this.baseUrl = `${this.url}/${this.apikey}`;
    }

    getLightsConfig(): Observable<LightResponse> {
        // const configUrl = `${this.baseUrl}/lights?name=student&number=500`;
        const configUrl = './assets/dummy.json';
        return this.http.get<LightResponse>(configUrl);
    }
}
