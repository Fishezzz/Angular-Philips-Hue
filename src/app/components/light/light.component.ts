import { Component, OnInit, Input } from '@angular/core';

import { Color, ColorEvent, RGB, RGBA } from 'ngx-color';

import { Light } from 'src/app/hue/lights';
import { HueService } from 'src/app/services/hue.service';

@Component({
    selector: 'app-light',
    templateUrl: './light.component.html',
    styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
    @Input() light: Light;
    @Input() lightId: number;
    private color: RGBA;
    newColor: string;

    constructor(private hueService: HueService) { }

    ngOnInit() {
        this.color = this.hueService.XYtoRGBA(this.light.state.xy);
        this.newColor = `#${this.hueService.toHex(this.color.r)}${this.hueService.toHex(this.color.g)}${this.hueService.toHex(this.color.b)}`;
    }

    HandleChangeComplete($event: ColorEvent) {
        this.hueService.UpdateColor(this.lightId, this.hueService.RGBtoXY($event.color)).subscribe();
        this.newColor = $event.color.hex;
    }
}
