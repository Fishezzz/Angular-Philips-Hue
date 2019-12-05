import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(private http: HttpClient) { }

    configUrl = 'http://10.198.112.9/api/GPVSjl7KFqz5Adaa7wZnUjssZIc/lights';

    getConfig() {
        return this.http.get(this.configUrl);
    }
}
