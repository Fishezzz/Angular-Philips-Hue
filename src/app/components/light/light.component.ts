import { Component, OnInit, Input } from '@angular/core';

import { ColorEvent, RGB } from 'ngx-color';

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
    private color: RGB;

    constructor(private hueService: HueService) { }

    ngOnInit() {
        this.color = this.hueService.XYtoRGB(this.light.state.xy);
    }

    handleChange($event: ColorEvent) {
        console.log($event.color);
    }
}
