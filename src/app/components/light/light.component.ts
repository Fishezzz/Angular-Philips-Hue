import { Component, OnInit, Input } from '@angular/core';

import { ColorHueModule } from 'ngx-color/hue';

import { Light } from 'src/app/hue/lights';

@Component({
    selector: 'app-light',
    templateUrl: './light.component.html',
    styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
    @Input() light: Light;
    @Input() id: number;

    constructor() { }

    ngOnInit() {
    }
}
