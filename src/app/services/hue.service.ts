import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HueService {
    private url: string;
    private apikey: string;
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.url = environment.testUrl;
        this.apikey = environment.apiKey;
        this.baseUrl = `${this.url}/${this.apikey}`;
    }

    GetHeaders(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return headers;
    }

    ParseXYfromRGB(red: number, green: number, blue: number): number[] {
        red = red / 255;
        green = green / 255;
        blue = blue / 255;

        var r = red > 0.04045 ? Math.pow(((red + 0.055) / 1.055), 2.4000000953674316) : red / 12.92;
        var g = green > 0.04045 ? Math.pow(((green + 0.055) / 1.055), 2.4000000953674316) : green / 12.92;
        var b = blue > 0.04045 ? Math.pow(((blue + 0.055) / 1.055), 2.4000000953674316) : blue / 12.92;

        var x = r * 0.664511 + g * 0.154324 + b * 0.162028;
        var y = r * 0.283881 + g * 0.668433 + b * 0.047685;
        var z = r * 8.8E-5 + g * 0.07231 + b * 0.986039;

        return [x / (x + y + z), y / (x + y + z)];
    }

    UpdateLight(id: number, property: string, value: string): Observable<any> {
        const configUrl = `${this.baseUrl}/lights/${id}/state`;
        const payload = JSON.stringify({ property: value });
        const headers = this.GetHeaders();
        return this.http.put(configUrl, payload, { headers });
    }

    // GetAllLights(): Observable<LightList> {
    //     const configUrl = `${this.baseUrl}/lights`;
    //     return this.http.get(configUrl).pipe(
    //         map<any, LightList>((res) => {
    //             return this.lightList = res
    //         }),
    //         catchError(this.handleError)
    //     );
    // }

    GetAllLights(): Observable<any> {
        const configUrl = `${this.baseUrl}/lights`;
        return this.http.get(configUrl);
    }

    GetLightById(id: number): Observable<any> {
        const configUrl = `${this.baseUrl}/lights/${id}`;
        return this.http.get(configUrl);
    }

    UpdateOnOff(id: number, state: boolean): Observable<any> {
        const configUrl = `${this.baseUrl}/lights/${id}/state`;
        const payload = JSON.stringify({ on: state });
        const headers = this.GetHeaders();
        headers.append('Content-Length', '' + (payload.length * 2));

        return this.http.put(configUrl, payload, { headers });
    }

    UpdateColor(id: number, xy: number[]): Observable<any> {
        const configUrl = `${this.baseUrl}/lights/${id}/state`;
        const payload = JSON.stringify({ xy: xy });
        const headers = this.GetHeaders();
        headers.append('Content-Length', '' + (payload.length * 2));

        return this.http.put(configUrl, payload, { headers });
    }

    // /**
    //  * Handle Http operation that failed.
    //  * Let the app continue.
    //  * @param error - error
    //  * @param result - optional value to return as the observable result
    //  */
    // private handleError<T>(result?: T) {
    //     return (error: any): Observable<T> => {
    //         let errMsg: string;
    //         if (error instanceof Response) {
    //             const body = error.json() || '';
    //             const err = JSON.stringify(body);
    //             errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //         } else {
    //             errMsg = error.message ? error.message : error.toString();
    //         }
    //         console.error(errMsg);
    //         return of(result as T);
    //     };
    // }
}
