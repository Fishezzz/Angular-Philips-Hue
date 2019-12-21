import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RGB, Color } from 'ngx-color';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

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
     * @param color The `Color` object containing the RGB color.
     * @returns `number[]` with X and Y components of the XY color.
     */
    RGBtoXY(color: Color): number[];

    /**
     * A function that converts a color from RGB format to XY format.
     * @param red The red component of the RGB color.
     * @param green The green component of the RGB color.
     * @param blue The blue component of the RGB color.
     * @returns `number[]` with X and Y components of the XY color.
     */
    RGBtoXY(red: number, green: number, blue: number): number[];

    RGBtoXY(paramOne: Color | number, paramTwo?: number, paramThree?: number): number[] {
        let red: number;
        let green: number;
        let blue: number;

        if ((typeof paramOne === 'number') && (typeof paramTwo !== 'undefined') && (typeof paramThree !== 'undefined')) {
            red = paramOne / 255.0;
            green = paramTwo / 255.0;
            blue = paramThree / 255.0;
        } else if ((typeof paramOne !== 'number') && (typeof paramTwo === 'undefined') && (typeof paramThree === 'undefined')) {
            red = paramOne.rgb.r / 255.0;
            green = paramOne.rgb.g / 255.0;
            blue = paramOne.rgb.b / 255.0;
        }

        const r = red > 0.04045 ? Math.pow(((red + 0.055) / 1.055), 2.4000000953674316) : red / 12.92;
        const g = green > 0.04045 ? Math.pow(((green + 0.055) / 1.055), 2.4000000953674316) : green / 12.92;
        const b = blue > 0.04045 ? Math.pow(((blue + 0.055) / 1.055), 2.4000000953674316) : blue / 12.92;

        const X = r * 0.664511 + g * 0.154324 + b * 0.162028;
        const Y = r * 0.283881 + g * 0.668433 + b * 0.047685;
        const Z = r * 8.8E-5 + g * 0.07231 + b * 0.986039;

        const XY = [X / (X + Y + Z), Y / (X + Y + Z)];

        // http://www.brucelindbloom.com/index.html?Eqn_RGB_to_XYZ.html
        // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
        // //// Inverse Companding
        // // Inverse sRGB Companding
        // const r = (red <= 0.04045) ? (red / 12.92) : Math.pow(((red + 0.055) / 1.055), 2.4);
        // const g = (green <= 0.04045) ? (green / 12.92) : Math.pow(((green + 0.055) / 1.055), 2.4);
        // const b = (blue <= 0.04045) ? (blue / 12.92) : Math.pow(((blue + 0.055) / 1.055), 2.4);

        // // Inverse L* Companding
        // const vr = (r <= 0.08) ? ((100.0 * r) / (24389 / 27)) : Math.pow(((r + 0.16) / 1.16), 3);
        // const vg = (g <= 0.08) ? ((100.0 * g) / (24389 / 27)) : Math.pow(((g + 0.16) / 1.16), 3);
        // const vb = (b <= 0.08) ? ((100.0 * b) / (24389 / 27)) : Math.pow(((b + 0.16) / 1.16), 3);

        // //// Linear RGB to XYZ (sRGB	D65)
        // const X = (vr * 0.4124564) + (vg * 0.3575761) + (vb * 0.1804375);
        // const Y = (vr * 0.2126729) + (vg * 0.7151522) + (vb * 0.0721750);
        // const Z = (vr * 0.0193339) + (vg * 0.1191920) + (vb * 0.9503041);

        // const XY = [X / (X + Y + Z), Y / (X + Y + Z)];

        return XY;
    }

    /**
     * A function that converts a color from XY format to RGB format.
     * @param xy Containing the X and Y component of the XY color.
     * @returns `RGB` Object with r, g and b components of the RGB color.
     */
    XYtoRGB(xy: number[]): RGB;

    /**
     * A function that converts a color from XY format to RGB format.
     * @param x The X component of the XY color.
     * @param y The Y component of the XY color.
     * @returns `RGB` Object with r, g and b components of the RGB color.
     */
    XYtoRGB(x: number, y: number): RGB;

    XYtoRGB(paramOne: number[] | number, paramTwo?: number): RGB {
        let x: number;
        let y: number;

        if ((typeof paramOne === 'number') && (typeof paramTwo !== 'undefined')) {
            x = paramOne;
            y = paramTwo;
        } else if ((typeof paramOne !== 'number') && (typeof paramTwo === 'undefined')) {
            x = paramOne[0];
            y = paramOne[1];
        }

        const z = 1.0 - x - y;

        const Y = 1.0;
        const X = (Y / y) * x;
        const Z = (Y / y) * z;

        const r = X * 1.656492 - Y * 0.354851 - Z * 0.255038;
        const g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
        const b = X * 0.051713 - Y * 0.121364 + Z * 1.011530;

        const red = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
        const green = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
        const blue = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;

        const rgb: RGB = { r: red * 255, g: green * 255, b: blue * 255 };


        // http://www.brucelindbloom.com/index.html?Eqn_XYZ_to_RGB.html
        // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
        // //// XYZ to Linear RGB (sRGB	D65)
        // const vr = (X * 3.2404542) + (Y * -1.5371385) + (Z * -0.4985314);
        // const vg = (X * -0.9692660) + (Y * 1.8760108) + (Z * 0.0415560);
        // const vb = (X * 0.0349342) + (Y * -0.2040259) + (Z * 1.0572252);

        // //// Companding
        // // L* Companding
        // const r = (vr <= (216 / 24389)) ? ((vr * (216 / 24389)) / 100.0) : ((1.16 * Math.pow(vr, (1.0 / 3.0))) - 0.16);
        // const g = (vg <= (216 / 24389)) ? ((vb * (216 / 24389)) / 100.0) : ((1.16 * Math.pow(vg, (1.0 / 3.0))) - 0.16);
        // const b = (vb <= (216 / 24389)) ? ((vg * (216 / 24389)) / 100.0) : ((1.16 * Math.pow(vb, (1.0 / 3.0))) - 0.16);

        // // sRGB Companding
        // const red = (r <= 0.0031308) ? (12.92 * r) : ((1.055 * Math.pow(r, (1.0 / 2.4))) - 0.055);
        // const green = (g <= 0.0031308) ? (12.92 * g) : ((1.055 * Math.pow(g, (1.0 / 2.4))) - 0.055);
        // const blue = (b <= 0.0031308) ? (12.92 * b) : ((1.055 * Math.pow(b, (1.0 / 2.4))) - 0.055);

        // const rgb: RGB = {
        //     r: (red < 0 ? 0 : (red > 1 ? 1 : red)) * 255,
        //     g: (green < 0 ? 0 : (green > 1 ? 1 : green)) * 255,
        //     b: (blue < 0 ? 0 : (blue > 1 ? 1 : blue)) * 255
        // };

        return rgb;
    }

    /**
     * A function to get the config of all lights.
     * @returns An `Observable<any>` response. Subscribe and cast to `Light[]`.
     */
    GetAllLights(): Observable<any> {
        const configUrl = `${this.baseUrl}/lights`;
        return this.http.get(configUrl);
    }

    /**
     * A function to get the config of a specific light.
     * @param id The id of the light.
     * @returns An `Observable<any>` response. Subscribe and cast to `Light`.
     */
    GetLightById(id: number): Observable<any> {
        const configUrl = `${this.baseUrl}/lights/${id}`;
        return this.http.get(configUrl);
    }

    /**
     * A function to update a property of state from a light.
     * @param id The id of the light.
     * @param property The property of state to be updated.
     * @param value The value of the property to be updated.
     * @returns An `Observable<any>` response. Subscribe and cast to `State`.
     */
    UpdateLight(id: number, property: string, value: string): Observable<any> {
        const configUrl = `${this.baseUrl}/lights/${id}/state`;
        const payload = JSON.stringify({ property: value });

        return this.http.put(configUrl, payload, this.httpOptions);
    }

    /**
     * A function to update the on state of a light.
     * @param id The id of the light.
     * @param state The on state of the light.
     * @returns An `Observable<any>` response. Subscribe and cast to `State`.
     */
    UpdateOnOff(id: number, state: boolean): Observable<any> {
        const configUrl = `${this.baseUrl}/lights/${id}/state`;
        const payload = JSON.stringify({ on: state });
        this.httpOptions.headers.append('Content-Length', '' + (payload.length * 2));

        return this.http.put(configUrl, payload, this.httpOptions);
    }

    /**
     * A function to update the xy (color) state of a light.
     * @param id The id of the light.
     * @param xy The XY color value.
     * @returns An `Observable<any>` response. Subscribe and cast to `State`.
     */
    UpdateColor(id: number, xy: number[]): Observable<any> {
        const configUrl = `${this.baseUrl}/lights/${id}/state`;
        const payload = JSON.stringify({ xy });
        this.httpOptions.headers.append('Content-Length', '' + (payload.length * 2));

        return this.http.put(configUrl, payload, this.httpOptions);
    }
}
