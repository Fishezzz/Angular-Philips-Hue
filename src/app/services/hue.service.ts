import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RGB } from 'ngx-color';

@Injectable({
    providedIn: 'root'
})
export class HueService {
    private url: string;
    private apikey: string;
    private baseUrl: string;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {
        this.url = environment.testUrl;
        this.apikey = environment.apiKey;
        this.baseUrl = `${this.url}/${this.apikey}`;
    }

    /**
     * A function that converts a color from RGB format to XY format.
     * @param red The red component of the RGB color.
     * @param green The green component of the RGB color.
     * @param blue The blue component of the RGB color.
     * @returns `number[]` with X and Y components of the XY color.
     */
    RGBtoXY(red: number, green: number, blue: number): number[] {
        red = red / 255;
        green = green / 255;
        blue = blue / 255;

        const r = red > 0.04045 ? Math.pow(((red + 0.055) / 1.055), 2.4000000953674316) : red / 12.92;
        const g = green > 0.04045 ? Math.pow(((green + 0.055) / 1.055), 2.4000000953674316) : green / 12.92;
        const b = blue > 0.04045 ? Math.pow(((blue + 0.055) / 1.055), 2.4000000953674316) : blue / 12.92;

        const x = r * 0.664511 + g * 0.154324 + b * 0.162028;
        const y = r * 0.283881 + g * 0.668433 + b * 0.047685;
        const z = r * 8.8E-5 + g * 0.07231 + b * 0.986039;

        return [x / (x + y + z), y / (x + y + z)];
    }

    /**
     * A function that converts a color from XY format to RGB format.
     * @param XY Containing the X and Y component of the XY color.
     * @returns `RGB` Object with r, g and b components of the RGB color.
     */
    XYtoRGB(xy: number[]): RGB {
        const x = xy[0];
        const y = xy[1];
        const z = 1.0 - x - y;

        const Y = 1.0;
        const X = (Y / y) * x;
        const Z = (Y / y) * z;

        const r = X * 1.656492 - Y * 0.354851 - Z * 0.255038;
        const g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
        const b = X * 0.051713 - Y * 0.121364 + Z * 1.011530;

        // tslint:disable-next-line: prefer-const
        let rgb: RGB = { r, g, b };
        rgb.r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
        rgb.g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
        rgb.b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;

        return rgb;
    }

    GetAllLights(): Observable<any> {
        const configUrl = `${this.baseUrl}/lights`;
        return this.http.get(configUrl);
    }

    GetLightById(id: number): Observable<any> {
        const configUrl = `${this.baseUrl}/lights/${id}`;
        return this.http.get(configUrl);
    }

    UpdateLight(id: number, property: string, value: string): Observable<any> {
        const configUrl = `${this.baseUrl}/lights/${id}/state`;
        const payload = JSON.stringify({ property: value });

        return this.http.put(configUrl, payload, this.httpOptions);
    }

    UpdateOnOff(id: number, state: boolean): Observable<any> {
        const configUrl = `${this.baseUrl}/lights/${id}/state`;
        const payload = JSON.stringify({ on: state });
        this.httpOptions.headers.append('Content-Length', '' + (payload.length * 2));

        return this.http.put(configUrl, payload, this.httpOptions);
    }

    UpdateColor(id: number, xy: number[]): Observable<any> {
        const configUrl = `${this.baseUrl}/lights/${id}/state`;
        const payload = JSON.stringify({ xy });
        this.httpOptions.headers.append('Content-Length', '' + (payload.length * 2));

        return this.http.put(configUrl, payload, this.httpOptions);
    }
}
