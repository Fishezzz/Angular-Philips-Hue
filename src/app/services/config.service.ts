import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Light } from 'src/app/hue/lights';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private url: string;
    private apikey: string;
    lights: Light[];
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.url = environment.testUrl;
        this.apikey = environment.apiKey;
        this.baseUrl = `${this.url}/${this.apikey}`;
    }

    getLightsConfig() {
        const configUrl = `${this.baseUrl}/lights`;
        console.log('Getting lightResponse...');
        return this.http.get(configUrl);
    }
}
