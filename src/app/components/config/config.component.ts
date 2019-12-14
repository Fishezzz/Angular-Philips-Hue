import { Component, OnInit, Output } from '@angular/core';

import { ConfigService } from 'src/app/services/config.service';
import { Light } from 'src/app/hue/lights';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
    switchValue: boolean;
    lights: Light[];

    constructor(private configService: ConfigService) {
    }

    ngOnInit() {
        this.configService.getLightsConfig()
            .subscribe((data) => (this.lights = Object.values(data)));
    }

    ShowSomething() {
        console.log(this.lights);
        this.switchValue = !this.switchValue;
    }

    switchChange() {
        console.log('switch changed');
    }
}
